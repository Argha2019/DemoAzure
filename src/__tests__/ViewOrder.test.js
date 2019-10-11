import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ViewOrder from '../components/pages/ViewOrder.jsx';
import Cookies from 'js-cookie';
import { encryptByAES, decryptByAES } from '../components/pages/Encryption.jsx';

const dummyData = {
    firstName: "test",
    lastName: "test",
    dateOfBirth: "yyyy-mm-dd",
    phone: encryptByAES("1234567890"),
    mail: encryptByAES("test@test.com"),
    addressLine1: "test",
    addressLine2: "test",
    state: "test",
    country: "test",
    pincode: "test",
    role: "AGENT VIEW",
    username: encryptByAES("test123")
};

describe('My Orders Component', () => {
  it('should render snapshot', () => {
    Cookies.set('viewData', encryptByAES(JSON.stringify([dummyData])));
     const wrapper = shallow(<ViewOrder />);
     expect(toJson(wrapper)).toMatchSnapshot();
   });

//   // it('modalFuncOpen is called', () => {
//   //   const wrapper = shallow(<MyOrders />);
//   //   expect(wrapper.find('#openModal').length).toBe(1);
//   //     const button = wrapper.find('#openModal');
//   //     button.simulate('click');
//   //     expect(wrapper.state('showModal')).toEqual(true);
//   //   });

//   // it('modalFuncClose is called', () => {
//   //   const wrapper = shallow(<MyOrders />);
//   //    wrapper.setState({
//   //     showModal: true
//   //   });
//   //     expect(wrapper.find('#closeModal').length).toBe(1);
//   //     const button = wrapper.find('#closeModal');
//   //     button.simulate('click');
//   //     wrapper.update();
//   //     expect(wrapper.state('showModal')).toEqual(false);
//   //   });
//   // it('should call Modify', () => {
//   //    const wrapper = shallow(<MyOrders />);
//   //    wrapper.setState({
//   //     showModal: true
//   //   });
//   //   expect(wrapper.find('#modifyButton').length).toBe(1);
//   //  });
});
