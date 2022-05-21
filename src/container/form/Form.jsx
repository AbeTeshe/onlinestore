import "./form.css";

const Form = (props) => {
  return (
    <form {...props} className={`formContainer ${props.className}`}>
      {props.children}
    </form>
  )
}

export default Form;