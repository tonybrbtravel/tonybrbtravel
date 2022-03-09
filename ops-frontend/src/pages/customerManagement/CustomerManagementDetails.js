import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, InputGroup, Modal } from "@themesberg/react-bootstrap";
import { Routes } from "../../routes";
import { Link, useHistory, withRouter } from 'react-router-dom';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import UpdateCustomerDetails from "../customerManagement/UpdateCustomerDetails";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";
import { getAllCustomersDetails, searchCustomerDetails, deleteCustomerDetails } from "../../Redux/actions/customerMangementActions"
//import Pagination from "react-js-pagination";
import Pagination from 'react-responsive-pagination';
import Preloader from "../../components/Preloader";
export default () => {
  const history = useHistory();
  const dispath = useDispatch();
  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState();
  const [showDefault, setShowDefault] = useState(false);
  const [searchKey, setSearchKey] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dispatchCustomerRequest, setDispatchCustomerRequest] = useState(false);
  const loading = useSelector(state => state.customersDetails.loading);
  const [pageNumberKey, setPageNumberKey] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchInfoLoading, setSearchInfoLoading] = useState(false);
  const handleClose = () => {
    setShowDefault(false);
  }
  let dispatchResponse;
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  const SimpleButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit";

    const handleClick = () => {
      localStorage.setItem('customerid', rowData.id)

      const id = rowData.id;
      history.push({
        pathname: '/UpdateCustomerDetails/',
        state: { id: id }
      })
    };
    return <Button onClick={handleClick} disabled={rowData.active !== null && rowData.active === false ? true : false}>{cellValue}</Button>;
  }
  const getRowFormatter = (props) => {
    var rowData = props._row.data;
    var elem = props._row.getElement().style.height = "66px";
    var cellEdit = props._row.cells[6];
    var cellDelete = props._row.cells[7];
    cellEdit.getElement().style.height = "66px";
    cellDelete.getElement().style.height = "66px";


    if (rowData.active === false) {
      props._row.getElement().style.backgroundColor = "#D3D3D3"
    }
  }
  const DeleteButton = (props) => {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Delete";
    const handleClick = () => {
      props.cell._cell.row.getElement().style.backgroundColor = "#D3D3D3";
      const id = rowData.id;
      dispatchResponse = dispath(deleteCustomerDetails(id));
      setShowDefault(true);

    };
    return <Button onClick={handleClick} disabled={rowData.active !== null && rowData.active === false ? true : false}>{cellValue}</Button>;
  }
  const isCustomerDetailsLoading = useSelector(state => state.customersDetails.loading);
  useEffect(() => {
    if (dispatchCustomerRequest) {
      dispath(getAllCustomersDetails(pageNumberKey - 1));
      setDispatchCustomerRequest(false);
      setShowDefault(true);
    }
  }, [dispatchCustomerRequest])
  useEffect(() => {
    setShowModal(isCustomerDetailsLoading);
  }, [isCustomerDetailsLoading])

  var deleteCustomerMessage = '';
  const deleteRequestStatus = useSelector(state => state.deleteCustomerDetails);

  useEffect(() => {
    if (deleteRequestStatus.deleteCustomer && deleteRequestStatus.deleteCustomer.status === 200) {
      setDispatchCustomerRequest(true);
    }
    else {
      setDispatchCustomerRequest(false);
    }
  }, [deleteRequestStatus])
  const deleteCustomer = useSelector(state => state.deleteCustomerDetails.deleteCustomer.data);
  const deleteCustomerError = useSelector(state => state.deleteCustomerDetails.error);
  deleteCustomerMessage = (deleteCustomerError !== null) ? deleteCustomerError : deleteCustomer
  useEffect(() => {
    dispath(getAllCustomersDetails(0))
  }, [])
  const getcustomersDetails = useSelector(state => state.customersDetails.customers.elements);
  const getcurrentPageNumber = useSelector(state => state.customersDetails.customers.currentPage) + 1;
  const gettotalPages = useSelector(state => state.customersDetails.customers.totalPages);


  const columns = [
    { title: "BRB Customer ID", field: "id", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Email address", field: "email", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Subscription status", field: "subscriptionStatus", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "First name", field: "firstName", headerHozAlign: "center", hozAlign: "center", tooltipsHeader: true, headerSort: false },
    { title: "Last name", field: "lastName", formatter: "link", headerHozAlign: "center", hozAlign: "center", headerSort: false },
    { title: "Phone number", field: "phone", headerHozAlign: "center", hozAlign: "center", headerSort: false },
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
      //editor: "input",
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
    // pagination: "local",
    // paginationSize: 6,
    // paginationSizeSelector: [3, 6, 8, 10],
    tooltips: true,
    tooltipsHeader: true,
  }
  //search customers Details
  const onSubmit = ((data) => {
    let requestBody = data.search;
    // setSearchKey(requestBody);
    setSearchKey(requestBody)
    let obj = {
      'key': requestBody,
      'pageNumber': 0
    }
    dispath(searchCustomerDetails(obj));
  }
  );
  const searchLoading = useSelector(state => state.searchCustomersDetails.loading);
  useEffect(() => {

    setSearchInfoLoading(searchLoading);
  }, [searchLoading])

  const searchcustomersDetails = useSelector(state => state.searchCustomersDetails.searchcustomers.elements);
  const searchcurrentPageNumber = useSelector(state => state.searchCustomersDetails.searchcustomers.currentPage) + 1;
  const searchtotalPages = useSelector(state => state.searchCustomersDetails.searchcustomers.totalPages);
  ///

  const customersDetails = (searchcustomersDetails === undefined || searchKey === null) ? getcustomersDetails : searchcustomersDetails;
  const currentPageNumber = (searchcustomersDetails === undefined || searchKey === null) ? getcurrentPageNumber : searchcurrentPageNumber;
  const totalPages = (searchcustomersDetails.length === undefined || searchKey === null) ? gettotalPages : searchtotalPages;
  useEffect(() => {
    setPageNumberKey(currentPageNumber)
  }, [currentPageNumber]);


 
  useEffect(() => {
    for (var i = 0; i < customersDetails.length; i++) {
      if (customersDetails[i].subscriptionStatus === null ||customersDetails[i].subscriptionStatus.toLowerCase()==="inactive"
      ||customersDetails[i].subscriptionStatus.toLowerCase()==="not subscribed") {
        customersDetails[i].subscriptionStatus = "NOT SUBSCRIBED";
      }
      else {
        customersDetails[i].subscriptionStatus = "SUBSCRIBED";
      }
    }

  }, [customersDetails])
  const handlePageChange = (pageNumber) => {
    if (searchKey === null) {
      dispath(getAllCustomersDetails(pageNumber - 1))
      //this.setState({activePage: pageNumber});
    }
    else {
      let obj = {
        'key': searchKey,
        'pageNumber': pageNumber - 1
      }
      dispath(searchCustomerDetails(obj))
    }
  }

  return (
    <>
      {isLoading === true || searchInfoLoading === true ? <Preloader show={true} /> :

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
                </Form.Group></Col>
              <Col md={1} className="mb-3" style={{ margin: "1.3rem 0rem 0rem 0rem" }}>
                <Button variant="success" type="submit" className="m-1">Search</Button></Col>
            </Row></Form>
          <h2 className="text-center">
            Customers Details
          </h2>
          {customersDetails.length > 0 ?
            <ReactTabulator
              columns={columns}
              data={customersDetails}
              options={options}
              data-custom-attr="test-custom-attribute"
              className="custom-css-class"
              rowFormatter={getRowFormatter}
            /> : <h3 className="text-center">No records found</h3>}
          <div>
            <Pagination
              current={currentPageNumber}
              total={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          {/* {
            showModal&&           */}
          <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title className="h6">Delete Customer details</Modal.Title>
              <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
              <p> {deleteCustomerMessage} </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* } */}
        </div>}</>

  );
}