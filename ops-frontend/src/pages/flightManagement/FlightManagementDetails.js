import React, { useState, useEffect } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { Routes } from "../../routes";
import { Modal } from '@themesberg/react-bootstrap';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { getFlightsDetails } from '../../Redux/actions/flightsManagementActions';
import { useSelector, useDispatch } from 'react-redux';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import UpdateCustomerDetails from "../customerManagement/UpdateCustomerDetails";
import { deleteFlightsDetails } from '../../Redux/actions/flightsManagementActions';
import Preloader from "../../components/Preloader";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import Pagination from 'react-responsive-pagination';

import { ReactTabulator, reactFormatter, useRef } from "react-tabulator";
const data = [
  {
    carriername: "IndiGo"
  },
  {
    carriername: "Air India"
  },
  {
    carriername: "SpiceJet"
  },
  {
    carriername: "GoAir"
  },
  {
    carriername: "AirAsia India"
  },
  {
    carriername: "Vistara"
  },
];
export default () => {
  const history = useHistory();
  const dispath = useDispatch();
  const [showDefault, setShowDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumberKey, setPageNumberKey] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const handleClose = () => setShowDefault(false);
  const flights = useSelector(state => state.flightDetails.flights.content);
  const loading = useSelector(state => state.flightDetails.loading);
  const error = useSelector(state => state.flightDetails.error);
  const activePage = useSelector(state => state.flightDetails.flights.number) + 1;
  const totelPages = useSelector(state => state.flightDetails.flights.totalPages);
  const [dispatchflightRequest, setDispatchFlightRequest] = useState(false);
  useEffect(() => {
    setPageNumberKey(activePage)
  }, [activePage]);

  //const tableRef = useRef()
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  useEffect(() => {
    dispath(getFlightsDetails(0))
  }, [])
  const SimpleButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit";

    const handleClick = () => {
      const id = rowData.carrierId;
      localStorage.setItem('carrierid', id);
      history.push({
        pathname: '/UpdateCarrierDetails/',
        state: { id: id }
      })

    };
    return <Button onClick={handleClick}
      disabled={rowData.status !== null && rowData.status === "Inactive"
        ? true : false}>{cellValue}</Button>;
  }
  const DeleteButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Delete";
    // props.cell._cell.getElement().style.height = "66px";

    const handleClick = () => {
      let pageKey = pageNumberKey;
      const id = rowData.carrierId;
      dispath(deleteFlightsDetails(id));
      // setShowDefault(true);
      props.cell._cell.row.getElement().style.backgroundColor = "#D3D3D3";

    };
    return <Button onClick={handleClick}
      disabled={rowData.status !== null && rowData.status === "Inactive"
        ?
        true : false}>{cellValue}</Button>;
  }

  const deleteflightStatus = useSelector(state => state.deleteFlightDetails.deleteflight);
  useEffect(() => {
    if (deleteflightStatus && deleteflightStatus.status === 200) {
      setDispatchFlightRequest(true);
    }
    else {
      setDispatchFlightRequest(false);
    }
  }, [deleteflightStatus])
  useEffect(() => {
    if (dispatchflightRequest) {
      dispath(getFlightsDetails(pageNumberKey - 1));
      setDispatchFlightRequest(false);
      setShowDefault(true);
      // setShowModal(
    }
  }, [dispatchflightRequest])

  const getRowFormatter = (props) => {
    var rowData = props._row.data;
    var cellEdit = props._row.cells[2];
    var cellDelete = props._row.cells[3];
    cellEdit.getElement().style.height = "66px";
    cellDelete.getElement().style.height = "66px";
    if (rowData.status === "Inactive") {
      props._row.getElement().style.backgroundColor = "#D3D3D3"
    }
  }
  const deleteflights = useSelector(state => state.deleteFlightDetails.deleteflight.data);
  const columns = [
    { title: "Carrier Id", field: "carrierId", align: "center", headerHozAlign: "center", visible: false, headerSort: false },
    { title: "Carrier name", field: "carrierName", align: "center", headerHozAlign: "center", headerSort: false },

    {
      title: "Edit",
      field: "custom",
      hozAlign: "center",
      headerSort: false,
      //editor: "input",
      headerHozAlign: "center",
      formatter: reactFormatter(
        <SimpleButton
          onSelect={(brbCustomerId) => {
            // this.setState({ selectedName: name });
            //alert(brbCustomerId);
          }}
        />
      )
    },
    {
      title: "Delete",
      field: "custom",
      hozAlign: "center",
      headerSort: false,
      //editor: false,
      headerHozAlign: "center",
      formatter: reactFormatter(
        <DeleteButton
          onSelect={(brbCustomerId) => {
            // this.setState({ selectedName: name });
            //alert(brbCustomerId);
          }}
        />
      )
    }

  ];

  const options = {
    autoResize: false,
    tooltips: true,
    tooltipsHeader: true,
  }
  const onClick = (data) => {
    alert('pageIndex....', data);
  }

  const handlePageChange = (pageNumber) => {
    dispath(getFlightsDetails(pageNumber - 1))

  }

  return (
    <>
      {
        isLoading === true ? <Preloader show={isLoading}></Preloader> :
          <div  >
            <h2 className="text-center">
              Carrier Details
            </h2>
            <Button variant="secondary" as={Link} to={Routes.AddFlightDetails.path} className="text-dark me-3">
              Add Carrier
            </Button>

            <ReactTabulator
              //ref={tableRef}
              columns={columns}
              data={flights}
              options={options}
              data-custom-attr="test-custom-attribute"
              className="custom-css-class"
              rowFormatter={getRowFormatter}

            //onClick={onClick}
            //onChange= {onPageChange}
            />
            <div>
              <Pagination
                current={activePage}
                total={totelPages}
                onPageChange={handlePageChange}
              />
            </div>
            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title className="h6">Delete Flight</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleClose} />
              </Modal.Header>
              <Modal.Body>
                <p> {deleteflights}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>}</>
  );
}