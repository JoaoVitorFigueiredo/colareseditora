import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import booklogo from '../../assets/logo-jj.png';
import {CartContext} from "../../App";


function NavBar() {
    const navigator = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const [searchString, setSearchString] = useState('');

    const [searchOption, setSearchOption] = useState('title')

    const {cart} = useContext(CartContext)



    function updateSearchString(e) {
        setSearchString(e.target.value);
    }

    function updateSearchOption(e){
        setSearchOption(e.target.value)
    }

    function handleEnter(e){
        if (e.key === "Enter") {
            navigator(`/search?searchOption=${searchOption}&searchString=${searchString}&page=1`)
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink exact to="/" className="nav-logo">
                    <img src={booklogo} alt="J&J Books Logo" className="logo-image"/>
                </NavLink>

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
                        <option value="author">Autor</option>
                        <option value="categories">Categoria</option>
                    </select>
                </div>

                <div className="nav-toggle" onClick={toggleMenu}>
                    <div className={isMenuOpen ? "nav-icon open" : "nav-icon"}><i class="fa-solid fa-sliders"></i></div>
                </div>

                <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item" onClick={toggleMenu}>
                        <NavLink exact to="/" activeClassName="active" className="nav-links">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item" onClick={toggleMenu}>
                        <NavLink exact to="/shop?selectedOption=score&filterOption=author&filterString=&page=1"
                              activeClassName="active" className="nav-links">
                            Loja
                        </NavLink>
                    </li>
                    <li className="nav-item" onClick={toggleMenu}>
                        <NavLink exact to="/cart" activeClassName="active" className="nav-links">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {cart.volume > 0 && cart.volume <= 99 ? (
                                <span className="cart-item-count">{cart.volume}</span>
                            ) : cart.volume > 99 ? <span className="cart-item-count">99+</span> : null}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
