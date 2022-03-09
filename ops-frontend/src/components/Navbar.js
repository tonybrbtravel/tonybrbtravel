import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Button, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';

import { Link, useHistory, withRouter } from 'react-router-dom';
import { Routes } from "../routes";
import { Auth } from "aws-amplify";
import { signOutUser } from "../Redux/actions/signInActions";
import { useDispatch } from "react-redux";
export default (props) => {
  var history = useHistory();
  const dispatch = useDispatch();

  async function handleSignOut(event) {
    event.preventDefault();
    await Auth.signOut();
    dispatch(signOutUser());
    history.push(Routes.Signin.path);
    localStorage.clear();

  }



  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "1rem 0rem 0rem 0rem" }}>
      <Button variant="secondary" as={Link} className="text-dark me-3" onClick={event => handleSignOut(event)}>Sign Out</Button>
    </div>
  );
};