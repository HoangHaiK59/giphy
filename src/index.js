import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { history } from './helper/history';
import { Router } from 'react-router-dom';
import { loadState, saveState } from './persitor';
import configStore from './store';
import { Provider } from "react-redux";
require('dotenv').config()

const persitedState = loadState();
const store = configStore(persitedState);

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
