import { makeIdCounter } from './utilities';

let storeFromLocalStore = JSON.parse(localStorage.getItem("reducer"));

let maxId=0;
if(storeFromLocalStore){
  for(let val of storeFromLocalStore.todos){
    if(val.id>maxId)
      maxId=val.id;
  }
}
const idCounter = makeIdCounter(maxId+1);

const todosReducer = function(state=[], action) {
  switch(action.type){
    case "ADD_TODO":
      return [
          ...state,
          {
            id: idCounter(),
            text: action.text,
            date: action.date,
            completed: false,
            filterText: true,
            filterDate: true
          }
        ]
    case "FILTER__TEXT":
      return state.map(function(val) {
          if (!val.text.includes(action.text)){
            return {...val, filterText: false}
          }
            return {...val, filterText: true}
        })
    case "FILTER__DATE":
      return state.map(function(val) {
          if (val.date !== action.date){
            return {...val, filterDate: false}
          }
          return val;
        })
    case "CLEAR__FILTERS":
      return state.map(function(val) {
            return {...val, filterText: true, filterDate: true}
        })
    case "TOGGLE__COMPLETE":
      return state.map(function(val) {
              if (action.id===val.id){
                return Object.assign({}, val, {completed: !val.completed});
              }
              return val;
            })
    case "DELETE__TODO":
      return state.filter(function(val) {
              return action.id!==val.id
            })
    default:
      return state;
  }
}

const sortingDetailsReducer = function(state={item:"", fromTop: false}, action) {
  switch(action.type) {
    case "CHANGE__SORT_ITEM":
      return {
        ...state,
        item: action.item,
      }
    case "TOGGLE__SORT_ORDER":
      return{
        ...state,
        fromTop: !state.fromTop,
      }
    default:
      return state;
  }
}

const reducer = function(
  state=(storeFromLocalStore)?
storeFromLocalStore:{}, action) {
  return {
    todos: todosReducer(state.todos, action),
    sortingDetails: sortingDetailsReducer(state.sortingDetails, action),
  }
}

export default reducer;
