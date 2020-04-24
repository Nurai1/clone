import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoInput = ({
  todos,
  dispatch
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
    dispatch(actions.addToDo(todoText.value, todoDate.value));
  };

  return (
    <form className="todo__form" onSubmit={addTodo}>
      <h2>ToDo App</h2>
      <label className="todo__text" htmlFor="">
        Введите текст задания:
        <input className="todo__input" ref={(input)=>{todoText=input}} type="text"/>
      </label>
      <label className="todo__text" htmlFor="">
        Введите дату:
        <input className="todo__input" ref={(input)=>{todoDate=input}} type="date"/>
      </label>
      <input className="todo__submit" type="submit" value="Добавить" />
    </form>
  );
}

export default connect()(TodoInput);
