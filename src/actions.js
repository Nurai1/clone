// ACTION CREATORS

export const addCurrentText = function(value) {
  return { type: "ADD_CURRENT_TEXT", value };
}

export const addCurrentDate = function(value) {
  return { type: "ADD_CURRENT_DATE", value };
}

export const addToDo = function(text, date) {
  return { type: "ADD_TODO", text, date };
}

export const setVisibilityFilterFromText = function(text) {
  return { type: "FILTER_TEXT", text };
}

export const setVisibilityFilterFromDate = function(date) {
  return { type: "FILTER_DATE", date };
}

export const clearVisibilityFilters = function() {
  return { type: "CLEAR_FILTERS" };
}

export const toggleCompleteState = function(id) {
  return { type: "TOGGLE_COMPLETE", id };
}

export const deleteToDo = function(id) {
  return { type: "DELETE_TODO", id }
}

export const changeSortItem = function(item) {
  return { type: "CHANGE_SORT_ITEM", item }
}

export const toggleSortOrder = function() {
  return { type: "TOGGLE_SORT_ORDER" }
}

export const setInputErrorState = function(value) {
  return {type: "SET_INPUT_ERROR_STATE", value}
}
