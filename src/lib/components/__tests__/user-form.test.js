import React from 'react';
import '../../../config/jestSetup';
import { shallow, mount } from 'enzyme';
import UserForm from '../user-form';
import Field from '../field';
import { editFormStructure } from '../../../data/structure';

const userFormWrapper = shallow(
  <UserForm formStructure={editFormStructure} id="register" />
);
const userFormWrapperMount = mount(
  <UserForm formStructure={editFormStructure} id="register" />
);

describe('UserForm renders without problems ', () => {
    it('renders correctly', () => {
      expect(userFormWrapper).toMatchSnapshot();
      // On the first run of this test, Jest will generate a snapshot file automatically.
    });
  it('should be selectable by class "c-userform"', function() {
    expect(userFormWrapper.is('.c-userform')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(userFormWrapperMount.find('.c-userform').length).toBe(1);
  });

  it('should render as many Field components as there are data for', () => {
    expect(userFormWrapperMount.find(Field).length).toBe(
      editFormStructure.length
    );
  });
});

describe('all Fields must be validated when onBlur is handled', () => {
  it('calls correct function to save the information', () => {
    const handleValidate = jest.fn();

    const wrapper = shallow(<Field handleOnBlur={handleValidate} />);
    const buttonElement = wrapper.find('input'); // step 1 above
    buttonElement.simulate('blur'); // step 2

    expect(handleValidate).toHaveBeenCalledTimes(1); // step 3
    // expect(handleValidate).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     target: expect.any(String)
    //   })
    // );
  });
});
