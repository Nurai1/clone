import {
  todos,
  todoCurrentValues,
  visibilityFilters,
  sortingDetails,
  inputErrorState

} from "../reducer";

let initState = {
  todos: [{
    id: 0,
    text: "do homework",
    date: "01-01-2020",
    completed: false
  }],
  todoCurrentValues: {},
  visibilityFilters: {
    text: "",
    date: ""
  },
  sortingDetails: {
    item:"",
    fromTop: false
  },
  inputErrorState: false
};

describe("reducer", () =>{
  describe("todo store", () => {
    it("returns todo list with new todo", () => {
      let initTodos = [{
        id: 0,
        text: "do homework",
        date: "01-01-2020",
        completed: false
      }];

      let expectedTodos = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: false,
        },
        {
          id: 1,
          text: "clean room",
          date: "06-06-2020",
          completed: false,
        }
      ];

      expect(todos(
        initTodos,
        {type: "ADD_TODO", text: "clean room", date: "06-06-2020"}
      )).toEqual(expectedTodos);
    });

    it("returns todo list with one item toggled", () => {
      let initTodos = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: false
        },
        {
          id: 1,
          text: "clean room",
          date: "06-06-2020",
          completed: false,
        }
      ];

      let expectedTodos = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: true,
        },
        {
          id: 1,
          text: "clean room",
          date: "06-06-2020",
          completed: false,
        }
      ];

      expect(todos(
        initTodos,
        {type: "TOGGLE_COMPLETE", id: 0}
      )).toEqual(expectedTodos);
    });

    it("returns todo list with one item deleted", () => {
      let initTodos = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: true
        },
        {
          id: 1,
          text: "clean room",
          date: "06-06-2020",
          completed: false,
        }
      ];

      let expectedTodos = [{
        id: 0,
        text: "do homework",
        date: "01-01-2020",
        completed: true,
      }];

      expect(todos(
        initTodos,
        {type: "DELETE_TODO", id: 1}
      )).toEqual(expectedTodos);
    });

    it("returns unchanged todo list", () => {
      let initTodos = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: true
        }
      ];

      let expectedList = [
        {
          id: 0,
          text: "do homework",
          date: "01-01-2020",
          completed: true
        }
      ];

      expect(todos(initTodos, {type: "nonExistingType"})).toEqual(expectedList);
    });
  });

  describe("store of current text and date values", () => {
    it("return store with current text value", () => {
      let initStore = {
        date: "25-01-01",
        text: ""
      };
      let expectedStore = {
        text: "kill the dragon",
        date: "25-01-01"
      };

      expect(todoCurrentValues(
        initStore,
        {type: "ADD_CURRENT_TEXT", value: "kill the dragon"}
      )).toEqual(expectedStore);
    });

    it("return store with current date value", () => {
      let initStore = {
        text: "catch a griffin",
        date: "18-01-01",
      };
      let expectedStore = {
        text: "catch a griffin",
        date: "26-03-03"
      };

      expect(todoCurrentValues(
        initStore,
        {type: "ADD_CURRENT_DATE", value: "26-03-03"}
      )).toEqual(expectedStore);
    });

    it("return unchanged store", () => {
      let initStore = {
        text: "catch a griffin",
        date: "18-01-01",
      };
      let expectedStore = {
        text: "catch a griffin",
        date: "18-01-01"
      };

      expect(todoCurrentValues(
        initStore,
        {type: "nonExistingType"}
      )).toEqual(expectedStore);
    });
  });
});
