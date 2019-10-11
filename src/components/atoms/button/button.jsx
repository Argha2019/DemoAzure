import * as React from 'react'
export const ButtonType = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit'
}

export const ButtonTheme = {
  DEFAULT: 'default',
  ROUNDED: 'rounded'
}

export const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

type Props = {
  type: string,
  onClick: Function,
  children: React.Node,
  disabled: boolean
}

const Button = (props: Props): React.Element<*> => {
  const { type, onClick, children, disabled } = props
  

  return (
    <button type={type} onClick={onClick} disabled={disabled} >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: ButtonType.BUTTON,
  onClick: () => {},
  disabled: false
}

export default Button