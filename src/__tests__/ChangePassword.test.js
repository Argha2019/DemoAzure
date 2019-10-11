import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cookies from 'js-cookie';
import { encryptByAES , decryptByAES } from '../components/pages/Encryption.jsx';
import ChangePassword from '../components/pages/ChangePassword.jsx';

describe('ChangePassword Component', () => {
   it('Should render snapshot for Customer', () => {
      const wrapper = shallow(<ChangePassword />);
      expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('Should render snapshot for Admin', () => {
		Cookies.set('adminData',"amit");
		const wrapper = shallow(<ChangePassword />);
		expect(toJson(wrapper)).toMatchSnapshot();
		Cookies.remove('adminData',"amit");
	  });
	  it('Should render snapshot Agent', () => {
		Cookies.set('agentData',"amit");
		const wrapper = shallow(<ChangePassword />);
		expect(toJson(wrapper)).toMatchSnapshot();
		Cookies.remove('agentData','amit');
	  });

it('Valid Credential Check', () => {
	const wrapper = shallow(<ChangePassword />);
	const form = wrapper.find('.MyForm');
	const event = {
	  preventDefault: () => {}
	};

	 wrapper.setState({

	   formErrors: {oldPassword:"",newPassword:"Entered password doesn't match with New Password",confirmPassword:""}
	 });
	 wrapper.update();

	const formSubmit = form.find('.MyForm');
	formSubmit.simulate('submit', event);
	  expect(wrapper.state('validCredential')).toEqual("Please enter valid Credentials");
	});


});




