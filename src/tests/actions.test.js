import * as actionCreators from '../actions';

describe("actions", ()=>{
  it("return different actions", ()=>{
    expect(actionCreators.addCurrentText("do homework")).toEqual({
        type: "ADD_CURRENT_TEXT",
        value: "do homework"
      });

    expect(actionCreators.addCurrentDate("22-05-2020")).toEqual({
        type: "ADD_CURRENT_DATE",
        value: "22-05-2020"
      });

    expect(actionCreators.addToDo("do homework", "22-05-2020")).toEqual({
        type: "ADD_TODO",
        text: "do homework",
        date: "22-05-2020"
      });

    expect(actionCreators.setVisibilityFilterFromText("hom")).toEqual({
      type: "FILTER_TEXT",
      text: "hom"
    });

    expect(actionCreators.setVisibilityFilterFromDate("4")).toEqual({
      type: "FILTER_DATE",
      date: "4"
    });

    expect(actionCreators.clearVisibilityFilters()).toEqual({
      type: "CLEAR_FILTERS"
    });

    expect(actionCreators.toggleCompleteState(2)).toEqual({
      type: "TOGGLE_COMPLETE",
      id: 2
    });

    expect(actionCreators.deleteToDo(2)).toEqual({
      type: "DELETE_TODO",
      id: 2
    });

    expect(actionCreators.changeSortItem("text")).toEqual({
      type: "CHANGE_SORT_ITEM",
      item: "text"
    });

    expect(actionCreators.toggleSortOrder()).toEqual({
      type: "TOGGLE_SORT_ORDER"
    });

    expect(actionCreators.setInputErrorState(true)).toEqual({
      type: "SET_INPUT_ERROR_STATE",
      value: true
    });
  });
});
