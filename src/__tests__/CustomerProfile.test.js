import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomerProfile from '../components/pages/CustomerProfile.jsx';
import {dateValidator} from '../components/pages/CustomerProfile.jsx';
import Cookies from 'js-cookie';

describe('Customer Profile', () => {
    it('render component', () => {
        const wrapper = shallow(<CustomerProfile />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('on change of firstName field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "firstName",
                value: "Yashika",
                readOnly: false,
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.firstName');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('firstName')).toBe("Yashika");
    });



    it('on change of lastName field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "lastName",
                value: "Gupta",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.lastName');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('lastName')).toBe("Gupta");
    });

    it('on change of phone field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "phone",
                value: "0000000000",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.phone');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('phone')).toBe("0000000000");
    });

    it('on change of mail field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "mail",
                value: "yashi@123",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.mail');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('mail')).toBe("yashi@123");
    });

    it('on change of addressLine1 field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "addressLine1",
                value: "abcd",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.addressLine1');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('addressLine1')).toBe("abcd");
    });

    it('on change of addressLine2 field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "addressLine2",
                value: "abcd",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.addressLine2');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('addressLine2')).toBe("abcd");
    });

    it('on change of state field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "state",
                value: "def",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        wrapper.setState({
            edit: true,
            readOnly: false,

        });
        const input = wrapper.find('.state');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('state')).toBe("def");
    });

    it('on change of country field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "country",
                value: "abcd",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        const input = wrapper.find('.country');
        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('country')).toBe("abcd");
    });

    it('on change of pincode field', () => {
        const event = {
            preventDefault: () => { },
            target: {
                name: "pincode",
                value: "123456",
            }
        };
        const wrapper = shallow(<CustomerProfile />);
        const input = wrapper.find('.pincode');

        input.simulate('change', event);
        expect(input.length).toBe(1);
        expect(wrapper.state('pincode')).toBe("123456");
    });
    it('cancelProfile is called', () => {
        const wrapper = shallow(<CustomerProfile />);

        const event = {
            preventDefault: () => { },
        }

        wrapper.setState({
            edit: true
        });
        wrapper.update();
        const form = wrapper.find('.MyForm');
        wrapper.find('.RegisterButton').last().simulate('click', event);
        expect(wrapper.state('edit')).toEqual(false);
    });

    it('edit button on form 1', () => {
        const wrapper = shallow(<CustomerProfile />);
        const form = wrapper.find('.MyForm');
        const event = {
            preventDefault: () => { }
        }
        wrapper.setState({
            edit: false
        });
        wrapper.update();

        const button = form.find('.RegisterButton');
        button.simulate('click', event);

        expect(wrapper.state('edit')).toEqual(true);
    });


    it('edit function', () => {
        const wrapper = shallow(<CustomerProfile />);
        const form = wrapper.find('.MyForm');
        const event = {
            preventDefault: () => { }
        }
        wrapper.setState({
            edit: true
        });
        wrapper.update();
        const button = form.find('.RegisterButton').last();
        button.simulate('click', event);
        expect(wrapper.state('edit')).toEqual(false);
    });

    // it('on change of date of birth field', () => {
    //     const event = {
    //         preventDefault: () => { },
    //         target: {
    //             name: "dateOfBirth",
    //             value: "1997-12-12",
    //         }
    //     };
    //     const wrapper = shallow(<CustomerProfile />);
    //     const input = wrapper.find('#dob1');

    //     input.simulate('change', event);
    //     expect(input.length).toBe(1);
    //     expect(wrapper.state('dateOfBirth')).toBe("1997-12-12");
    // });

    // it('testing dateValidator() function' , () => {

    //     const event = {
    //         preventDefault: () => { },
    //         target: {
    //             name: "dateOfBirth",
    //             value: "1997-12-12",
    //         }
    //     };
    //     const wrapper = shallow(<CustomerProfile />);
    //     const input = wrapper.find('#dob1');

    //     input.simulate('change', event);
    //     expect(input.length).toBe(1);
    //     expect(wrapper.state('dateOfBirth')).toBe("1997-12-12");

        // const wrapper = shallow(<CustomerProfile />);
        // // wrapper.setState({dateOfBirth : '2017-12-12'});
        // const mockdateValidator = jest.fn(() => true);
        // var dateEntered = '2017-12-12';
        // expect(wrapper.instance().dateValidator()).toBe(true);
        // // expect(mockdateValidator).toHaveBeenCalledTimes(1);
		
   // })


})
