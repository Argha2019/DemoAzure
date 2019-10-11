import React      from 'react';
import PropTypes  from 'prop-types';


const Label = props => (
  <span>{props.text}</span>

);

Label.propTypes = {
  text: PropTypes.string,
};

export default Label