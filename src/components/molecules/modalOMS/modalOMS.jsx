import React from "react";
import {Modal,Button} from 'react-bootstrap';
import PropTypes  from 'prop-types';

const ModalOMS = props => (

<div className={props.className}>
<Modal size={props.size} show={true} backdrop={false} onHide={props.onHide}>
<Modal.Header closeButton>
    <Modal.Title>{props.modalTitle}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {props.children}
  </Modal.Body>

  <Modal.Footer>
  	<Button variant="primary" onClick={props.onClick} disabled={props.isDisable}>{props.buttonName}</Button>
  </Modal.Footer>
</Modal>
</div>
)

ModalOMS.propTypes={
isDisable: PropTypes.bool,
onHide:PropTypes.func.isRequired,
onClick:PropTypes.func.isRequired,
idCloseButton:PropTypes.string,
id:PropTypes.string,
size:PropTypes.string,
className:PropTypes.string,
buttonName:PropTypes.string.isRequired,
modalTitle:PropTypes.string.isRequired
}
export default ModalOMS;