import "./card.css";

const Card = (props) => {
  return (
    <div {...props} className={`cardContainer ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card;