import * as React from 'react';
import Card from "./../../atoms/card/card.jsx";
import Header from "./../../molecules/header/header.jsx";
import Footer from "./../../molecules/footer/footer.jsx";

type Props = {
  children: React.Node,
  className: string,
}

const DemoTemplate = (props: Props): React.Element<*> => (
  <Card className={props.className}>
    <Header>
        <br />
        THIS IS HEADER WHERE NAVBAR WOULD COME
       <br />
        <br />
        <hr />
    </Header>
    {props.children}
    <Footer className="fixed-bottom">
        <hr />
        <br />
        THIS IS Footer
       <br />
        <br />
    </Footer>
  </Card>
)

DemoTemplate.defaultProps = {
  className: '',
}


export default DemoTemplate