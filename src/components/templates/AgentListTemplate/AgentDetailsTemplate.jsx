import React from 'react';
import Cookies from 'js-cookie';
import AdminTemplate from "../AdminTemplate/Template.jsx";
import AgentTemplate from "../AgentTemplate/Template.jsx";
import { Row, Col, Form, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { decryptByAES, encryptByAES } from '../../pages/Encryption.jsx';
import Switch from 'react-switch';
import axios from 'axios';

const alphabetRegex = RegExp(/^[a-zA-Z]*$/);
const mailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_/'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const usernameRegex = RegExp(/^\w*$/);
const passwordRegex = RegExp(/^[a-zA-Z0-9!@#$%^&.*]*$/);
import Config from "../../../config/urls.jsx";



let toggle = true;

let profileData= {};
export default class AgentDetailsTemplate extends React.Component {
    constructor(props) {
        super(props);
		this.state = {readOnly: true};
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
        this.cancelProfile = this.cancelProfile.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleChangeToggle=this.handleChangeToggle.bind(this);
        try {
            profileData = JSON.parse(decryptByAES(Cookies.get('adp')));
        }
        catch (e) {
            profileData = {
                firstName: '',
                lastName: '',
                username: '',
                role: '',
                phone: '',
                mail: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                country: '',
                pincode: '',
                dob: ''
            };
        }
        this.state = {
            validUpdate : '',
			invalidUpdate : '',
            lastName: profileData.lastName,
            firstName: profileData.firstName,
            dob: profileData.dob,
            phone: profileData.phone,
            mail: profileData.mail,
            addressLine1: profileData.addressLine1,
            addressLine2: profileData.addressLine2,
            state: profileData.state,
            country: profileData.country,
            pincode: profileData.pinCode,
            role: profileData.roles,
            username: profileData.username,
            status: profileData.status,
            edit: false,
            submit: false,
            formErrors: {
                firstName: '',
                lastName: '',
                username: '',
                role: '',
                phone: '',
                mail: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                country: '',
                pincode: '',
                dob: ''
            }
        };
    }

// error checks
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    !(alphabetRegex.test(value)) ? "Name should contain only alphabets" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    !(alphabetRegex.test(value)) ? "Name should contain only alphabets" : "";
                break;
            case "phone":
                formErrors.phone =
                    (value.length == 10) ? "" : "Number of digit must be 10";
                break;
            case "mail":
                formErrors.mail =
                    !(mailRegex.test(value)) ? "Enter valid mail" : "";
                break;
            case "addressLine1":
                formErrors.addressLine1 =
                    (value.length > 50) ? "More than 50 characters" : "";
                break;
            case "addressLine2":
                formErrors.addressLine2 =
                    (value.length > 50) ? "More than 50 characters" : "";
                break;
            case "state":
                formErrors.state =
                    !(alphabetRegex.test(value)) ? "Only Alphabets allowed" : "";
                break;
            case "country":
                formErrors.country =
                    !(alphabetRegex.test(value)) ? "Only Alphabets allowed" : "";
                break;
            case "pincode":
                formErrors.pincode =
                    (value.length === 6) ? "" : "Number of digit must be 6";
                break;
            default:
              break;
        }
        this.setState({ validUpdate: '' });
		this.setState({ invalidUpdate: '' });
        this.setState({ formErrors, [name]: value });
    }

// on clicking Edit button
    editProfile(e) {
        e.preventDefault();
        this.setState({
            edit: !this.state.edit
        })
		this.setState(prevState => ({readOnly: !prevState.readOnly}))

    }

// on clicking Cancel Button
    cancelProfile(e) {
        e.preventDefault();
        this.setState({
            edit: !this.state.edit
        })
		this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }

// on clicking submit button
    submitProfile(e) {
        e.preventDefault();
        const user = {
             "id": encryptByAES(profileData.id),
            "firstName": this.state['firstName'],
            "lastName": this.state['lastName'],
            "mail": encryptByAES(this.state['mail']),
            "username": encryptByAES(this.state['username']),
            "roles": this.state['role'],
            "phone": encryptByAES(this.state['phone']),
            "addressLine1": this.state['addressLine1'],
            "addressLine2": this.state['addressLine2'],
            "state": this.state['state'],
            "password": encryptByAES("Welcome@123"),
            "country": this.state['country'],
            "pinCode": this.state['pincode'],
            "dob": this.state['dob'],
            "status": this.state['status']
        }
		var url = Config.serverUrl + '/signup/update';
        axios.put(url , user)
            // .then(
            //     response => {
            //         this.setState({ user: response.data });
            //         this.setState({ submit: true });

            //     },
            // )

            .then(res => {

                if (res['data'] == true) {
                    this.setState({ validUpdate: "Succesfully Updated." });
                    this.props.history.push({pathname: '/agentDetailsPage'});
					window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                }
                else {
                    this.setState({ validUpdate: "Sorry, couldn't update data." });
                    this.props.history.push({pathname: '/agentDetailsPage'});
					window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                }
                this.setState({ invalidRegistration: "" });
            })

        this.setState({
            edit: !this.state.edit
        })
		this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }

// drop down menu for roles
    handleDropDown(e)
	{
		let role = e.target.value;
		this.setState({role: role});
    }


// switch toggle button functionality
    handleChangeToggle(e)
    {   
        let togglelocal="false";
        if(e)
        {
            
            togglelocal="true";

        }
        this.setState({status: togglelocal});
    }
    
    render() {
        const { formErrors } = this.state;
        let strData = ["AGENT VIEW", "AGENT ACCESS"];
        let optionList = [];
        optionList.push(<option value={strData[0]}>{strData[0]}</option>)
        optionList.push(<option value={strData[1]}>{strData[1]}</option>)
        if(profileData.status == "true")
            toggle = true;
        else if(profileData.status == "false")
            toggle = false;
        
		if(Cookies.get('adminData'))
		{
					return (
					<AdminTemplate>
                    
						<div className="register-wrap" >
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h1 className="fontWhite">Agent Details Page</h1>
                        <div className="Oms register-html">
						{this.state.validUpdate.length > 0 && (
							 <span className="successMessage">{this.state.validUpdate}</span>
							 )}
							 <br/><br/>
							<Form className="MyForm1 register-form" id="MyForm1">
								<Form.Group as={Row} controlId="Status">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label" for="status">Status</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Switch onChange={this.handleChangeToggle} checked={toggle} checkedIcon={false} uncheckedIcon={false} disabled={!this.state.readOnly} />

									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="Username">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">UserName</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control name="username" id="username1" type="text" defaultValue={this.state.username} ref="username" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="role">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Role</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control name="role" id="role1" as="select" defaultValue={this.state.role} ref="role" readOnly={!this.state.readOnly} disabled={!this.state.readOnly} onChange={this.handleDropDown} required >
                                            {optionList}
                                        </Form.Control>
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="firstName">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">First Name</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="firstName" id="firstName1" name="firstName" type="text" defaultValue={this.state.firstName} ref="firstName" readOnly={!this.state.readOnly} onChange={this.handleChange}  required />
										{formErrors.firstName.length > 0 && (
											<span className="errorMessage">{formErrors.firstName}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="lastName">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Last Name</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="lastName" id="lastName1" name="lastName" type="text" defaultValue={this.state.lastName} ref="lastName" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.lastName.length > 0 && (
											<span className="errorMessage">{formErrors.lastName}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="dob">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Date of Birth</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control name="dob" id="dob1" type="text" defaultValue={this.state.dob} ref="dob" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.dob.length > 0 && (
											<span className="errorMessage">{formErrors.dob}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="phone">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Phone</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="phone" id="phone1" name="phone" type="number" defaultValue={this.state.phone} ref="phone" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.phone.length > 0 && (
											<span className="errorMessage">{formErrors.phone}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="mail">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Mail ID</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="mail" id="mail1" name="mail" type="email" defaultValue={this.state.mail} ref="mail" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.mail.length > 0 && (
											<span className="errorMessage">{formErrors.mail}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="addressLine1">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Address Line 1</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="addressLine1" id="addressLine11" name="addressLine1" type="text" defaultValue={this.state.addressLine1} ref="addressLine1" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.addressLine1.length > 0 && (
											<span className="errorMessage">{formErrors.addressLine1}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="addressLine2">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Address Line 2</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="addressLine2" id="addressLine21" name="addressLine2" type="text" defaultValue={this.state.addressLine2} ref="addressLine2" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.addressLine2.length > 0 && (
											<span className="errorMessage">{formErrors.addressLine2}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="state">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">State</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="state" id="state1" name="state" type="text" defaultValue={this.state.state} ref="state" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.state.length > 0 && (
											<span className="errorMessage">{formErrors.state}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="country">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Country</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="country" id="country1" name="country" type="text" defaultValue={this.state.country} ref="country" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.country.length > 0 && (
											<span className="errorMessage">{formErrors.country}</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="pincode">
									<Col sm={4} md={3} className="alignLabel">
										<Form.Label className="Labelling label">Pincode</Form.Label>
									</Col>
									<Col sm={8} md={9}>
										<Form.Control className="pincode" id="pincode1" name="pincode" type="number" defaultValue={this.state.pincode} ref="pincode" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
										{formErrors.pincode.length > 0 && (
											<span className="errorMessage">{formErrors.pincode}</span>
										)}
									</Col>
								</Form.Group>
							
								{this.state.edit == false && (
									<div className="editButtonDiv">
										<Button className="RegisterButton" id="edit1" variant="primary" type="submit" onClick={this.editProfile}>Edit</Button>
									</div>

								)}

								{this.state.edit == true && (
								<div className="editProfileDiv">
									<Button className="RegisterButton" id="submit1" variant="primary" type="submit" onClick={this.submitProfile}>Submit</Button>
									<span></span>

									<Button className="RegisterButton" id="cancel1" variant="primary" type="submit" onClick={this.cancelProfile}>Cancel</Button>
								</div>
								)}						
								</Form>
                            </div>
						</div>
					</AdminTemplate>
				);
		}
		
		else
		{
				return (
					<AgentTemplate>
                    <div className="register-wrap">
                    <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h1 className="fontWhite">Agent Details Page</h1>
                        <div className="Oms register-html">
                    {this.state.validUpdate.length > 0 && (
                         <span className="successMessage">{this.state.validUpdate}</span>
                         )}

                        <Form className="MyForm2 register-form">
                            <Form.Group as={Row} controlId="Status">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label" for="status">Status</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Switch id="status" checked={toggle} checkedIcon={false} uncheckedIcon={false} disabled />

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="Username">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">UserName</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control name="username" type="text" defaultValue={this.state.username} ref="username" readOnly required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="role">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Role</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control name="role" type="text" defaultValue={this.state.role} ref="role" readOnly required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="firstName">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">First Name</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="firstName" name="firstName" type="text" defaultValue={this.state.firstName} ref="firstName" readOnly required />
                                    {formErrors.firstName.length > 0 && (
                                        <span className="errorMessage">{formErrors.firstName}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="lastName">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Last Name</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="lastName" name="lastName" type="text" defaultValue={this.state.lastName} ref="lastName" readOnly required />
                                    {formErrors.lastName.length > 0 && (
                                        <span className="errorMessage">{formErrors.lastName}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="dob">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Date of Birth</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control name="dob" type="text" defaultValue={this.state.dob} ref="dob" readOnly required />
                                    {formErrors.dob.length > 0 && (
                                        <span className="errorMessage">{formErrors.dob}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="phone">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Phone</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="phone" name="phone" type="number" defaultValue={this.state.phone} ref="phone" readOnly required />
                                    {formErrors.phone.length > 0 && (
                                        <span className="errorMessage">{formErrors.phone}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="mail">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Mail ID</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="mail" name="mail" type="email" defaultValue={this.state.mail} ref="mail" readOnly required />
                                    {formErrors.mail.length > 0 && (
                                        <span className="errorMessage">{formErrors.mail}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="addressLine1">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Address Line 1</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="addressLine1" name="addressLine1" type="text" defaultValue={this.state.addressLine1} ref="addressLine1" readOnly required />
                                    {formErrors.addressLine1.length > 0 && (
                                        <span className="errorMessage">{formErrors.addressLine1}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="addressLine2">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Address Line 2</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="addressLine2" name="addressLine2" type="text" defaultValue={this.state.addressLine2} ref="addressLine2" readOnly required />
                                    {formErrors.addressLine2.length > 0 && (
                                        <span className="errorMessage">{formErrors.addressLine2}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="state">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">State</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="state" name="state" type="text" defaultValue={this.state.state} ref="state" readOnly required />
                                    {formErrors.state.length > 0 && (
                                        <span className="errorMessage">{formErrors.state}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="country">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Country</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="country" name="country" type="text" defaultValue={this.state.country} ref="country" readOnly required />
                                    {formErrors.country.length > 0 && (
                                        <span className="errorMessage">{formErrors.country}</span>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="pincode">
                                <Col sm={4} md={3} className="alignLabel">
                                    <Form.Label className="Labelling label">Pincode</Form.Label>
                                </Col>
                                <Col sm={8} md={9}>
                                    <Form.Control className="pincode" name="pincode" type="number" defaultValue={this.state.pincode} ref="pincode" readOnly required />
                                    {formErrors.pincode.length > 0 && (
                                        <span className="errorMessage">{formErrors.pincode}</span>
                                    )}
                                </Col>
                            </Form.Group>						
							</Form>
                            </div>
						</div>
					</AgentTemplate>
				);
		}
	}
}
