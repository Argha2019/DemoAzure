import React from 'react';
import '../../../css/global.css';

type Props = {
    children: React.Node,
    className: string,
}
const Footer = (props: Props): React.Element<*> => (
    <div className="footer">
    <div>
        <a href="https://www.publicissapient.com/">Publicis Sapient</a>
        <span>&copy; 2019 Publicis Sapient. All rights reserved.</span>
    </div>
    <div className="ml-auto">
        <span>Powered by </span>
        <a href="https://www.publicissapient.com/">Publicis Groupe</a>
    </div>
    </div>
)
Footer.defaultProps = {
    className: '',
}

export default Footer;
