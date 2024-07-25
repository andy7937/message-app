import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Login" activeStyle>
                        Login
                    </NavLink>
                    <NavLink to="/Register" activeStyle>
                        Register
                    </NavLink>
                    <NavLink to="/Aboutus" activeStyle>
                        About Us
                    </NavLink>
                    <NavLink to="/Dashboard" activeStyle>
                        Dashboard
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;