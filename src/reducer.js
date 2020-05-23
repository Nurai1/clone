import { combineReducers } from 'redux';

import { makeIdCounter } from './utilities';

let storeFromLocalStore = JSON.parse(localStorage.getItem("todos"));
let defaultTodos = storeFromLocalStore?storeFromLocalStore:[];

let maxId=0;
if(storeFromLocalStore){
  for(let val of storeFromLocalStore){
    if(val.id>maxId)
      maxId=val.id;
  }
}
const idCounter = makeIdCounter(maxId+1);

export const todos = function(state=defaultTodos, action) {
  switch(action.type){
    case "ADD_TODO":
      return [
          ...state,
          {
            id: idCounter(),
            text: action.text,
            date: action.date,
            completed: false,
          }
        ]
    case "TOGGLE_COMPLETE":
      return state.map(function(val) {
              if (action.id===val.id){
                return Object.assign({}, val, {completed: !val.completed});
              }
              return val;
            })
    case "DELETE_TODO":
      return state.filter(function(val) {
              return action.id!==val.id
            })
    default:
      return state;
  }
}

export const todoCurrentValues = function(state={text: "", date: ""}, action) {
  switch(action.type){
    case "ADD_CURRENT_TEXT":
      return {
        ...state,
        text: action.value
      }

    case "ADD_CURRENT_DATE":
      return {
        ...state,
        date: action.value
      }
    default:
      return state;
  }
}

export const visibilityFilters = function(state={text: "", date: ""}, action) {
  switch(action.type) {
    case "FILTER_TEXT":
      return {
        ...state,
        text: action.text
      }
    case "FILTER_DATE":
      return {
        ...state,
        date: action.date
      }
    case "CLEAR_FILTERS":
      return {
        text: "",
        date: ""
      }
    default:
      return state
  }
}

export const sortingDetails = function(state={item:"", fromTop: false}, action) {
  switch(action.type) {
    case "CHANGE_SORT_ITEM":
      return {
        ...state,
        item: action.item,
      }
    case "TOGGLE_SORT_ORDER":
      return{
        ...state,
        fromTop: !state.fromTop,
      }
    default:
      return state;
  }
}

export const inputErrorState = function(state=false, action) {
  switch(action.type) {
    case "SET_INPUT_ERROR_STATE":
      return action.value;
    default:
      return state;
  }
}

const reducer = combineReducers({
  todos,
  todoCurrentValues,
  sortingDetails,
  visibilityFilters,
  inputErrorState
});

export default reducer;
