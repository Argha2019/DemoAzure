import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MyOrders from '../components/pages/MyOrders.jsx';
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
    Cookies.set('agentData', encryptByAES(JSON.stringify([dummyData])));
     const wrapper = shallow(<MyOrders />);
     expect(toJson(wrapper)).toMatchSnapshot();
   });


});
