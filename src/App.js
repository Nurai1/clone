import React from 'react';
import { Provider } from 'react-redux';

import TodoInput from './TodoInput';
import FilterInput from './FilterInput';
import TodoList from './TodoList';

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Todo App</h1>
        <div className="clearfix">
          <TodoInput />
          <FilterInput />
        </div>
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
