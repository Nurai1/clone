import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedFilterInput, { FilterInput } from "../../components/FilterInput";
import {
  setVisibilityFilterFromText,
  setVisibilityFilterFromDate
} from '../../actions';

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const wrapper = shallow(
    <FilterInput {...props} />
  );
  return wrapper;
}

const props = {
  setVisibilityFilterFromText: jest.fn(),
  setVisibilityFilterFromDate: jest.fn()
};

describe("Filter Input Component", () => {
  describe("Unconnected Filter Input Component", () => {

    it("capturing snapshot of component", () => {

      const renderedComponent = renderer.create(<FilterInput {...props} />).toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it("should call change callbacks", () => {

      const wrapper = setup(props);

      wrapper.find("input[type='text']").simulate("change", {
        target: {value: "abc"}
      });

      expect(props.setVisibilityFilterFromText).toHaveBeenCalledWith("abc");

      wrapper.find("input[type='date']").simulate("change", {
        target: {value: "22-05-2020"}
      });

      expect(props.setVisibilityFilterFromDate).toHaveBeenCalledWith("22-05-2020");
    });
  });

  describe("Connected Filter Input Component", () => {
    const initState = {...props};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
      store = mockStore(initState);
      wrapper = shallow(<ConnectedFilterInput store={store} />);
    });

    it("render the connected component", () => {
      expect(wrapper.length).toBe(1);
    });

    it("check action on dispatching", () => {
      let action;
      store.dispatch(setVisibilityFilterFromText("abc"));
      store.dispatch(setVisibilityFilterFromDate("22-03-1998"));
      action = store.getActions();
      expect(action[0].type).toBe("FILTER_TEXT");
      expect(action[1].type).toBe("FILTER_DATE");
    });
  });
});
