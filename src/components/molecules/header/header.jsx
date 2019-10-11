import * as React from 'react';
import Card from "./../../atoms/card/card.jsx";

type Props = {
    children: React.Node,
    className: string,
  }
  
   const Header = (props: Props): React.Element<*> => (
        <Card className={props.className}>
             {props.children}
        </Card>        
   )
  
  Header.defaultProps = {
    className: '',
  }
  
  export default Header
  
