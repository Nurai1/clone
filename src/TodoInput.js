import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoInput = ({
  onSubmit
}) => {
  let todoText = '';
  let todoDate = '';
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText.value || !todoDate.value){
      todoText.value?(todoDate.classList.add("error")):(todoText.classList.add("error"))
      return;
    }
    todoDate.classList.remove("error");
    todoText.classList.remove("error");
    onSubmit(todoText.value, todoDate.value);
  }

  return (
    <form className="todo__input" onSubmit={addTodo} >
      <h2>ToDo App</h2>
      <label htmlFor="">
        Введите текст задания:
        <input ref={(input)=>{todoText=input}} type="text"/>
      </label>
      <label htmlFor="">
        Введите дату:
        <input ref={(input)=>{todoDate=input}} type="date"/>
      </label>
      <input type="submit" value="Добавить" />
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (text, date) => {
    dispatch(actions.addToDo(text, date));
  }
});

export default connect(null, mapDispatchToProps)(TodoInput);
