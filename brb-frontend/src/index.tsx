import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';

import store from './app/store';
import history from './app/history';
import * as serviceWorker from './serviceWorker';

// Global CSS assets
// Loaded here because nested imports deep in App currently include overrides
// with rule specificity relying purely on source ordering
// TODO: Convert overrides in .less files to styled-components for better scoping.
import 'semantic-ui-less/semantic.less';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/thumbs/thumbs.min.css';

import App from './App';

import './index.css';
import animations from './utils/simple-animation';

const persistor = persistStore(store);

// Helper component, immediately scrolls to the top whenever the path changes,
// simulating a normal (non-SPA/PWA) page load
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    animations.init();
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
