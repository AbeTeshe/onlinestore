import "./input.css";

const Input = (props) => {
  return (
    <div className={`inputContainer ${props.className}`}>
        <label className="inputLabel">{props.label}</label>
        <input className="inputs" {...props} placeholder="" onChange={props.handlechange} />
    </div>
  )
}

export default Input