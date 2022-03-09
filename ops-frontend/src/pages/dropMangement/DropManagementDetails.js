import React, { useState, useEffect } from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";
import { Routes } from "../../routes";
import { Link, useHistory, withRouter } from 'react-router-dom';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import UpdateCustomerDetails from "../customerManagement/UpdateCustomerDetails";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/semantic-ui/tabulator_semantic-ui.min.css"; // use Theme(s)
import { ReactTabulator, reactFormatter } from "react-tabulator";
import { useSelector, useDispatch } from 'react-redux';
import { getDropDetailsRequest, deleteDropDetails } from '../../Redux/actions/dropManagementActions';
import Pagination from 'react-responsive-pagination';
import Preloader from "../../components/Preloader";
import moment from "moment-timezone";

export default () => {
  const [dropManagementDetailsData, setdropManagementDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const [pageNumberKey, setPageNumberKey] = useState(1);
  const [dispatchDropRequest, setDispatchDropRequest] = useState(false);

  const handleClose = () => setShowDefault(false);

  const dropManagementData = useSelector(state => state.dropDetails.drops.content);
  const dropManagementStatus = useSelector(state => state.deleteDropDetails);
  const dispatch = useDispatch();
  useEffect(()=>{

     for(var i=0;i<dropManagementData.length;i++){
       dropManagementData[i].start_date=moment(dropManagementData[i].start_date).format('DD-MM-YYYY');
     
     }
 },[dropManagementData])
  useEffect(() => {
    if (dropManagementStatus.deleteDropDetails && dropManagementStatus.deleteDropDetails.status === 200) {
      setDispatchDropRequest(true);
    }
    else {
      setDispatchDropRequest(false);
    }
  }, [dropManagementStatus])
  useEffect(() => {
    if (dispatchDropRequest) {

      dispatch(getDropDetailsRequest(pageNumberKey - 1));
      setDispatchDropRequest(false);
      setShowDefault(true);
      // setShowModal(
    }
  }, [dispatchDropRequest])
  const activePage = useSelector(state => state.dropDetails.drops.number) + 1;
  useEffect(() => {
    setPageNumberKey(activePage)
  }, [activePage]);
  const totelPages = useSelector(state => state.dropDetails.drops.totalPages);
  const loading = useSelector(state => state.dropDetails.loading);
  useEffect(() => {
    setIsLoading(loading)
  }, [loading]);

  const history = useHistory();
  useEffect(() => {
    setIsLoading(loading);
  }, [loading])
  useEffect(() => {
    dispatch(getDropDetailsRequest(0))
  }, []);

  const SimpleButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit";
    const handleClick = () => {
      const dropId = rowData.id;
      localStorage.setItem('dropId',dropId);
      history.push({
        pathname: '/UpdateDropManagementDetails/',
        state: { dropId: dropId }
      })
    };
    return <Button onClick={handleClick}
      disabled={rowData.status !== null && rowData.status !== "Live" && rowData.status !== "LIVE" ? true : false}>{cellValue}</Button>;
  }

  const DeleteButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Delete";
    const handleClick = () => {
      const dropId = rowData.id;
      dispatch(deleteDropDetails(dropId))


    };
    return <Button onClick={handleClick} disabled={rowData.status !== null && rowData.status !== "Live" && rowData.status !== "LIVE" ? true : false}>{cellValue}</Button>;
  }
  //var deleteDropMessage = '';
  const deleteDropMessage = useSelector(state => state.deleteDropDetails.deleteDropDetails.data);

  const handlePageChange = (pageNumber) => {
    dispatch(getDropDetailsRequest(pageNumber - 1))
    //this.setState({activePage: pageNumber});
  }

  const columns = [
    { title: "Drop ID", field: "id", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Start Date", field: "start_date", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "City", field: "city.cityName", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Hotel", field: "hotels.hotelName", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Pax", field: "pax", formatter: "link", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Live / NotLive", field: "status", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Sold Out Status", field: "soldOut", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    {
      title: "Edit",
      field: "custom",
      headerHozAlign: "center", hozAlign: "center",
      headerSort: false,
      //editor: "input",
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
      headerHozAlign: "center", hozAlign: "center",
      headerSort: false,
      //editor: "input",
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
    // pagination: "local",
    // paginationSize: 6,
    // paginationSizeSelector: [3, 6, 8, 10],
    tooltips: true,
    tooltipsHeader: true,
  }

  const getRowFormatter = (props) => {
    var rowData = props._row.data;
    if (rowData.status !== null && rowData.status !== "Live" && rowData.status !== "LIVE") {
      props._row.getElement().style.backgroundColor = "#D3D3D3"
    }
  }


  return (
    <>
      {
        isLoading === true ? <Preloader show={isLoading}></Preloader> :
          <div>
            <h2 className="text-center">
              Drops Details
            </h2>
            <Button variant="secondary" as={Link} to={Routes.AddDropManagementDetails.path} className="text-dark me-3">
              Add Drop
            </Button>
            <ReactTabulator
              columns={columns}
              data={dropManagementData}
              options={options}
              data-custom-attr="test-custom-attribute"
              className="custom-css-class"
              rowFormatter={getRowFormatter}
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
                <Modal.Title className="h6">Delete Drop details</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleClose} />
              </Modal.Header>
              <Modal.Body>
                <p> {deleteDropMessage} </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

          </div>}
    </>
  );
}