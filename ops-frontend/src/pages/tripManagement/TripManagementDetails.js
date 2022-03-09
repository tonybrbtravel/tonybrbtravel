import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, InputGroup, Modal } from "@themesberg/react-bootstrap";
import { Routes } from "../../routes";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTripsDetails, filterTripsDetails } from '../../Redux/actions/tripsManagementActions';
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchTripsDetails } from '../../Redux/actions/tripsManagementActions';
import { ReactTabulator, reactFormatter } from "react-tabulator";
import MultiSelect from "react-multi-select-component";
import { deleteTripsDetails } from "../../Redux/actions/tripsManagementActions";
import Pagination from 'react-responsive-pagination';
import Preloader from "../../components/Preloader";


export default () => {
  var requestBody;
  const history = useHistory();
  const dispath = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selected, setSelected] = useState([]);
  const [pastDatesSelected, setPastDatesSelected] = useState([false]);
  const [showDefault, setShowDefault] = useState(false);
  const [searchKey, setSearchKey] = useState(null);
  const handleClose = () => setShowDefault(false);
  const [filternumber, setFliterNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumberKey, setPageNumberKey] = useState(1);
  const [dispatchTripRequest, setDispatchTripRequest] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [tripsDetailsConditionState, setTripsDetailsCondition] = useState([]);

  const loading = useSelector(state => state.tripsDetails.loading);
  const searchLoading = useSelector(state => state.searchTripsDetails.loading);

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  useEffect(() => {
    setIsSearchLoading(searchLoading);
  }, [searchLoading])
  //var searchtrips;
  useEffect(() => {
    //update here

    if (selected.length > 0) {
      setFliterNumber(selected[0])
      let obj = {
        'filtetKey': selected[0],
        'pageNumber': 0
      }
      dispath(filterTripsDetails(obj))
    }
    else{
      setFliterNumber(null);
      // dispath(getTripsDetails(0))
    }
  }, [selected])
  //searchtrips = useSelector(state => state.searchTripsDetails.searchtrips.data);

  const filtertrips = useSelector(state => state.filterTripsDetails.filtertrips);

  const newfiltertrips = useSelector(state => state.filterTripsDetails.filtertrips.elements);
  // console.log('NEW FILTERTRIPS.......', newfiltertrips)
  const activeFilterTripPage = useSelector(state => state.filterTripsDetails.filtertrips.currentPage) + 1;
  const totalFilterTripPages = useSelector(state => state.filterTripsDetails.filtertrips.totalPages);
  const dropdown_options = [
    { label: "Created", value: 0 },
    { label: "Locked", value: 1 },
    { label: "Revealed", value: 2 },
    { label: "Booked", value: 3 },
    { label: "Deleted", value: 4 }
  ];

  //search Trip Details
  const onSubmit = ((data) => {
    requestBody = data.search;
    setSearchKey(requestBody);
    let obj = {
      'searchKey': requestBody,
      'pageNumber': 0
    }
    dispath(searchTripsDetails(obj));

  }
  );
  const tripLoading = useSelector(state => state.tripsDetails.loading);
 
  useEffect(() => {
    if (dispatchTripRequest) {
      dispath(getTripsDetails(pageNumberKey - 1));
      setDispatchTripRequest(false);
    }
  }, [dispatchTripRequest])
  const searchtrips = useSelector(state => state.searchTripsDetails.searchtrips.elements);
  const activeSearchTripPage = useSelector(state => state.searchTripsDetails.searchtrips.currentPage) + 1;
  const totalSearchTripPages = useSelector(state => state.searchTripsDetails.searchtrips.totalPages);

  const SimpleButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit";
    //  props.cell._cell.getElement().style.height = "66px";

    const handleClick = () => {
      const tripId = rowData.tripId;
      localStorage.setItem('tripid', tripId);
      //history.push('/UpdateTripManagementDetails')
      //alert(rowData.tripId)
      history.push({
        pathname: '/UpdateTripManagementDetails/',
        //search: `${id}`,
        state: { id: tripId }
      })
    };
    return <Button onClick={handleClick} disabled={rowData.status !== null && rowData.status === "inactive"
      // || disabled 
      ?
      true : false}>{cellValue}</Button>;
  }
  const DeleteButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Delete";
    //  props.cell._cell.getElement().style.height = "66px";
    // console.log("pagenumber in delete", pageNumberKey);

    const handleClick = () => {
      props.cell._cell.row.getElement().style.backgroundColor = "#D3D3D3";

      const id = rowData.tripId;
      dispath(deleteTripsDetails(id));
      // setShowModal(false);
      setShowDefault(true);
    };
    return <Button onClick={handleClick} disabled={rowData.status !== null && rowData.status === "inactive"
      ?
      true : false}>{cellValue}</Button>;
  }
  const deletetrips = useSelector(state => state.deleteTripDetails.deletetrip.data);
  const deleteTripStatus = useSelector(state => state.deleteTripDetails);
  useEffect(() => {

    if (deleteTripStatus.deletetrip && deleteTripStatus.deletetrip.status === 200) {

      setDispatchTripRequest(true);
    }
    else {

      setDispatchTripRequest(false);
    }
  }, [deleteTripStatus])

  //Get all Trips details
  useEffect(() => {
    dispath(getTripsDetails(0))
  },[])
  const trips = useSelector(state => state.tripsDetails.trips.elements);
  const activeTripPage = useSelector(state => state.tripsDetails.trips.currentPage) + 1;
  useEffect(() => {

    setPageNumberKey(activeTripPage)
  }, [activeTripPage]);
  const totalTripPages = useSelector(state => state.tripsDetails.trips.totalPages);
  // console.log('trips.....', trips)

  let tripsDetailsCondition = (filternumber === null && searchKey === null) ? trips : (filternumber === null ? searchtrips : newfiltertrips);
  //setTripsDetailsCondition(tripsDetailsCondition);
  const activeTripPageCondition = (filternumber === null && searchKey === null) ? activeTripPage : (filternumber === null ? activeSearchTripPage : activeFilterTripPage);
  const totalTripPagesCondition = (filternumber === null && searchKey === null) ? totalTripPages : (filternumber === null ? totalSearchTripPages : totalFilterTripPages);
  // console.log('tripsdeatilscondition', tripsDetailsCondition);
  useEffect(() => {

  }, [tripsDetailsCondition])
  const columns = [
    { title: "Trip IDs", field: "tripId", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Name", field: "userName", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Email", field: "userEmail", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Start Date", field: "startDate", headerHozAlign: "center", hozAlign: "center", headerSort: true },
    { title: "Trip Status", field: "tripStatus", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    {
      title: "Edit",
      field: "custom",
      hozAlign: "center",
      headerHozAlign: "center", hozAlign: "center", headerSort: false,
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
      hozAlign: "center",
      headerHozAlign: "center", hozAlign: "center", headerSort: false,
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
    //pagination: "local",
    //paginationSize: 6,
    //paginationSizeSelector: [3, 6, 8, 10],
    tooltips: true,
    tooltipsHeader: true,
  }


  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    if (searchKey === null && filternumber === null) {
      dispath(getTripsDetails(pageNumber - 1))
    }
    else if (searchKey === null) {
      let obj = {
        'filtetKey': filternumber,
        'pageNumber': pageNumber - 1
      }
      dispath(filterTripsDetails(obj))
    }
    else {
      let obj = {
        'searchKey': searchKey,
        'pageNumber': pageNumber - 1
      }
      dispath(searchTripsDetails(obj));
    }
    //dispath(getAllCustomersDetails(pageNumber))
    //this.setState({activePage: pageNumber});
  }
  const getRowFormatter = (props) => {
    var rowData = props._row.data;
    var cellEdit = props._row.cells[4];
    var cellDelete = props._row.cells[5];
    cellEdit.getElement().style.height = "66px";
    cellDelete.getElement().style.height = "66px";

    if (rowData.status === "inactive") {
      props._row.getElement().style.backgroundColor = "#D3D3D3"
    }
  }

  const handlePastTripsChange = (event) => {
    setPastDatesSelected(event.target.checked);
    if (!event.target.checked) {
        tripsDetailsCondition = tripsDetailsCondition.filter(value => Date.parse(value.startDate) >= new Date());
        dispath(filterTripsDetails(tripsDetailsCondition))
        alert(JSON.stringify(tripsDetailsCondition.length));
      }
    //alert(JSON.stringify(tripsDetailsCondition.length));
  }

  function handlePastTripsCheckbox(event) {
  setPastDatesSelected(event.target.checked);
      if (!event.target.checked) {
          tripsDetailsCondition = tripsDetailsCondition.filter(value => Date.parse(value.startDate) >= new Date());
          //dispath(filterTripsDetails(tripsDetailsCondition))
          alert(JSON.stringify(this.state.tripsDetailsCondition.length));
        }
      //alert(JSON.stringify(tripsDetailsCondition.length));
  }

  //alert(JSON.stringify(tripsDetailsCondition.length));

  return (
    <>
      {isLoading === true || isSearchLoading === true ? <Preloader show={true}></Preloader> :
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={5} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" {...register("search")} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={1} className="mb-3"
                style={{ margin: "1.3rem 0rem 0rem 0rem" }}
              >
                <Button variant="success" type="submit" className="m-1">Search</Button></Col>
            </Row><Row>
              <Col md={5} className="mb-3"
              // style={{ margin: "1.5rem 0rem 0rem 1.5rem" }}
              >

                <MultiSelect
                  options={dropdown_options}
                  selected={selected}
                  onChange={setSelected}
                  labelledBy="Filter by"
                />
              </Col>
            </Row>

            <Form.Group id="pastTrips">
               <Form.Check type="checkbox" label="Past Trips" {...register("pastTrips")} onChange={event => handlePastTripsCheckbox(event)}/>
           </Form.Group>
          </Form>
          <h2 className="text-center">
            Trips Details
          </h2>
          <Button variant="secondary" as={Link} to={Routes.AddTripManagementDetails.path} className="text-dark me-3">
            Add Trip
          </Button>
          {tripsDetailsCondition.length > 0 ?
            <ReactTabulator
              columns={columns}
              data={tripsDetailsCondition}
              options={options}
              data-custom-attr="test-custom-attribute"
              className="custom-css-class"
              rowFormatter={getRowFormatter}
            /> : <h3>No records found</h3>}
          <div>
            <Pagination
              current={activeTripPageCondition}
              total={totalTripPagesCondition}
              onPageChange={handlePageChange}
            />
          </div>
          {deletetrips&&
          <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title className="h6">Delete trip</Modal.Title>
              <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            {deletetrips&&deletetrips.length>0&&
            <Modal.Body>
              <p> {deletetrips.replace("cancelled","deleted")} </p>
            </Modal.Body>
}
            <Modal.Footer>
              <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>}
        </div>}</>
  );
}