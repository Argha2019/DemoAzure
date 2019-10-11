import React from 'react';
import axios from 'axios';
import HomePageTemplate from "../templates/HomePageTemplate/Template.jsx";
import { Button, Form, Col, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import '../../css/loginCSS.css';
import { encryptByAES, decryptByAES } from './Encryption.jsx';
import Config from "../../config/urls.jsx";


const usernameRegex = RegExp(/^\w*$/);
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40}$/);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
}
export default class OMSForm extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: '',
      password: '',
      validCredential: '',
      formErrors: {
        username: '',
        password: ''
      }
    };
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "username":
        formErrors.username =
          !(usernameRegex.test(value)) ? "Only Alphanumeric" : "";
        break;
      case "password":
        formErrors.password =
          !(passwordRegex.test(value)) ? "Please enter valid password" : "";
        break;
      default:
        break;
    }
    this.setState({ validCredential: "" });
    this.setState({ formErrors, [name]: value });
  }

  login(e) {
    e.preventDefault();
    if (formValid(this.state)) {
      let username = encryptByAES(this.state['username']);
      let password = encryptByAES(this.state['password']);
      const formData = {
        "username": username,
        "password": password
      };

	  var url = Config.serverUrl + '/signin/login';
	  axios.post(url , formData)
       .then(res => {

          if (res !== "") {
            if (res.data[0].roles === "ADMIN") {
              res.data[0].accessToken = decryptByAES(res.data[0].accessToken)
              res.data[0].username = decryptByAES(res.data[0].username)
              res.data[0].phone = decryptByAES(res.data[0].phone)
              res.data[0].mail = decryptByAES(res.data[0].mail)
              res.data[0].id = decryptByAES(res.data[0].id)
              Cookies.set('adminData', encryptByAES(JSON.stringify(res.data)));
              this.props.history.push({ pathname: '/loginAdmin' });
            }

            else if (res.data[0].roles === "AGENT ACCESS") {
              res.data[0].accessToken = decryptByAES(res.data[0].accessToken)
              res.data[0].username = decryptByAES(res.data[0].username)
              res.data[0].phone = decryptByAES(res.data[0].phone)
              res.data[0].mail = decryptByAES(res.data[0].mail)
              res.data[0].id = decryptByAES(res.data[0].id)
              Cookies.set('agentData', encryptByAES(JSON.stringify(res.data)));
              this.props.history.push({ pathname: '/loginAgent' });
            }
            else if (res.data[0].roles === "AGENT VIEW") {
              res.data[0].accessToken = decryptByAES(res.data[0].accessToken)
              res.data[0].username = decryptByAES(res.data[0].username)
              res.data[0].phone = decryptByAES(res.data[0].phone)
              res.data[0].mail = decryptByAES(res.data[0].mail)
              res.data[0].id = decryptByAES(res.data[0].id)
              Cookies.set('viewData', encryptByAES(JSON.stringify(res.data)));
              this.props.history.push({ pathname: '/loginView' });
            }
            else if (res.data[0].roles === "CUSTOMER") {
              res.data[0].accessToken = decryptByAES(res.data[0].accessToken)
              res.data[0].username = decryptByAES(res.data[0].username)
              res.data[0].phone = decryptByAES(res.data[0].phone)
              res.data[0].mail = decryptByAES(res.data[0].mail)
              res.data[0].id = decryptByAES(res.data[0].id)
              Cookies.set('customerData', encryptByAES(JSON.stringify(res.data)));
              this.props.history.push({ pathname: '/loginCustomer' });
            }
            this.setState({ validCredential: "" });
          }
        })
        .catch(err => {
          this.setState({ validCredential: "Please enter Valid Credentials" });
        });
    }
    else {
      this.setState({ validCredential: "Please enter valid Credentials" });
    }
    // this.history.push("/createOrder")
  }
  register() {

    this.props.history.push('/register');
  }
  render() {
    const { formErrors } = this.state;
    return (
      <HomePageTemplate>

<div><img className="loginImage" src="https://psi-oms-product-image-repo.s3.us-east-2.amazonaws.com/omslogin.png" width="70%" height="800px" alt="e-commerce image"/>
        <div align="center" className="login-wrap">
        
          <div className="login-html">
          <h1 className="fontWhite">Login</h1>
          {this.state.validCredential.length > 0 && (
            <span className="errorMessage">{this.state.validCredential}</span>
          )}
          <Form className="login-form MyForm" onSubmit={this.login}>
            <Form.Group as={Row} controlId="username">
             
                <Form.Label className="label Labelling">Username</Form.Label>
              
                <Form.Control className="input" name="username" type="text" placeholder="Username" ref="username" onChange={this.handleChange} required />
              
            </Form.Group>
            {formErrors.username.length > 0 && (
              <span className="errorMessage">{formErrors.username}</span>
            )}
            <Form.Group as={Row} controlId="password">
              
                <Form.Label className="label Labelling">Password</Form.Label>
              
                <Form.Control className="input" name="password" type="password" placeholder="password" ref="password" onChange={this.handleChange} required />
              
            </Form.Group>
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
            <br></br>
            <Button className="button" variant="primary" type="submit">Sign In</Button>
          </Form>
          <p className="fontWhite">New User? </p>
          <Button className="registerButton" variant="primary" onClick={this.register}>Register</Button>
        </div>
        </div>
        </div>
      </HomePageTemplate>
    );
  }
}
