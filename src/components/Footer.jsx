import React from 'react';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span> Made with love and <Link to ="/login"><b>React.js</b>.</Link></span>
    </footer>
  )
}

export default Footer