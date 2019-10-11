import React from 'react';
import {Button} from 'react-bootstrap';

export default class ButtonGroup extends React.Component {
    render() {
        return (
        <div>
            <Button type='submit'>Option 1</Button>
            <Button type='submit'>Option 2</Button>
            <Button type='submit'>Option 3</Button>
        </div>

        );
    }
}
 
