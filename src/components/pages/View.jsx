import React from 'react';
import ViewTemplate from "../templates/ViewTemplate/Template.jsx";
import '../../css/global.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import ViewProfile from "./ViewProfile.jsx";


/**
 * @author Arghadeep Mandal
 * This file is responsible for making the header and footer template for role:"VIEW"
 * which is always rendered in every page. 
 */


export default class View extends React.Component {

    render() {
        return (
            <ViewTemplate>
                <ViewProfile />
            </ViewTemplate>
        );
    }
}
