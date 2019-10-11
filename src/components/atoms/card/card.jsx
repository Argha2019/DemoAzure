import * as React from 'react'
type Props = {
 children: React.Node,
 className: string,
}
const Card = (props: Props): React.Element<*> => (
 <div className={props.className}>{props.children}</div>
)
Card.defaultProps = {
 className: '',
 children: '',
}
export default Card