import React from "react";
import "../../../config/jestSetup";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import UserForm from "../user-form";
import { editFormStructure } from "../../../data/structure";

// const dummyFormEdit = {
//   firstName: 'anusky',
//   username: 'anusky123',
//   email: 'anusky.pitrusky@gmail.com',
//   password1: '',
//   password2: '',
//   country: 'España',
//   addressPostalcode: '08004',
//   addressCity: '',
//   addressPhone: '111222333',
//   addressPostalcodeInvoice: '',
//   addressCityInvoice: '',
//   addressPhoneInvoice: ''
// }

const userFormWrapper = shallow(
  <UserForm formStructure={editFormStructure} id="register" />
);
const userFormWrapperMount = mount(
  <UserForm formStructure={editFormStructure} id="register" />
);

describe("<UserForm /> ", () => {
  // test('UserForm snapshot', () => {
  //   const tree = renderer
  //     .create(<UserForm formStructure={editFormStructure} id="register" />)
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })

  it('should be selectable by class "c-userform"', function() {
    expect(userFormWrapper.is(".c-userform")).toBe(true);
  });

  it("should mount in a full DOM", function() {
    expect(userFormWrapperMount.find(".c-userform").length).toBe(1);
  });

  it("should render as many inputs as there are data for", () => {
    expect(userFormWrapperMount.find("label").length).toBe(
      editFormStructure.length
    );
    // expect(userFormWrapper.find(<label> <label/>).length).to.equal(data.editForm.length)
  });

  it("should do things when click", () => {
    const onButtonClickSpy = jest.spyOn(
      userFormWrapper.instance(),
      "onClickPrueba"
    );
    userFormWrapper.update();
    userFormWrapper.instance().forceUpdate();

    userFormWrapper.find(".caca").simulate("click");
    expect(onButtonClickSpy).toHaveBeenCalled();
  });
});
