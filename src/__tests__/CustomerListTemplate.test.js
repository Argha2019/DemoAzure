import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomerListTemplate from '../components/templates/CustomerListTemplate/CustomerListTemplate.jsx';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(< CustomerListTemplate/>);
    });
});

//Test Suite for Customer Search

//Testing onChange event
//Testing the onChange function for last name for correct input
it('onChange function for last name for correct input', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "lastName",
			value: "Mandal"
        }
    }
    wrapper.find('.lastName').simulate('change', event);
    expect(wrapper.state('lastName')).toEqual('Mandal');  
});

//Testing the onChange function for last name for incorrect input
it('onChange function for last name for incorrect input', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "lastName",
			value: "Mandal123"
        }
    }
    wrapper.find('.lastName').simulate('change', event);
    expect(wrapper.state('lastNameError')).toEqual('Cannot contain numbers or special characters');  
});


//Testing the onChange function for email for correct input
it('onChange function for email for correct', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "mail",
			value: "manjeet.singh@gmail.com"
        }
    }
    wrapper.find('.mail').simulate('change', event);
    expect(wrapper.state('mail')).toEqual('manjeet.singh@gmail.com');  
});

//Testing the onChange function for email for incorrect input
it('onChange function for email for incorrect', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "mail",
			value: "manjeet.singhgmail.com"
        }
    }
    wrapper.find('.mail').simulate('change', event);
    expect(wrapper.state('mailError')).toEqual('Please enter a valid mail id');  
});

//Testing the onChange function for phone number for correct input
it('onChange function for phone number for correct input', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "phoneNo",
			value: "9876543210"
        }
    }
    wrapper.find('.phoneNo').simulate('change', event);
    expect(wrapper.state('phoneNo')).toEqual('9876543210');  
});


//Testing the onChange function for phone number for incorrect input
it('onChange function for phone number for incorrect input', () =>{
	const wrapper = shallow(<CustomerListTemplate/>);
	const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
        target: {
			name: "phoneNo",
			value: "987654321"
        }
    }
    wrapper.find('.phoneNo').simulate('change', event);
    expect(wrapper.state('phoneNoError')).toEqual('Please enter 10 digit phone no.!');  
});



//Testing Search Button click
//Testing search button click with valid inputs
it('Search button is clicked with vaild inputs', () => {
    const wrapper = shallow(<CustomerListTemplate/>);
    const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
    }
	wrapper.setState({
        lastName : "Mandal",
        email : "",
        phoneNo : ""
    });
    const button = form.find('#search1');
    button.simulate('click', event);
    wrapper.update();
    expect(wrapper.state('show')).toEqual(false);
});

//Testing search button click with empty result
it('Search button is clicked with vaild inputs', () => {
    const wrapper = shallow(<CustomerListTemplate/>);
    const form = wrapper.find('Form');
    const event = {
        preventDefault: () => {},
    }
	wrapper.setState({
        lastName : "Mandal",
        email : "",
        phoneNo : "",
		customer : []
    });
    const button = form.find('#search1');
    button.simulate('click', event);
    wrapper.update();
    expect(wrapper.state('show')).toEqual(false);
});


//Testing Reset Button click
it('Reset button is clicked', () => {
     const wrapper = shallow(<CustomerListTemplate/>);
     const form = wrapper.find('Form');
     expect(form.find('#reset2').length).toBe(1);
     const event = {
         preventDefault: () => {},
     }
     const button = form.find('#reset2');
     button.simulate('click', event);
     expect(wrapper.state('show')).toEqual(false);
});
