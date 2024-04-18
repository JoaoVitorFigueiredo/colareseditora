import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./footer.css";

function Footer() {
    const location = useLocation()
    function CallForAction() {

        if (location.pathname !== "/cart"){
            return (
                <div className="cart-call-for-action">
                    <h3>Queres terminar a tua conta?</h3>
                    <NavLink to="/cart">
                        <button>Vá para o carrinho <i className="fas fa-shopping-cart"/></button>
                    </NavLink>
                </div>
            );
        }
    }

    return (
        <div>
            <CallForAction/>
            <footer className="footer">

                <div className="footer-container">
                    <div className="footer-section">
                        <h3 className="footer-heading">Sobre o J&J Books</h3>
                    <p className="footer-text">Somos uma livraria online com uma ambição de vender conhecimento e
                        histórias para os mais curiosos. Temos uma parceria com a editora Colares localizada em
                        Sintra.</p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-heading">Links importantes</h3>
                    <ul className="footer-list">
                        <li className="footer-list-item"><NavLink to="/" className="footer-link">Home</NavLink>
                        </li>
                        <li className="footer-list-item"><NavLink to="/cart" className="footer-link">Carrinho</NavLink></li>
                        <li className="footer-list-item"><NavLink to="/shop" className="footer-link">Loja</NavLink></li>
                    </ul>
                </div>
            </div>
            <hr className="footer-divider"/>
            <div className="copyright">
                <p>&copy; 2023-{new Date().getFullYear()}, Livraria J&J Books com uma parceria com Colares Sintra.</p>
            </div>
        </footer>
        </div>
        );
        }

        export default Footer;
