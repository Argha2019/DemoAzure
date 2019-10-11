import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AdminTemplate from '../components/templates/AdminTemplate/Template.jsx';
import AgentTemplate from '../components/templates/AgentTemplate/Template.jsx';
import ViewTemplate from '../components/templates/ViewTemplate/Template.jsx';
import CustomerTemplate from '../components/templates/CustomerTemplate/Template.jsx';

import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');

describe('Admin Template', () => {


	it('should render snapshot', () => {
		const resp = { data : "kjdcsuhdjdjc"};
		axios.post.mockImplementation(() => Promise.resolve({ status: 201 , data: {accessToken: "asdfdsdfddgfdgfd"} }));
		let wrapper = shallow(<AdminTemplate />);
		
		Cookies.set('adminData', "Amit");
		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper = shallow(<AdminTemplate />);

		expect(wrapper.state('user')).toBe(true);
		
		Cookies.remove('adminData');
		
		
	});
    
});

describe('Agent Template' , () => {
	it('should render snapshot', () => {
		const resp = { data : "kjdcsuhdjdjc"};
		axios.post.mockImplementation(() => Promise.resolve({ status: 201 , data: {accessToken: "asdfdsdfddgfdgfd"} }));
		let wrapper = shallow(<AgentTemplate />);
		
		Cookies.set('agentData', "Amit");
		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper = shallow(<AgentTemplate />);

		expect(wrapper.state('user')).toBe(true);
		
		Cookies.remove('agentData');
		
		
	});
});

describe('View Template' , () => {
	it('should render snapshot', () => {
		const resp = { data : "kjdcsuhdjdjc"};
		axios.post.mockImplementation(() => Promise.resolve({ status: 201 , data: {accessToken: "asdfdsdfddgfdgfd"} }));
		let wrapper = shallow(<ViewTemplate />);
		
		Cookies.set('viewData', "Amit");
		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper = shallow(<ViewTemplate />);

		expect(wrapper.state('user')).toBe(true);
		
		Cookies.remove('viewData');
		
		
	});
});

describe('Customer Template' , () => {
	it('should render snapshot', () => {
		const resp = { data : "kjdcsuhdjdjc"};
		axios.post.mockImplementation(() => Promise.resolve({ status: 201 , data: {accessToken: "asdfdsdfddgfdgfd"} }));
		let wrapper = shallow(<CustomerTemplate />);
		
		Cookies.set('customerData', "Amit");
		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper = shallow(<CustomerTemplate />);

		expect(wrapper.state('user')).toBe(true);
		
		Cookies.remove('customerData');
		
		
	});
});

