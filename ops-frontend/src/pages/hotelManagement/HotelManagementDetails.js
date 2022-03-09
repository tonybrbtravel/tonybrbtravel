
import React, { useState, useEffect } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { Routes } from "../../routes";
import { useForm } from "react-hook-form";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getHotelsDetails } from '../../Redux/actions/hotelManagementActions';
import { Col, Row, Form, InputGroup, Modal } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchHotelsDetails } from '../../Redux/actions/hotelManagementActions';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import UpdateCustomerDetails from "../customerManagement/UpdateCustomerDetails";
import { getHotelDetailsById, updateHotelDetails, deleteHotelDetails } from "../../Redux/actions/hotelManagementActions";
import Pagination from 'react-responsive-pagination';
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import Preloader from "../../components/Preloader";


import { ReactTabulator, reactFormatter } from "react-tabulator";

export default () => {
  var requestBody;
  const history = useHistory();
  const dispath = useDispatch();
  const [showDefault, setShowDefault] = useState(false);
  const [searchKey, setSearchKey] = useState(null);
  const handleClose = () => setShowDefault(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledHotelId, setDisabledHotelId] = useState();
  const [pageNumberKey,setPageNumberKey]=useState(1);
  const [dispatchHotelRequest,setDispatchHotelRequest]=useState(false);
  const [isSearchLoading,setIsSearchLoading]=useState(false)

  const { register, handleSubmit } = useForm();
  const loading = useSelector(state => state.getHotelsDetails.loading);
  let id, hotelid, rowData, buttonProps;
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const onSubmit = ((data) => {
    requestBody = data.search;
    setSearchKey(requestBody)
    let obj = {
      'key': requestBody,
      'pageNumber': 0
    }
    dispath(searchHotelsDetails(obj));
  }
  );
  const searchLoading=useSelector(state=>state.searchHotelsDetails.loading);
  useEffect(()=>{
    setIsSearchLoading(searchLoading)
  },[searchLoading])
  const searchhotels = useSelector(state => state.searchHotelsDetails.searchhotels.content);
  const activePagesearchhotels = useSelector(state => state.searchHotelsDetails.searchhotels.number) + 1;
  const totelPagessearchhotels = useSelector(state => state.searchHotelsDetails.searchhotels.totalPages);
  //[] 1 0
  useEffect(() => {
    dispath(getHotelsDetails(0))
  }, [])
  const hotels = useSelector(state => state.getHotelsDetails.hotels.content);
  const activePagehotels = useSelector(state => state.getHotelsDetails.hotels.number) + 1;
  useEffect(()=>{

    setPageNumberKey(activePagehotels)
  },[activePagehotels]);
  const totelPageshotels = useSelector(state => state.getHotelsDetails.hotels.totalPages);


  const hotelDetailsCondition = (searchhotels===undefined||searchKey===null) ? hotels : searchhotels;
  const activePage = (searchhotels.length === 0||searchKey===null) ? activePagehotels : activePagesearchhotels;
  const totelPages = (searchhotels.length === 0||searchKey===null) ? totelPageshotels : totelPagessearchhotels;
  const SimpleButton = (props) => {
    buttonProps = props;
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit";
    hotelid = rowData.hotelId;
    const handleClick = () => {
      localStorage.hotelId=rowData.hotelId;
      history.push({
        pathname: '/UpdateHotelDetails/',
        state: { id: hotelid }
      })
    };
    return <Button onClick={handleClick} disabled={rowData.status === "inactive"
      // || disableButton
      ? true : false}>{cellValue}</Button>;
  }
  const DeleteButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Delete";
    const handleClick = () => {
      let pageKey=pageNumberKey
      let id = rowData.hotelId;
      dispath(deleteHotelDetails(id));
      props.cell._cell.row.getElement().style.backgroundColor = "#D3D3D3";
    };
    return <Button onClick={handleClick} disabled={rowData.status === "inactive" ? true : false}>{cellValue}</Button>;
  }
  const deletehotelsStatus= useSelector(state => state.deleteHotelDetails.deletehotel);
  useEffect(()=>{

    if(deletehotelsStatus&&deletehotelsStatus.status===200){

      setDispatchHotelRequest(true);   
    }
    else{
      setDispatchHotelRequest(false);   
    }
  },[deletehotelsStatus])
  useEffect(()=>{

    if(dispatchHotelRequest){

      dispath(getHotelsDetails(pageNumberKey-1));
      setDispatchHotelRequest(false);
      setShowDefault(true);
      // setShowModal(
    }
    },[dispatchHotelRequest])

  const deletehotels = useSelector(state => state.deleteHotelDetails.deletehotel.data);

  const getRowFormatter = (props) => {
    var rowData = props._row.data;
    var cellEdit=props._row.cells[3];
    var cellDelete=props._row.cells[4];
    cellEdit.getElement().style.height="66px";
    cellDelete.getElement().style.height="66px";
    if (rowData.status === "inactive") {
      props._row.getElement().style.backgroundColor = "#D3D3D3"
    }
  }
  const columns = [
    { title: "Hotel Id", field: "hotelId", headerHozAlign: "center", hozAlign: "center", visible: false, headerSort: false, height: "66px" },
    { title: "Hotel name", field: "hotelName", headerHozAlign: "center", hozAlign: "center", headerSort: false, height: "66px" },
    { title: "City", field: "city.cityName", headerHozAlign: "center", hozAlign: "center", headerSort: false, height: "66px" },
    {
      title: "Edit",
      field: "custom",
      headerHozAlign: "center", hozAlign: "center", headerSort: false,
      height: "66px",
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
      headerHozAlign: "center", hozAlign: "center", headerSort: false,
      height: "66px",
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
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);

    if (searchKey === null) {
      dispath(getHotelsDetails(pageNumber - 1))
    }
    else {
      let obj = {
        'key': searchKey,
        'pageNumber': pageNumber - 1
      }
      dispath(searchHotelsDetails(obj))
    }

    //this.setState({activePage: pageNumber});
  }
  return (
    <>
      {isLoading===true||isSearchLoading===true?
        <Preloader show={true}></Preloader>:
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" {...register("search")} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3" style={{ margin: "1.3rem 0rem 0rem 0rem" }}>
                <Button variant="success" type="submit" className="m-1">Search</Button>
              </Col>
            </Row>
          </Form>
          <h2 className="text-center">
            Hotels Details
          </h2>
          <Button variant="secondary" as={Link} to={Routes.AddHotelDetails.path} className="text-dark me-3">
            Add Hotel
          </Button>
         {hotelDetailsCondition.length>0?
          <ReactTabulator
            columns={columns}
            data={hotelDetailsCondition}
            options={options}
            data-custom-attr="test-custom-attribute"
            className="custom-css-class"
            rowFormatter={getRowFormatter}
          />:<h4 className="text-center">No records found</h4>}
          <div>
            <Pagination
              current={activePage}
              total={totelPages}
              onPageChange={handlePageChange}
            />
          </div>
          <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title className="h6">Delete Hotel</Modal.Title>
              <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
              <p> {deletehotels} </p>
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