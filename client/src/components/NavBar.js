import React from 'react'

import { NavLink } from 'react-router-dom'


const Navbar = () => {

    return (
        <nav className="navbar">

            <NavLink exact to='/' activeClassName="activeNavButton" className="navLink" >
                Login
        </NavLink>
            <NavLink to='/protected' activeClassName="activeNavButton" className="navLink" >Bubbles</NavLink>


        </nav>
    );
};

export default Navbar;