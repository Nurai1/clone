import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoList = ({
  reducer,
  todos,
  sortingDetails,
  dispatch
}) => {
  let storeFromLocalStore = JSON.parse(localStorage.getItem("reducer"));

  useEffect(() => {
      localStorage.setItem("reducer", JSON.stringify(reducer));
  });

  const initiliazeSortFunc = function(sortItem) {
    if (sortingDetails.fromTop){
      return function(a,b){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        };
    }
    else {
      return function(b,a){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        };
    }
  }
  return (
    <div>
    <h3>Сортировка:</h3>
    <label htmlFor="">
      По тексту:
      <input type="radio" name="sortFunc"
        checked={sortingDetails.item==="text"}
        onChange={()=>{}}
        onClick={()=>{
          dispatch(actions.changeSortItem("text"));
        }}
      />
    </label>
    <label htmlFor="">
      По дате:
      <input type="radio" name="sortFunc"
        checked={sortingDetails.item==="date"}
        onChange={()=>{}}
        onClick={()=>{
          dispatch(actions.changeSortItem("date"));
        }}
      />
    </label>
    <label htmlFor="">
      Изменить направление:
      <input type="checkbox"
        checked={sortingDetails.fromTop}
        onChange={()=>{
          dispatch(actions.toggleSortOrder());
        }}
      />
    </label>
    <ul>
      {
        todos.sort(initiliazeSortFunc(sortingDetails.item)).map((todo)=>{
          let toDoId= todo.id;
          return (todo.filterText && todo.filterDate)?
            <li key={todo.id} >
              <input type="checkbox" onClick={()=>{dispatch(actions.toggleCompleteState(toDoId))}} />
              Текст: {todo.text.toString()} Дата: {todo.date.toString()}
              <input onClick={()=>{dispatch(actions.deleteToDo(toDoId))}} type="button" value="Удалить" />
            </li>:""
        })
      }
    </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state,
  todos: state.todos,
  sortingDetails: state.sortingDetails
});

const TodoListContainer = connect(
  mapStateToProps,
)(TodoList);

export default TodoListContainer;
