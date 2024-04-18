import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";

function Footer() {
    const location = useLocation()
    function CallForAction() {

        if (location.pathname !== "/cart"){
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
                    <h3 className="footer-heading">Links Importantes</h3>
                    <ul className="footer-list">
                        <li className="footer-list-item"><Link to="/" className="footer-link">Página principal</Link>
                        </li>
                        <li className="footer-list-item"><Link to="/link2" className="footer-link">Termos e
                            Condições</Link></li>
                        <li className="footer-list-item"><Link to="/link3" className="footer-link">Promoções</Link></li>
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
