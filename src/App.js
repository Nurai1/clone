import React from 'react';
import { Provider } from 'react-redux';

import TodoInput from './TodoInput';
import FilterInput from './FilterInput';
import TodoList from './TodoList';
import './styles/App.css';

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoInput />
        <FilterInput />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
