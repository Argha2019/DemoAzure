import React from 'react';
import PropTypes  from 'prop-types';
import '../../../css/global.css';

const Input = props => (
	<div className="col-sm-10">
  		<input type={props.type} placeholder={props.placeholder} value={props.text} name={props.name} className="formbox" required />
  	</div>
);

Input.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name:PropTypes.string,
  onSubmit:()=>{}
 
};

export default Input;