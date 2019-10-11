import * as React from "react";
import '../../../css/registerCSS.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { encryptByAES, decryptByAES } from '../../pages/Encryption.jsx';
import Cookies from 'js-cookie';
import Config from "../../../config/urls.jsx";



const alphabetRegex = RegExp(/^[A-Za-z]{1,20}$/);
const placeRegex = RegExp(/^[a-zA-Z ]{1,49}$/);
const mailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_/'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const usernameRegex = RegExp(/^[a-zA-Z0-9]{3,20}$/);
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40}$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

export default class RegistrationTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.onfocus = this.onfocus.bind(this);
        this.dateValidator = this.dateValidator.bind(this);
        this.state = {
            validRegistration: '',
            invalidRegistration: '',
            loginPage: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phone: '',
            mail: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            country: '',
            pincode: '',
            username: '',
            password: '',
            role: '',
            formErrors: {
                firstName: '',
                lastName: '',
                nameLength: '',
                phone: '',
                dateOfBirth: '',
                mail: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                country: '',
                pincode: '',
                username: '',
                password: '',
                role: ''
            }
        };
    }
    dateValidator(){
        var date = new Date();
        date.setDate(date.getDate() - 1);
        var dateEntered = new Date(document.getElementById('dob1').value);
        if (date.getFullYear() - dateEntered.getFullYear()< 18) {
            return true;
        }

        if (date.getFullYear() - dateEntered.getFullYear()== 18) {

            //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
            if (dateEntered.getMonth() > date.getMonth()) {
                return true;
            }
            if (dateEntered.getMonth() == date.getMonth()) {
                //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                if (dateEntered.getDate() > date.getDate()) {
                    return true;
                }
            }
        }
    }
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    !(alphabetRegex.test(value)) ? "Name should contain only alphabets and character limit is (2-20) characters" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    !(alphabetRegex.test(value)) ? "Name should contain only alphabets and character limit is (2-20) characters" : "";
                break;
            case "dateOfBirth":
                formErrors.dateOfBirth =
                    (this.dateValidator()) ? "Current or future date is not allowed. The user must be 18 years old." : "" ;
                break;
            case "phone":
                formErrors.phone =
                    (value.length == 10) ? "" : "Number of digits must be 10";
                break;
            case "mail":
                formErrors.mail =
                    !(mailRegex.test(value)) ? "Enter valid mail" : "";
                break;
            case "addressLine1":
                formErrors.addressLine1 =
                    (value.length > 50) ? "Exceeded the characters limit of 50" : "";
                break;
            case "addressLine2":
                formErrors.addressLine2 =
                    (value.length > 50) ? "Exceeded the characters limit of 50" : "";
                break;
            case "state":
                formErrors.state =
                    !(placeRegex.test(value)) ? "Only alphabets allowed and character limit is 50" : "";
                break;
            case "country":
                formErrors.country =
                    !(placeRegex.test(value)) ? "Only alphabets allowed and character limit is 50" : "";
                break;
            case "pincode":
                formErrors.pincode =
                    (value.length === 6) ? "" : "Number of digit must be 6";
                break;
            case "username":
                formErrors.username =
                    !(usernameRegex.test(value)) ? "Only Alphanumeric allowed and character limit is (3-20) characters." : "";
                break;
            case "password":
                formErrors.password =
                    !(passwordRegex.test(value)) ? "Password must have 8 or more characters long and must have at least a uppercase letter, lowercase letter, number and special character" : "";
                break;
            default:
                break;
        }
        this.setState({ invalidRegistration: '' });
        this.setState({ validRegistration: '' });
        this.setState({ loginPage: '' });
        this.setState({ formErrors, [name]: value });
    }

    handleDropDown(e) {
        let role = e.target.value;
        this.setState({ role: role });
    }

    handleRegister(e) {
        e.preventDefault();
        if (formValid(this.state) && this.state['role']!='') {
            let firstname = this.state['firstName'];
            let lastname = this.state['lastName'];
            let dob = this.state['dateOfBirth'];
            let phone = encryptByAES(this.state['phone']);
            let mail = encryptByAES(this.state['mail']);
            let add1 = this.state['addressLine1'];
            let add2 = this.state['addressLine2'];
            let state = this.state['state'];
            let country = this.state['country'];
            let pincode = this.state['pincode'];
            let username = encryptByAES(this.state['username']);
            let password = encryptByAES(this.state['password']);
            let role = this.state['role'];
            let status = true;
            const formData = {
                "firstName": firstname,
                "lastName": lastname,
                "dob": dob,
                "phone": phone,
                "mail": mail,
                "addressLine1": add1,
                "addressLine2": add2,
                "state": state,
                "country": country,
                "pinCode": pincode,
                "username": username,
                "password": password,
                "roles": role,
                "status": status
            };

			var url = Config.serverUrl + '/signup/register';
            axios.post(url , formData)
                .then(res => {

                    if (res['data'] === true) {
                        if (Cookies.get('adminData') || Cookies.get('agentData')) {
                            this.setState({ validRegistration: "You have successfully registered the user." });
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                        }
                        else{
                            this.setState({ validRegistration: "You have successfully registered." });
                            this.setState({ loginPage: " Login Here" });
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                        }
                    }

                    else {
                        if(Cookies.get('adminData') || Cookies.get('agentData')) {
                            this.setState({ validRegistration: "This user is already registered." });
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                        }
                        else{
                            this.setState({ validRegistration: "This user is already registered." });
                            this.setState({ loginPage: " Login Here" });
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                        }

                    }
                    this.setState({ invalidRegistration: "" });
                })

        }
        else {
            this.setState({ invalidRegistration: "Please fill all fields correctly" });
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
        }
       
    }

    onfocus(e) {
        e.preventDefault();
        e.target.type = "date";
    }

    render() {
        const { formErrors } = this.state;

        let strData = ["ADMIN", "AGENT VIEW", "AGENT ACCESS", "CUSTOMER"];

        let optionList = [];
        optionList.push(<option hidden selected disabled>role</option>);
        if (this.props.isAdmin) {
            for (let i = 0; i < 4; i++) {
                optionList.push(<option value={strData[i]}>{strData[i]}</option>);
            }
        } else {
            optionList.push(<option value={strData[3]}>{strData[3]}</option>);
        }

        return (
            <div>
            <div className="register-class-final">
			<br/> 
                <h1 className="registerHeading fontWhite">Register</h1>
                <div> 
                <div className="Oms register-html">
                    {this.state.invalidRegistration.length > 0 && (
                        <span className="errorMessage">{this.state.invalidRegistration}</span>
                    )}

                    {this.state.validRegistration.length > 0 && (
                        <span className="successMessage">{this.state.validRegistration}<a href="#/">{this.state.loginPage}</a></span>
                    )}
					<br/>

                    <Form className="register-form MyForm" onSubmit={this.handleRegister}>
                    <Row className="form-row" >
                        <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="firstName" className="label">
                                    First Name
                                </label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="firstName" name="firstName" type="firstName" placeholder="first name" ref="firstName" onChange={this.handleChange} required />
                                    {formErrors.firstName.length > 0 && (
                                        <span className="errorMessage">{formErrors.firstName}</span>
                                    )}

                                </div>
                            </Row>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="lastName" className="label">
                                    Last Name
								</label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="lastName" name="lastName" type="lastName" placeholder="last name" ref="lastName" onChange={this.handleChange} required />
                                    {formErrors.lastName.length > 0 && (
                                        <span className="errorMessage">{formErrors.lastName}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row className="form-row" >
                        <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="dob1" className="label">
                                    DOB
								</label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="dob1" name="dateOfBirth" type="text" onFocus={this.onfocus} placeholder="date of birth" ref="dateOfBirth" onChange={this.handleChange} required />
                                    {formErrors.dateOfBirth.length > 0 && (
                                        <span className="errorMessage">{formErrors.dateOfBirth}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="phone" className="label">
                                    Phone
								</label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="phone" name="phone" type="number" placeholder="phone number" ref="phone" onChange={this.handleChange} required />
                                    {formErrors.phone.length > 0 && (
                                        <span className="errorMessage">{formErrors.phone}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>
                        </Col>
                        </Row>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="mail" className="label">
                                    Mail
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="mail" name="mail" type="email" placeholder="mail id" ref="mail" onChange={this.handleChange} required />

                                    {formErrors.mail.length > 0 && (
                                        <span className="errorMessage">{formErrors.mail}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="addressLine1" className="label">
                                    Address Line 1
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="addressLine1" name="addressLine1" type="text" placeholder="house number and street name" ref="addressLine1" onChange={this.handleChange} required />

                                    {formErrors.addressLine1.length > 0 && (
                                        <span className="errorMessage">{formErrors.addressLine1}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="addressLine2" className="label">
                                    Address Line 2
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="addressLine2" name="addressLine2" type="text" placeholder="city" ref="addressLine2" onChange={this.handleChange} required />

                                    {formErrors.addressLine2.length > 0 && (
                                        <span className="errorMessage">{formErrors.addressLine2}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="state" className="label">
                                    State
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="state" name="state" type="text" placeholder="state" ref="state" onChange={this.handleChange} required />

                                    {formErrors.state.length > 0 && (
                                        <span className="errorMessage">{formErrors.state}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Row className="form-row" >
                        <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="country" className="label">
                                    Country
								</label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="country" name="country" type="text" placeholder="country" ref="country" onChange={this.handleChange} required />
                                    {formErrors.country.length > 0 && (
                                        <span className="errorMessage">{formErrors.country}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="pincode1" className="label">
                                    Pincode
								</label>
                                <div className="col-sm-10">
                                    <Form.Control className="input" id="pincode1" name="pincode" type="number" placeholder="pincode" ref="pincode" onChange={this.handleChange} required />
                                    {formErrors.pincode.length > 0 && (
                                        <span className="errorMessage">{formErrors.pincode}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>
                        </Col>
                        </Row>
                        <Form.Group >
                            <Row className="form-row" >
                                <label for="username" className="label">
                                    Username
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="username" name="username" type="text" placeholder="username" ref="username" onChange={this.handleChange} required />

                                    {formErrors.username.length > 0 && (
                                        <span className="errorMessage">{formErrors.username}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="password" className="label">
                                    Password
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="password"  name="password" type="password" placeholder="password" ref="password" onChange={this.handleChange} required />
                                    {formErrors.password.length > 0 && (
                                        <span className="errorMessage">{formErrors.password}</span>
                                    )}
                                </div>
                            </Row>
                        </Form.Group>

                        <Form.Group >
                            <Row className="form-row" >
                                <label for="role" className="label">
                                    Role
								</label>
                                <div className="col-sm-11">
                                    <Form.Control className="input" id="role" name="role" as="select" onChange={this.handleDropDown} >
                                        {optionList}
                                    </Form.Control>
                                </div>
                            </Row>
                        </Form.Group>

                        <Button className="registerPageButton RegisterButton" variant="primary" type="submit">Submit</Button>
                    </Form>

                    </div>
                </div>
            </div>
            </div>
        );
    }
}
