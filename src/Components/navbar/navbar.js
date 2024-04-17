import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import booklogo from '../../assets/logo-jj.png';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const [searchString, setSearchString] = useState('');

    function updateSearch(e) {
        setSearchString(e.target.value);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link exact to="/" className="nav-logo">
                    <img src={booklogo} alt="J&J Books Logo" className="logo-image"/>
                </Link>

                <div className="nav-search-container">
                    <input 
                        type="text"
                        placeholder="Pesquisa..."
                        className="nav-search-input"
                        value={searchString}
                        onChange={updateSearch}
                    />
                    <Link to={`/search?searchString=${searchString}&page=1`} className="nav-search-icon">
                        <i className="fas fa-search"></i>
                    </Link>
                </div>

                <div className="nav-toggle" onClick={toggleMenu}>
                    <div className={isMenuOpen ? "nav-icon open" : "nav-icon"}></div>
                </div>

                <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item" onClick={toggleMenu}>
                        <Link exact to="/" activeClassName="active" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" onClick={toggleMenu}>
                        <Link exact to="/shop?selectedOption=-score&filterOption=authors&filterString=&page=1" activeClassName="active" className="nav-links">
                            Loja
                        </Link>
                    </li>
                    <li className="nav-item" onClick={toggleMenu}>
                        <Link exact to="/sales" activeClassName="active" className="nav-links">
                            Promoções
                        </Link>
                    </li>
                    <li className="nav-item" onClick={toggleMenu}>
                        <Link exact to="/cart" activeClassName="active" className="nav-links">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
