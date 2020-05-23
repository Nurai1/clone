import React from 'react';
import { connect } from 'react-redux';

import {
  changeSortItem,
  toggleSortOrder,
  toggleCompleteState,
  deleteToDo
} from './../actions';

export const TodoList = ({
  todos,
  sortingDetails,
  visibilityFilters,
  changeSortItem,
  toggleSortOrder,
  toggleCompleteState,
  deleteToDo
}) => {

  let currentTodos = [...todos];
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

  const sortingDetailsHandler = function(item) {
    if (item === sortingDetails.item){
      toggleSortOrder();
    }
    changeSortItem(item);
  }

  return (
    <div>
    <h3>Todo List</h3>
      <input type="button"
        className="btn__sort_txt"
        value="Сортировка по тексту"
        onClick={()=>{
          sortingDetailsHandler("text");
        }}
      />
      <input type="button"
        className="btn__sort_date"
        value="Сортировка по дате"
        onClick={()=>{
          sortingDetailsHandler("date");
        }}
      />
      <input type="button"
        className="btn__sort_reset"
        value="Сброс сортировки"
        onClick={()=>{
          sortingDetailsHandler("");
        }}
      />
    <ul>
      {
        currentTodos.sort(initiliazeSortFunc(sortingDetails.item)).map((todo)=>{
          let toDoId= todo.id;
          return (todo.text.includes(visibilityFilters.text) && todo.date.includes(visibilityFilters.date))?
            <li key={todo.id} >
              <input type="checkbox"
              onChange={()=>{toggleCompleteState(toDoId)}}
              checked={todo.completed?"checked":""}
            />
              <span className={todo.completed?"task task_completed":"task"}>
                Текст: {todo.text.toString()} Дата: {todo.date.toString()}
              </span>
              <input onClick={()=>{deleteToDo(toDoId)}} type="button" value="Удалить" />
            </li>
            :null
        })
      }
    </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  sortingDetails: state.sortingDetails,
  visibilityFilters: state.visibilityFilters
});

const mapDispatchToProps = (dispatch) => ({
  changeSortItem: (item) => dispatch(changeSortItem(item)),
  toggleSortOrder: () => dispatch(toggleSortOrder()),
  toggleCompleteState: (id) => dispatch(toggleCompleteState(id)),
  deleteToDo: (id) => dispatch(deleteToDo(id))
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
