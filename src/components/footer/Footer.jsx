import React from 'react'
import "./footer.css";

const Footer = () => {
  return (
    <div className='footer'>
        <p>&copy; {new Date().getFullYear()} Shopinext, All rights Reserved.</p>
    </div>
  )
}

export default Footer;