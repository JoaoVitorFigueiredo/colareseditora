import React from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return <div className="navbar">
        <div className="links">
            <picture/>
            <Link to="/"> Main Page (icon) </Link>
            <Link to="/shop"> Loja </Link>
            <Link to="/sales"> Promoções </Link>
            <Link className="Cart" to="/cart"> Carrinho (icon) </Link>
        </div>
    </div>
}