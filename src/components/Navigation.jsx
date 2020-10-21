import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/dashboard">Home</NavLink>
          {/* <NavLink to="/about">About</NavLink> */}
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login">Login</NavLink>
       </div>
    );
}
 
export default Navigation;