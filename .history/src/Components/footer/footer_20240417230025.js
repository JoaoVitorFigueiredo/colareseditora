import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";

function Footer() {
    const location = useLocation()
    function CallForAction() {

        if (location.pathname == "/shop" || location.pathname == "/search" || location.pathname == "/book" || ){
            return(
                <div className="cart-call-for-action">
                    <h3>Deseja finalizar sua compra?</h3>
                    <Link to="/cart">
                    <button>Vá para o carrinho<i className="fas fa-shopping-cart"/></button>
                    </Link>
                </div>
            )
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
                        <li className="footer-list-item"><Link to="/" className="footer-link">Página principal</Link>
                        </li>
                        <li className="footer-list-item"><Link to="/cart" className="footer-link">Carrinho</Link></li>
                        <li className="footer-list-item"><Link to="/shop" className="footer-link">Loja</Link></li>
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
