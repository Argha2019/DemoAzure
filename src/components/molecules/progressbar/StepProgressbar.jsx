import React from "react";
import "react-step-progress-bar/styles.css";
import PropTypes  from 'prop-types';
import {ProgressBar, Step} from "react-step-progress-bar";

const StepProgressbar = props => (
  <ProgressBar percent={props.percent} filledBackground={props.filledBackground} steps={3} width="40%">
 
        <Step transition="scale" index="Abc">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="50"
              src={require('../../../img/green_tick.jpg')}
              alt="Adding Products to Cart"
            />
          )}
         
        </Step>     
        <Step transition="scale" index="Abc">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="50"
              src={require('../../../img/green_tick.jpg')}
              alt="Adding Shipping Address Details"
              />
          )}
        </Step>
        <Step transition="scale" index="Abc">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="50"
              src={require('../../../img/green_tick.jpg')}
              alt="Order Placed"
            />
          )}
        </Step>

     </ProgressBar>

);

StepProgressbar.propTypes = {
  percent: PropTypes.number,
  filledBackground: PropTypes.string,
};

export default StepProgressbar;