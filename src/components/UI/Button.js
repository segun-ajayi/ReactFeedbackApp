

const Button = ({children, type, version, isDisabled}) => {
    return (
        <button
            className={`btn btn-${version}`}
            type={type}
            disabled={isDisabled}
        >{children}</button>
    )
}

Button.defaultProps = {
    type: 'button',
    version: 'primary',
    isDisabled: false
}

export default Button