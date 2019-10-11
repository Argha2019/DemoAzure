import React from "react";
import axios from "axios";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "../../css/global.css";
import AgentTemplate from "../templates/AgentTemplate/Template.jsx";
import Config from "../../config/urls.jsx";

class AdjustInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productid: "",
            storeid: "",
            quantity: "",
            changeInQuantity: "",
            operation: "Increase",
            disabledButton: true,
            length: "111",
            successfulUpdate: false,
            errormessage1: "this is not valid",
            successmessage: " ",
            stateChanged: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.getQuantity = this.getQuantity.bind(this);
        this.modifyQuantity = this.modifyQuantity.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "productid") {
            this.setState({ productid: value });
        } else if (name === "storeid") {
            this.setState({ storeid: value });
        } else if (name === "operation") {
            this.setState({ operation: value });
        } else {
            this.setState({ changeInQuantity: value });
        }
    }
    // fetches the quantity of selected product
    getQuantity(e) {
        e.preventDefault();
        this.setState({ stateChanged: true });
        let url = Config.serverUrl + "/inventory/inventory/checkQuantity";

        axios
            .put(url, {
                productId: this.state.productid,
                storeId: "store1"
            })
            .then(response => {
                this.setState({ quantity: response.data.quantity });
            });
        this.setState({ disabledButton: false });
    }
    // modifies quantity of item in the inventory
    modifyQuantity(e) {
        e.preventDefault();
        let url = Config.serverUrl + "/inventory/inventory/updateQuantity";
        let x = 1;
        if (this.state.operation === "Decrease") {
            x = -1;
        }
        let data = {
            productId: this.state.productid,
            storeId: "store1",
            quantity: this.state.changeInQuantity * x
        };
        axios.put(url, data).then(response => {
            this.setState({ successfulUpdate: response.data });
            if (response.data) {
                let currentquantity = this.state.quantity;
                this.setState({
                    quantity: currentquantity + this.state.changeInQuantity * x
                });
                this.setState({
                    successmessage: "Quantity sucessfully updated"
                });
            }
        });
    }

    render() {
        return (
            <AgentTemplate>
                <h1>Adjust Inventory</h1>
                <div className="container-fluid">
                    <Row>
                        <Col>
                            <div
                                className="adjustInventory2 register-wrap"
                                style={{ height: "450px", width: "80%" }}
                            >
                                <div className="register-html">
                                    <h1 className="fontWhite">
                                        Enter item details
                                    </h1>
                                    <br />
                                    <Form
                                        onSubmit={this.getQuantity}
                                        id="firstform"
                                        className="register-form"
                                    >
                                        <Form.Group
                                            as={Row}
                                            controlId="formHorizontalEmail"
                                        >
                                            <Col lg={4} md={4} sm={4}>
                                                <Form.Label className="Labelling1 label">
                                                    Product ID
                                                </Form.Label>
                                            </Col>
                                            <Col lg={8} md={8} sm={8}>
                                                <Form.Control
                                                    type="text"
                                                    className="productid"
                                                    placeholder="Enter the product ID"
                                                    name="productid"
                                                    value={
                                                        this.state.productid ||
                                                        ""
                                                    }
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group
                                            as={Row}
                                            controlId="exampleForm.ControlSelect1"
                                            id="firstform"
                                        >
                                            <Col lg={4} md={4} sm={4}>
                                                <Form.Label className="Labelling1 label">
                                                    Supply type
                                                </Form.Label>
                                            </Col>
                                            <Col lg={8} md={8} sm={8}>
                                                <Form.Control as="select">
                                                    <option>
                                                        Available to sell
                                                    </option>
                                                    <option>
                                                        Not available to sell
                                                    </option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <div as={Col}>
                                            <Button
                                                type="submit"
                                                className="inventorySubmitButton"
                                                id="checkButton"
                                            >
                                                Search
                                            </Button>
                                        </div>
                                    </Form>
                                    <br />
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div
                                className="adjustInventory2 register-wrap"
                                style={{ height: "450px", width: "80%" }}
                            >
                                <div className="register-html">
                                    <h1 className="fontWhite">Adjustments</h1>
                                    <Form
                                        onSubmit={this.modifyQuantity}
                                        className="secondform register-form"
                                    >
                                        <div className="fontWhite">
                                            Available quantity:{" "}
                                            <span>{this.state.quantity}</span>
                                        </div>
                                        <br />

                                        <Form.Group
                                            as={Row}
                                            controlId="exampleForm.ControlSelect1"
                                        >
                                            <Col lg={5} md={4} sm={4}>
                                                <Form.Label className="Labelling1 label">
                                                    Modify quantity{" "}
                                                </Form.Label>
                                            </Col>
                                            <Col lg={7} md={8} sm={8}>
                                                <Form.Control
                                                    as="select"
                                                    name="operation"
                                                    className="operation"
                                                    value={
                                                        this.state.operation ||
                                                        ""
                                                    }
                                                    onChange={this.handleChange}
                                                    disabled={
                                                        this.state
                                                            .disabledButton
                                                    }
                                                >
                                                    <option>Increase</option>
                                                    <option>Decrease</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group
                                            as={Row}
                                            controlId="formHorizontalQuantity"
                                        >
                                            <Col lg={5} md={4} sm={4}>
                                                <Form.Label className="Labelling1 label">
                                                    Amount
                                                </Form.Label>
                                            </Col>
                                            <Col lg={7} md={8} sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    placeholder=" "
                                                    className="changeInQuantity"
                                                    name="quantity"
                                                    value={
                                                        this.state
                                                            .changeInQuantity ||
                                                        ""
                                                    }
                                                    onChange={this.handleChange}
                                                    disabled={
                                                        this.state
                                                            .disabledButton
                                                    }
                                                    required
                                                    min="0"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <div as={Row}>
                                            <Button
                                                type="submit"
                                                className="inventorySubmitButton"
                                                disabled={
                                                    this.state.disabledButton
                                                }
                                            >
                                                Adjust
                                            </Button>
                                        </div>
                                        <span className="successMessage">
                                            {this.state.successmessage}
                                        </span>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </AgentTemplate>
        );
    }
}

export default AdjustInventory;
