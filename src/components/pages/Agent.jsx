import React from 'react';
import AgentTemplate from "../templates/AgentTemplate/Template.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AgentListTemplate from "../templates/AgentListTemplate/AgentListTemplate.jsx";
import CustomerListTemplate from "../templates/CustomerListTemplate/CustomerListTemplate.jsx";
import "react-tabs/style/react-tabs.css";

export default class Agent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <AgentTemplate>
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
            </AgentTemplate>
        );
    }
}
