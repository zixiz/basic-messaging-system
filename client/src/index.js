import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import MailReducer from './store/reducer/reducer';
import { createStore,applyMiddleware  } from 'redux';
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";

const store = createStore(MailReducer, applyMiddleware(thunk));


const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);


