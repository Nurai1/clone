import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import reducer from './reducer';
import './styles/index.css';
import App from './components/App';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(()=>
  localStorage.setItem(
    "todos",
    JSON.stringify(store.getState().todos)
));

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
