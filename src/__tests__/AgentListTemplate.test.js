import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AgentListTemplate from '../components/templates/AgentListTemplate/AgentListTemplate.jsx';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

//test suite for Agent Search
describe('Agent Search Component', () => {

  //generate snapshot
  it('should render snapshot', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  //check DOM elements of Admin search
  
  it('should render required form elements', () => {
	const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );    
	
	const form = wrapper.find('#Form1');
    expect(form.length).toBe(2);
    expect(form.find('#reset').length).toBe(1);
    expect(form.find('#search').length).toBe(1);
});


 
  //check the reset button function
  it('Reset is called', () => {
   const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    ); 

    const form = wrapper.find('#Form1');
    expect(form.find('#reset').length).toBe(1);
    const event = {
      preventDefault: () => { }
    }
	wrapper.setState({
	  	  show : false,
	});
    const button = form.find('#reset').first();
    button.simulate('click', event);
    expect(wrapper.state('show')).toEqual(false);
  });

  
  //check the search button function
  it('Search is called', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('Form');
    expect(form.find('#search').length).toBe(1); 
    const event = {
      preventDefault: () => { },
    }
    wrapper.setState({
      lastName : "Mandal",
      email : "",
      phoneNo : "",
	  show: false,
  });
    const button = form.find('#search');
    button.simulate('click', event);
    wrapper.update();
    expect(wrapper.state('show')).toEqual(false);
  });

  
  //check the onChange function for right format of first name input
  it('onChange is called for first name', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('Form');
    const event = {
      preventDefault: () => { },
      target: {
        name: "firstName",
        value: "Kashish",
      }
    }
	wrapper.setState({
      firstName : "Kashish",
  });
	wrapper.update();
    wrapper.find('.firstName').first().simulate('change', event);
    expect(wrapper.state('firstName')).toEqual('Kashish');
  });

  //check the onChange function for wrong format of first name input
  it('onChange is called for wrong format of first name', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const event = {
      preventDefault: () => { },
      target: {
        name: "firstName",
        value: "k1",
      }
    }
	wrapper.setState({
		firstNameError:"Cannot contain numbers or special characters",
	});
	wrapper.update();
    wrapper.find('.firstName').first().simulate('change', event);
    expect(wrapper.state('firstNameError')).toEqual("Cannot contain numbers or special characters");

  });
  //check the onChange function for right format of last name input
  it('onChange is called for last name', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('Form');
    const event = {
      preventDefault: () => { },
      target: {
        name: "lastName",
        value: "Jain",
      }
    }
	wrapper.setState({
		lastName:"Jain",
	});
	wrapper.update();
    wrapper.find('.lastName').first().simulate('change', event);
    expect(wrapper.state('lastName')).toEqual('Jain');

  });

  //check the onChange function for right format of Admin id input
  it('onChange is called for id', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('Form');
    const event = {
      preventDefault: () => { },
      target: {
        name: "id",
        value: "11121",
      }
    }
	wrapper.setState({
		id:"11121",
	});
	wrapper.update();
    wrapper.find('.id').simulate('change', event);
    expect(wrapper.state('id')).toEqual('11121');

  });

  //check the onChange function for right format of email id input

  it('onChange is called for email id', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('Form');
    const event = {
      preventDefault: () => { },
      target: {
        name: "mail",
        value: "ka@gmail.com",
      }
    }
	wrapper.setState({
		mail:"ka@gmail.com",
	});
	wrapper.update();
    wrapper.find('.mail').first().simulate('change', event);
    expect(wrapper.state('mail')).toEqual('ka@gmail.com');

  });

  
  //check the button onclick function for search when all the fields are empty
  it('search function', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('.MySearchForm');
    const event = {
      preventDefault: () => {},
	  target : {	  
		show : false,
	  }
    }
    wrapper.setState({
      id: "",
      firstName: "",
      lastName: "",
      mail: "",
	  show: false,
    });
    const button = form.find('#search');
    button.simulate('click', event);
    wrapper.update();
    expect(wrapper.state('show')).toEqual(false);
  });

  
  //check the button onclick function for search when one of the fields is filled
  it('mock axios with input value', () => {
    const wrapper = mount(
      <MemoryRouter
		initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
        <AgentListTemplate />
      </MemoryRouter>,
    );
    const form = wrapper.find('.MySearchForm');
    const event = {
      preventDefault: () => { }
    }
    wrapper.setState({
      id: "",
      firstName: "vaibhav",
      lastName: "",
      mail: "",
	  emptyField: "",
    });
    const button = form.find('#search');
    button.simulate('click', event);
    wrapper.update();
    expect(wrapper.state('emptyField')).toEqual("");
  });


  /*
  //select for pagination
  it('testing select', () =>
  {
		const wrapper = mount(
		  <MemoryRouter
			initialEntries={[ { pathname: '/agentDetailsPage', key: 'testKey' } ]}>
			<AgentListTemplate />
		  </MemoryRouter>,
		);
		wrapper.find('.test-header').simulate('onChange', {target : { value : '10'}});
  });

  */
  
 });


 
