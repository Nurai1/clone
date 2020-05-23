import React from "react";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedTodoInput, { TodoInput } from "../../components/TodoInput";

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const wrapper = shallow(
    <TodoInput {...props} />
  );
  return wrapper;
}

const propsWithoutCrntValues = {
  todoCurrentValues: {text: "", date: ""},
  inputErrorState: false,
  addNewTodo: jest.fn(),
  setInputErrorState: jest.fn(),
  addCurrentDate: jest.fn(),
  addCurrentText: jest.fn()
};

const propsWithCrntValues = {
  todoCurrentValues: {text: "become the hokage", date: "22-05-2030"},
  inputErrorState: false,
  addNewTodo: jest.fn(),
  setInputErrorState: jest.fn(),
  addCurrentDate: jest.fn(),
  addCurrentText: jest.fn()
};

describe("Todo Input Component", () => {

  describe("Unconnected Todo Input Component", () => {

    it("capturing snapshot of component", () => {

      const renderedComponent = renderer.create(<TodoInput {...propsWithoutCrntValues} />).toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it("renders without or with mistakes at inputs", () => {

      const wrapperWithoutCurrentValues = setup(propsWithoutCrntValues);

      let inputsWithoutCurrentValues = wrapperWithoutCurrentValues.find("label > input");
      inputsWithoutCurrentValues.forEach((val) => {
        expect(val.hasClass("error")).toEqual(false);
      });

      const wrapperWithCurrentValuesandErrorState = setup({
        ...propsWithCrntValues,
        inputErrorState: true
      });

      let inputsWithCurrentValues = wrapperWithCurrentValuesandErrorState.find("label > input");
      inputsWithCurrentValues.forEach((val) => {
        expect(val.hasClass("error")).toEqual(false);
      });

      const wrapperWithErrorState = setup({
        ...propsWithoutCrntValues,
        inputErrorState: true
      });

        let inputsWithErrorState = wrapperWithErrorState.find("label > input");
        inputsWithErrorState.forEach((val) => {
          expect(val.hasClass("error")).toEqual(true);
        });

    });


    it("check the onSubmit callback with and without current values", () => {

      const wrapperWithCrntValues = setup(propsWithCrntValues);

      wrapperWithCrntValues.find("form").simulate("submit", {
        preventDefault: () => {}
      });

      expect(propsWithCrntValues.setInputErrorState).toHaveBeenCalledWith(false);
      expect(propsWithCrntValues.addNewTodo)
      .toHaveBeenCalledWith(
        propsWithCrntValues.todoCurrentValues.text,
        propsWithCrntValues.todoCurrentValues.date
      );

      const wrapperWithoutCrntValues = setup(propsWithoutCrntValues);

      wrapperWithoutCrntValues.find("form").simulate("submit", {
        preventDefault: () => {}
      });

      expect(propsWithoutCrntValues.setInputErrorState).toHaveBeenCalledWith(true);
      expect(propsWithoutCrntValues.addNewTodo.mock.calls.length).toBe(0);
    });

  });

  describe("Connected Todo Input Component", () => {

    const initState = {...propsWithCrntValues};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
      store = mockStore(initState);
      wrapper = shallow(<ConnectedTodoInput store={store} />);
    });

    it("render the connected component", () => {
      expect(wrapper.length).toBe(1);
    });

    it("check prop matches with initial state", () => {
      expect(wrapper.find(TodoInput).prop('todoCurrentValues')).toEqual(initState.todoCurrentValues);
      expect(wrapper.find(TodoInput).prop('inputErrorState')).toEqual(initState.inputErrorState);
    });
  });
});
