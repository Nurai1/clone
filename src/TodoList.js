import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoList = ({
  reducer,
  todos,
  sortingDetails,
  onRadioBtnClick,
  onCheckboxClick,
  onCheckboxOfCompleteStateClick,
  onDeleteBtnClick
}) => {

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
          onRadioBtnClick("text");
        }}
      />
    </label>
    <label htmlFor="">
      По дате:
      <input type="radio" name="sortFunc"
        checked={sortingDetails.item==="date"}
        onChange={()=>{}}
        onClick={()=>{
          onRadioBtnClick("date");
        }}
      />
    </label>
    <label htmlFor="">
      Изменить направление:
      <input type="checkbox"
        checked={sortingDetails.fromTop}
        onChange={onCheckboxClick}
      />
    </label>
    <ul>
      {
        todos.sort(initiliazeSortFunc(sortingDetails.item)).map((todo)=>{
          let toDoId= todo.id;
          return (todo.filterText && todo.filterDate)?
            <li key={todo.id} >
              <input type="checkbox" onClick={()=>{onCheckboxOfCompleteStateClick(toDoId)}} />
              Текст: {todo.text.toString()} Дата: {todo.date.toString()}
              <input onClick={()=>{onDeleteBtnClick(toDoId)}} type="button" value="Удалить" />
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

const mapDispatchToProps = (dispatch) => ({
  onRadioBtnClick: (item) => {
    dispatch(actions.changeSortItem(item));
  },
  onCheckboxOfDirectionClick: () => {
    dispatch(actions.toggleSortOrder());
  },
  onCheckboxOfCompleteStateClick: (id) => {
    dispatch(actions.toggleCompleteState(id))
  },
  onDeleteBtnClick: (id) => {
    dispatch(actions.deleteToDo(id));
  }
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
