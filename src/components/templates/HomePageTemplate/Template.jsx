import * as React from 'react';
import Card from "./../../atoms/card/card.jsx";
import Header from "./../../molecules/header/HomePage.jsx";
import Footer from "./../../molecules/footer/footer.jsx";

type Props = {
  children: React.Node,
  className: string,
}

const HomePageTemplate = (props: Props): React.Element<*> => (
  <Card className={props.className}>
    <Header>
    </Header>
    {props.children}
    <Footer>
    </Footer>
  </Card>
)

HomePageTemplate.defaultProps = {
  className: '',
}


export default HomePageTemplate