import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import booklogo from '../../assets/logo-jj.png';

function NavBar() {
    const navigator = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const [searchString, setSearchString] = useState('');

    const [searchOption, setSearchOption] = useState('title')

    function updateSearchString(e) {
        setSearchString(e.target.value);
    }

    function updateSearchOption(e){
        setSearchOption(e.target.value)
    }

    function handleEnter(e){
        if (e.key === "Enter") {
            console.log("Enterrrr")
            navigator(`/search?searchOption=${searchOption}&searchString=${searchString}&page=1`)
        }
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
                        onChange={updateSearchString}
                        onKeyDown={handleEnter}
                    />
                    <select id="dropdown" value={searchOption} onChange={updateSearchOption}>
                        <option value="title">Título</option>
                        <option value="authors">Autor</option>
                        <option value="categories">Categoria</option>
                    </select>
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
                        <Link exact to="/shop?selectedOption=-score&filterOption=authors&filterString=&page=1"
                              activeClassName="active" className="nav-links">
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
