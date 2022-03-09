import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify';
import { createClient } from 'contentful';
import { QueryClient, QueryClientProvider } from 'react-query';

import routes from './routes';
import { StepWizardProvider } from './context/stepWizardContext';
import { signInAuthenticatedUpdate } from './features/SignIn/signinSlice';
import {
  contentfulClientUpdate,
  contentfulFetchCountries,
  contentfulCityGuides,
  contentfulCityBlogs,
  contentfulCities,
} from './Contentful/contentfulSlice';

import BRBNotificationContainer from './components/BRBNotificationContainer';
import Nav from './components/Nav';

const awsconfig = {
  aws_project_region: process.env.REACT_APP_AWS_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_COGNITO_DOMAIN,
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT_SIGNIN,
    redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT_SIGNIN,
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

Amplify.configure(awsconfig);

const App = () => {
  const dispatch = useDispatch();

  const authCheck = async () => {
    try {
      await Auth.currentSession();
      // TODO: Do we need a success check here? Or is the lack of an error enough?
      dispatch(signInAuthenticatedUpdate(true));
    } catch (err) {
      dispatch(signInAuthenticatedUpdate(false));
    }
  };

  const setUpContentful = () => {
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });
    dispatch(contentfulClientUpdate(client));
    dispatch(contentfulFetchCountries(undefined));
    dispatch(contentfulCityGuides());
    dispatch(contentfulCityBlogs());
    dispatch(contentfulCities());
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 3,
      },
    },
  });

  // First render only, set things up
  useEffect(() => {
    authCheck();
    setUpContentful();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StepWizardProvider
        wizards={{
          test: {
            stepCount: 3,
            titles: ['Trip Types', 'Airports', 'Top Cities'],
            activeStepIndex: 0,
          },
        }}
      >
        <BRBNotificationContainer />

        <div className="App">

          <Nav startNavTransparent />

          {routes}

        </div>
      </StepWizardProvider>
    </QueryClientProvider>
  );
};

export default App;
