import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png';
import { AuthContext } from '../context/authContext';


const Navbar = () => {
  const {currentUser, logout}= useContext(AuthContext)
  const [toggleMobileMenu, setToggleMobileMenu]= useState(true)

  const mobileMenu=()=>{
    setToggleMobileMenu(!toggleMobileMenu)
    
  }

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="" /></Link>
        </div>
        <div className={` ${toggleMobileMenu? 'links':'nodisplay'}`} onClick={mobileMenu}>
          <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
          <Link className='link' to="/?cat=science"><h6>SCIENCE</h6></Link>
          <Link className='link' to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to="/?cat=design"><h6>DESIGN</h6></Link>
          <Link className='link' to="/?cat=food"><h6>FOOD</h6></Link>
          <span className="user"> {currentUser?.username }</span>
          {currentUser? <span className="logout" onClick={logout}>Logout</span>: null } 
          {currentUser? <span className='write'><Link className='link' to='/write'>Write</Link></span>: null}
          </div>
        <div className='hamburger' onClick={mobileMenu} >
            <div className='burger burger1' />
            <div className='burger burger2' />
            <div className='burger burger3' />
          </div>
          
      </div>
    </div>
  )
}

export default Navbar
