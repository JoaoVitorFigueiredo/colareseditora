import React, {useContext} from "react";
import {CartContext} from "../../App"
import {Link} from "react-router-dom";
import NoImage from "../../assets/book-noimage.png";
import {addBookUtil, removeBookUtil, subtractBookUtil} from "../../CartUtils";
import "./cart.css";

export const Cart = () =>{
    function BookInCart({book}){
        function addBook() {
            addBookUtil(cartContext,book)
        }
        function subtractBook(){
            subtractBookUtil(cartContext,book)
        }
        function removeBook(){
            removeBookUtil(cartContext,book)
        }

        return (
            <div className="book-item">
                {book.thumbnailUrl ? (
                    <Link to={`/book/${book.id}`}>
                        <img className="thumbnail-image" src={book.thumbnailUrl} alt={book.title} />
                    </Link>
                ) : (
                    <div className="thumbnail-placeholder">
                        <img className="thumbnail-image" src={NoImage} alt={book.title} />
                    </div>
                )}
    
                <div className="book-details">
                    <p className="book-title">{book.title}</p>
                    <div className="quantity-buttons">
                        <button onClick={subtractBook}>-</button>
                        <p>{book.quantity}</p>
                        <button onClick={addBook}>+</button>
                        <button className="remove-button" onClick={removeBook}>Remover</button>
                    </div>
                </div>
            </div>
        );
    };
    const cartContext = useContext(CartContext)
    const {cart} = cartContext

    if (cart.volume > 0) {
        return (
            <div className="cart-container">
                <div className="cart-items">
                    {cart.books.map(book => <BookInCart key={book.id} book={book} />)}
                </div>
                <div className="cart-summary">
                    <p>Preço total: {cart.total.toFixed(2)}€</p>
                    <p>Quantidade de itens: {cart.volume}</p>
                    <button className="checkout-button">Check-out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="empty-cart">
                <p>Parece que seu carrinho está sem nenhum livro...</p>
                <p>Escolha na loja os artigos que deseja e retorne aqui para realizar sua compra!</p>
                <Link to="/shop"><i className="empty-cart-icon fa-duotone fa-books"></i></Link>
            </div>
        );
    }
};