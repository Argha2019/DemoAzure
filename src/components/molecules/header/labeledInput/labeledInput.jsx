import React      from 'react';
import PropTypes  from 'prop-types';
import Input      from '../../atoms/input/input.jsx';
import {Row} from 'react-bootstrap';

const LabeledInput = props => (
         

<Row>
    <label className="col-sm-2 col-form-label">{props.label}</label>
    <Input value="" placeholder={props.placeholder} type={props.type} name={props.name} required/>
</Row>



);

LabeledInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};

export default LabeledInput;
