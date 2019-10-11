import React      from 'react';
import PropTypes  from 'prop-types';
import Label      from '../../atoms/label/label.jsx';
import Input      from '../../atoms/input/input.jsx';


const SubmitInput = props => (
  <div className="m__labeled_input">
    <Label text={props.label} />
    <Input value="" placeholder={props.placeholder} type="submit" />
  </div>
);

SubmitInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export default SubmitInput;