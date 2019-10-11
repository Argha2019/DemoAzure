import React        from 'react';
import PropTypes    from 'prop-types';
import LabeledInput from '../../molecules/labeledInput/labeledInput.jsx';
import SubmitInput from '../../molecules/submitInput/submitInput.jsx';
import './style.css';

const Form = props => (
	
  <form onSubmit={props.onSubmit}>
    {
      props.fields.map((field,i) => (<LabeledInput label={field.label} placeholder={field.placeholder} name={field.name} type={field.type} key={i} />))
    }
    <SubmitInput className="btn btn-primary" text={props.buttonText}>{props.buttonText}</SubmitInput>
  </form>
);

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit:PropTypes.func.isRequired,
};

export default Form;
