import React from 'react'

import { NavLink } from 'react-router-dom'


const Navbar = () => {

    return (
        <nav className="navbar">

            <NavLink exact to='/' activeClassName="activeNavButton" className="navLink" >
                Home
        </NavLink>
            <NavLink to='/protected' activeClassName="activeNavButton" className="navLink" >Friends</NavLink>


        </nav>
    );
};

export default Navbar;