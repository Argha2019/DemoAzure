import React from 'react';
import CustomerTemplate from "../templates/CustomerTemplate/Template.jsx";
import CustomerProfile from "./CustomerProfile.jsx";

export default class Customer extends React.Component {
    render(){
        return (
            <CustomerTemplate>
                <CustomerProfile />
            </CustomerTemplate>
        );
    }
} 