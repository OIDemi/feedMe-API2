import React from 'react'
import Logo from '../assets/logo.svg'
const Navbar = () => {
  return (
    <nav>
        <div className=' nav-container mx-9 mt-5'>
            <img src={Logo} alt="Cookpal" />
        </div>
    </nav>
  )
}

export default Navbar