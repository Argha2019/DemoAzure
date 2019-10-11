import React from 'react';
import { shallow, mount } from 'enzyme';
import OMSForm from '../components/pages/OmsForm.jsx';
import toJson from 'enzyme-to-json';
import Registration from '../components/pages/Registration.jsx';

describe('OMSForm Component', () => {
  it('should render snapshot', () => {
    const wrapper = shallow(<OMSForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render required form elements', () => {
    const wrapper = shallow(<OMSForm />);
    const form = wrapper.find('Form');
    expect(form.length).toBe(1);
    expect(form.find('Button').length).toBe(1);
    expect(form.find('Button').props().disabled).toBe(false);
    expect(form.find('FormControl').length).toBe(2);

  });

  it('div elements', () => {
    const wrapper = shallow(<OMSForm />);
    const oms = wrapper.find('div');
    expect(oms.length).toBe(3);
    expect(oms.find('Button').length).toBe(2);
  });
});

describe('Sign In', () => {
  let register;
  let onRegister;

  beforeEach(() => {
    onRegister = jest.fn();
    register = shallow(<OMSForm onRegister={onRegister} />);
  });
  it('Register require onRegister props', () => {
    const button = register.find('.register').first();
    expect(button).toBeDefined();
  });

  it('handle change function', () => {

    const event = {
      preventDefault: () => { },
      target: {
        name: "username",
        value: "hasan",
      }
    }

    const wrapper = shallow(<OMSForm />);

    wrapper.setState({
      username: "hasan",
      password: "hasan"
    });

    const input = wrapper.find('FormControl').first();
    input.simulate('change', event);
    wrapper.update();
    expect(event.target.value).toBe('hasan');
    expect(event.target.name).toBe("username");
  });

  it('handle change function', () => {

    const event = {
      preventDefault: () => { },
      target: {
        name: "password",
        value: "Hey@23",
      }
    }

    const wrapper = shallow(<OMSForm />);

    wrapper.setState({
      username: "hasan",
      password: "Hey@23"
    });

    const input = wrapper.find('FormControl').first();
    input.simulate('change', event);
    wrapper.update();
    expect(event.target.value).toBe('Hey@23');
    expect(event.target.name).toBe("password");
  });




  it('Button again', () => {
    const event = {
      preventDefault: () => { },
    }
    const log = jest.fn();
    global.console = { log };

    const wrapper = shallow(<OMSForm state={{ username: "hasan" }} onSubmit={log} />);
    const form = wrapper.find('Form');
    form.simulate('submit', event);
    expect(log).toHaveBeenCalledTimes(0);
    expect(wrapper.state('validCredential')).toBe('');
  });


});




