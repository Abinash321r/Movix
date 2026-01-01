import React from 'react'
import './Footer.css'
import logo from '../../assets/9ksHG8-LogoMakr.png';
function Footer() {
  return (
    <div id='footer'>
      <div id='footerlogo'>
        <img src={logo} />
        <h2>MoVIX</h2>
      </div>
      <div id="wrapper">
      <div id='contact'>
      <h4>Contact</h4>
      <p>Email: info@movix.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      </div>
      <div id='copyright'>
        <p>Cpoyright &copy; MoVIX .All rights are reserved</p>
      </div>
      </div>
    </div>

  )
}

export default Footer