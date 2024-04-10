import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const [searchString, setSearchString] = useState('')

    function updateSearch(e){
        setSearchString(e.target.value)
    }
    
    return (

        <nav className="navbar">
            <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
                <span>J&J Books</span>
            </NavLink>

            <div className="nav-toggle" onClick={toggleMenu}>
                <div className={isMenuOpen ? "nav-icon open" : "nav-icon"}></div>
            </div>

            <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                <input value={searchString} onChange={updateSearch}></input>
                </li>
                <li className="nav-item" onClick={toggleMenu}>
                <NavLink to={`/search/${searchString}`} activeClassName="active" className="nav-links">
                    Pesquisar
                </NavLink>
                </li>
                <li className="nav-item" onClick={toggleMenu}>
                <NavLink exact to="/" activeClassName="active" className="nav-links">
                    Home
                </NavLink>
                </li>
                <li className="nav-item" onClick={toggleMenu}>
                <NavLink exact to="/shop" activeClassName="active" className="nav-links">
                    Loja
                </NavLink>
                </li>
                <li className="nav-item" onClick={toggleMenu}>
                <NavLink exact to="/sales" activeClassName="active" className="nav-links">
                    Promoções
                </NavLink>
                </li>
                <li className="nav-item" onClick={toggleMenu}>
                <NavLink exact to="/cart" activeClassName="active" className="nav-links">
                    Carrinho
                </NavLink>
                </li>
            </ul>
            </div>
        </nav>
    );
}
  
export default NavBar;
