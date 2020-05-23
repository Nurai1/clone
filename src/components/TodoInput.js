import React from 'react';
import { connect } from 'react-redux';

import {
  addCurrentDate,
  addCurrentText,
  addToDo,
  setInputErrorState
} from './../actions';

export const TodoInput = ({
  todoCurrentValues,
  inputErrorState,
  addCurrentText,
  addCurrentDate,
  addNewTodo,
  setInputErrorState
}) => {
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoCurrentValues.date || !todoCurrentValues.text){
      setInputErrorState(true);
      return;
    }

    addNewTodo(todoCurrentValues.text, todoCurrentValues.date);
    setInputErrorState(false);
  }

  return (
    <form className="addForm" onSubmit={addTodo} >
      <h3>Добавьте задание</h3>
      <label className="addForm__text" htmlFor="">
        Введите текст задания:
        <input className={(!todoCurrentValues.text && inputErrorState)?"error":""}
          onChange={(e)=>addCurrentText(e.target.value)} type="text"
        />
      </label>
      <label className="addForm__date" htmlFor="">
        Введите дату:
        <input className={(!todoCurrentValues.date && inputErrorState)?"error":""}
          onChange={(e)=>addCurrentDate(e.target.value)} type="date"
        />
      </label>
      <input type="submit" value="Добавить" />
    </form>
  );
}

const mapStateToProps = (state) => ({
  todoCurrentValues: state.todoCurrentValues,
  inputErrorState: state.inputErrorState
})

const mapDispatchToProps = (dispatch) => ({
  addCurrentText: (value) => dispatch(addCurrentText(value)),
  addCurrentDate: (value) => dispatch(addCurrentDate(value)),
  addNewTodo: (text, date) => dispatch(addToDo(text, date)),
  setInputErrorState: (value) => dispatch(setInputErrorState(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
