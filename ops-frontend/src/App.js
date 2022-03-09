import React , {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Amplify, { Auth } from "aws-amplify";
import { createClient } from "contentful";
import { signInAuthenticatedUpdate } from "./pages/Sign-in/signinSlice";
// core styles
import "./scss/index.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

const awsconfig = {
    aws_project_region: "eu-west-1",
    aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL,
    aws_cognito_region: "eu-west-1",
    aws_user_pools_id: process.env.REACT_APP_USER_POOL,
    aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT,
    oauth: {
      domain: process.env.REACT_APP_COGNITO_DOMAIN,
      scope: [
        "phone",
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: 'http://localhost:3000/#/',
      redirectSignOut: 'http://localhost:3000/#/',
      responseType: "code",
    },
    federationTarget: "COGNITO_USER_POOLS",
  };
  
  Amplify.configure(awsconfig);
  

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        authCheck();
      }, []);
      const authCheck = async () => {
        try {
          const session = await Auth.currentSession();
          dispatch(signInAuthenticatedUpdate(true));
        } catch (err) {
          dispatch(signInAuthenticatedUpdate(false));
        }
      };
    return(
        <HashRouter>
        <ScrollToTop />
        <HomePage />
      </HashRouter>
    );
}
export default App;