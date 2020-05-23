import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

import { TodoList } from '../../components/TodoList';

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const wrapper = shallow(
    <TodoList {...props} />
  );

  return wrapper;
}

const props = {
  todos: [
    {
      id: 1,
      text: "create store",
      date: "22.02.2004",
      completed: false
    },
    {
      id: 2,
      text: "finished iting",
      date: "22.02.2003",
      completed: false
    }
  ],
  sortingDetails: {item:"text", fromTop: false},
  visibilityFilters: {text: "", date: ""},
  toggleSortOrder: jest.fn(),
  changeSortItem: jest.fn()
};

describe("Todo List Component", () => {

  it("capturing snapshot of component", () => {

    const renderedComponent = renderer.create(<TodoList {...props} />).toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });

  it("renders without todo list", () => {
    const wrapper = setup({
      todos: [],
      sortingDetails: {item:"", fromTop: false},
      visibilityFilters: {text: "", date: ""}
    });

    expect(wrapper.find("ul").children().exists()).toEqual(false);
  });

  it("renders with todo list", () => {

    const wrapper = setup(props);

    expect(wrapper.find("ul").children()).toHaveLength(props.todos.length);
  });

  it("checks sorting function", () => {

    const wrapper = setup(props);
    const sortingFunction = function(sortItem, fromTop) {
      if (fromTop){
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
    };

    let todosCopy = [...props.todos];
    todosCopy = todosCopy.sort(
      sortingFunction(
        props.sortingDetails.item,
        props.sortingDetails.fromTop
  ));

    let renderedTodos = wrapper.find("li");
    renderedTodos.forEach((value, index) => {
      expect(value.key()).toBe(todosCopy[index].id+"");
    });

  });

  it("should show only one item at Todo list using visibility filter", () => {

    const localProps = {
      ...props,
      visibilityFilters: {text: "create", date: ""}
    };


    const wrapper = setup(localProps);
    const expectedLength = 1;

    expect(wrapper.find("li")).toHaveLength(expectedLength);
  });

  it(
    `should call toggleSortOrder props function, if try to click on the sorting
    button which won't change sorting item `, () => {

      const wrapper = setup(props);

      const txtButton = wrapper.find(".btn__sort_txt");
      txtButton.props().onClick();

      expect(props.toggleSortOrder.mock.calls.length).toBe(1);
  });

  it("should call changeSortItem props function with date parameter", () => {

    const wrapper = setup(props);

    const dateButton = wrapper.find(".btn__sort_date");
    // dateButton.props().onClick();
    dateButton.simulate("click");
    expect(props.changeSortItem).toHaveBeenCalledWith("date");
  });

});
