import React from "react";
import ReactDOM from "react-dom";
import Registration from "./Registration.jsx";
import OMSForm from './OmsForm.jsx';
import Agent from './Agent.jsx';
import Admin from './Admin.jsx';
import View from  './View.jsx'
import Customer from './Customer.jsx';
import CreateOrder from './CreateOrder.jsx';
import CreateOrderCustomer from './CreateOrderCustomer.jsx';
import AdjustInventory from './AdjustInventory.jsx'
import MyOrders from './MyOrders.jsx';
import AdminProfile from './AdminProfile.jsx';
import AgentProfile from './AgentProfile.jsx';
import CustomerProfile from './CustomerProfile.jsx';
import ViewProfile from "./ViewProfile.jsx";
import { HashRouter, Switch, Route } from 'react-router-dom';
import ViewOrder from './ViewOrder.jsx';
import CustomerViewOrder from './CustomerViewOrder.jsx';
import ChangePassword from "./ChangePassword.jsx";
import AgentListTemplate from "../templates/AgentListTemplate/AgentListTemplate.jsx";
import AgentDetailsPage from "../templates/AgentListTemplate/AgentDetailsTemplate.jsx";


ReactDOM.render((
    <HashRouter>        
      <Switch>
		<Route exact path='/' component={OMSForm} />
		<Route exact path='/register' component={Registration} />
		<Route exact path='/loginAdmin' component={Admin} />
		<Route exact path='/loginAgent' component={Agent} />
		<Route exact path='/loginView' component={View}/>
		<Route exact path='/loginCustomer' component={Customer} />
		<Route exact path='/createOrder' component={CreateOrder} />
		<Route exact path='/createOrderCustomer' component={CreateOrderCustomer} />
        <Route exact path='/adjustInventory' component={AdjustInventory} />
        <Route exact path='/viewOrder' component={MyOrders} />
        <Route exact path='/viewOrders' component={ViewOrder} />
        <Route exact path='/viewOrderCustomer' component={CustomerViewOrder} />
        <Route exact path='/adminProfile' component={AdminProfile} />
        <Route exact path='/agentProfile' component={AgentProfile} />
        <Route exact path='/viewProfile' component={ViewProfile}/>
		<Route exact path="/changePassword" component={ChangePassword} />
		<Route exact path='/customerProfile' component={CustomerProfile} />
		<Route exact path="/agentDetailsPage" component={AgentDetailsPage}/>
		<Route exact path="/agentListTemplate" component={AgentListTemplate}/>
      </Switch>
    </HashRouter>
    ), document.getElementById('root'));
