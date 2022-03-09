import React , {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/index.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
//////////////
import { useDispatch } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify';
import { createClient } from 'contentful';
import App from "./App";
import { Provider } from "react-redux";
import store from './Redux/store';

ReactDOM.render(
  <Provider store={store}>
  <App/>,
  </Provider>,
  document.getElementById("root")
);
