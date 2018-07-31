import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'config/store';
import MainRoute from 'routes/Main/Main';
import IntlProvider from 'components/common/IntlProvider/IntlProvider';
import 'scss/main.scss';

render(
  <Provider store={store}>
    <IntlProvider>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);

// for hot reloading
if (module.hot) module.hot.accept();
