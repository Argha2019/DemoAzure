import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import ViewProfile from '../components/pages/ViewProfile.jsx';
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

describe('ViewProfile', () => {
    it('render component', () => {
        Cookies.set('viewData', encryptByAES(JSON.stringify([dummyData])));
        const wrapper = shallow(<ViewProfile />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
})