import "./button.css";

const Button = (props) => {
  return (
    <button {...props} className={`buttonContainer ${props.className}`} >
        {props.children}
    </button>
  )
}

export default Button