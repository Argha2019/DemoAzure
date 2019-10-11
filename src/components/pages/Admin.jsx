import React from 'react';
import AdminTemplate from "../templates/AdminTemplate/Template.jsx";
import AgentListTemplate from "../templates/AgentListTemplate/AgentListTemplate.jsx";
import CustomerListTemplate from "../templates/CustomerListTemplate/CustomerListTemplate.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <AdminTemplate>
                <Tabs className="tabs">
                    <TabList>
                        <Tab>Agent Search</Tab>
                        <Tab>Customer Search</Tab>
                    </TabList>

                    <TabPanel>
                        <AgentListTemplate/>
                    </TabPanel>
                    <TabPanel>
                        <CustomerListTemplate/>
                    </TabPanel>
                </Tabs>
            </AdminTemplate>
        );
    }
}
