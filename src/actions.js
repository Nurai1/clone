// ACTION CREATORS

export function addToDo(text, date) {
  return { type: "ADD_TODO", text, date };
}

export function filterFromText(text) {
  return { type: "FILTER__TEXT", text };
}

export function filterFromDate(date) {
  return { type: "FILTER__DATE", date };
}

export function clearFilters() {
  return { type: "CLEAR__FILTERS" };
}

export function toggleCompleteState(id) {
  return { type: "TOGGLE__COMPLETE", id };
}

export function deleteToDo(id) {
  return { type: "DELETE__TODO", id }
}

export function changeSortItem(item) {
  return { type: "CHANGE__SORT_ITEM", item }
}

export function toggleSortOrder() {
  return { type: "TOGGLE__SORT_ORDER" }
}
