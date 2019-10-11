import React from 'react';
import { shallow, mount } from 'enzyme';
import OMSForm from '../../components/pages/OmsForm.jsx';
import toJson from 'enzyme-to-json';
import Registration from '../../components/pages/Registration.jsx';
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/omsform.feature');

defineFeature(feature, test => {
	test('Rendering Snapshot', ({given,when,then}) => {

		let wrapper;

		given('snapshot given', () => {

		});

		when('mounting snapshot', () => {
			wrapper = shallow(<OMSForm />);
		});

		then('it should render the snapshot', () => {
			expect(toJson(wrapper)).toMatchSnapshot();
		});

	});

	test('Should render required form elements', ({given,when,then}) => {

		let wrapper;
		let form;

		given('snapshot given', () => {

		});

		when('finding Form', () => {
			wrapper = shallow(<OMSForm />);
			form = wrapper.find('Form');
		});

		then('it should find FormControl And Buttons', () => {
			expect(form.length).toBe(1);
	   		expect(form.find('Button').length).toBe(1);
	   		expect(form.find('Button').props().disabled).toBe(false);
	     	expect(form.find('FormControl').length).toBe(2);
		});

	});

	test('Should render the OMSForm and find div and buttons', ({given,when,then}) => {

		let wrapper;
		let oms;

		given('snapshot given', () => {

		});

		when('finding div and buttons', () => {
			wrapper = shallow(<OMSForm />);
			oms = wrapper.find('div');
		});

		then('it should get 1 div and 2 buttons', () => {
			expect(oms.length).toBe(3);
   			expect(oms.find('Button').length).toBe(2);
		});

	});

	test('Register Button Definition', ({given,when,then}) => {

		let register;
		let onRegister;
		let button;

		given('snapshot given', () => {

		});

		when('finding button register', () => {
			onRegister = jest.fn();
    		register = shallow(<OMSForm onRegister={onRegister} />);
    		button = register.find('.register').first();
		});

		then('it should be defined', () => {
			expect(button).toBeDefined();
		});

	});

	test('OnChange function', ({given,when,then}) => {

		let event;
		let wrapper;
		let input;

		given('snapshot given', () => {

		});

		when('changing values in fields', () => {
			event = {
		      preventDefault: () => {},
		      target: {
		          name: "username",
		          value: "hasan",
		        }
      		}

	    	wrapper = shallow(<OMSForm />);

	    	wrapper.setState({
	      		username: "hasan",
	      		password: "hasan"
	    	});

	    	input = wrapper.find('FormControl').first();
	    	input.simulate('change', event);
	    	wrapper.update();
			});

		then('onChange should be called and state should be updated', () => {
			expect(event.target.value).toBe('hasan');
    		expect(event.target.name).toBe("username");
		});

	});

	test('on Button Click', ({given,when,then}) => {

		let event;
		let log;
		let wrapper;
		let form;

		given('snapshot given', () => {

		});

		when('submit button is clicked', () => {
			event = {
      			preventDefault: () => {},
    		}

    		log = jest.fn();
    		global.console = {log};

    		wrapper = shallow(<OMSForm state={{username: "hasan"}} onSubmit={log} />);
    		form = wrapper.find('Form');
    		form.simulate('submit', event);
		});

		then('check valid credentials', () => {
			expect(log).toHaveBeenCalledTimes(0);
    		expect(wrapper.state('validCredential')).toBe('');
		});

	});
});
