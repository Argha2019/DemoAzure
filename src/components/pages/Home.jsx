import React from 'react';
import Button from '../atoms/button/button.jsx'
import Form from '../organisms/form/form.jsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Home extends React.Component{
constructor(props){
	super(props)
	this.login=this.login.bind(this);
}
login(){
	this.props.history.push('/createOrder');
}
render(){
	return(
		<div>
		<div align="center">
		<h3>Login</h3>
		 <Form fields={this.props.form} buttonText="Submit"/>
		 <Button onClick={()=>this.login()}>Login</Button>
		 <h4>Don't want to Login?</h4>
		<Link to="/welcome">Continue without logging in</Link>
		</div>

		</div>
		);
}
}
Home.propTypes = {
  form: PropTypes.array,
};

Home.defaultProps = {
  form: [
    {
      name: 'Input1',
      label: 'Name',
      placeholder: 'Enter your name'
    },
    {
      name: 'Input2',
      label: 'Address',
      placeholder: 'Enter your address'
    },
  ],
};


export default Home;
