import React, {useContext} from "react";
import {CartContext} from "../../App"
import {Link} from "react-router-dom";
import NoImage from "../../assets/book-noimage.png";
import {addBookUtil, removeBookUtil, subtractBookUtil, clearCartUtil} from "../../Utils/CartUtils";
import "./cart.css";

export const Cart = () =>{
    function BookInCart({book}){

        return (
            <div className="book-item">
                {book.thumbnailUrl ? (
                    <Link to={`/book/${book.id}`}>
                        <img className="thumbnail-image" src={book.thumbnailUrl} alt={book.title} />
                    </Link>
                ) : (
                    <div className="thumbnail-placeholder">
                        <Link to={`/book/${book.id}`}><img className="thumbnail-image" src={NoImage} alt={book.title} /></Link>
                    </div>
                )}
    
                <div className="book-details">
                    <p className="book-title">{book.title}</p>
                    <p>{(book.price*book.quantity).toFixed(2)}€</p>
                    <div className="quantity-buttons">
                        <button onClick={() => subtractBookUtil(cartContext,book)}>-</button>
                        <p>{book.quantity}</p>
                    
                        <button onClick={() => addBookUtil(cartContext, book)}>+</button>
                        <button className="remove-button" onClick={() => removeBookUtil(cartContext,book)}>Remover</button>
                    </div>
                </div>
            </div>
        );
    }
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
                    <button className="checkout-button">Checkout</button>
                </div>
                <div><button onClick={() => clearCartUtil(cartContext)}>Clear cart</button></div>
            </div>
        );
    } else {
        return (
            <div className="empty-cart">
                <p>Parece que o teu carrinho está vazio...</p>
                <p>Escolhe na loja os artigos que desejas e retorna aqui para realizar a tua compra!</p>
                <Link to="/shop?selectedOption=-score&filterOption=authors&filterString=&page=1"><button><i class="fa-duotone fa-books"></i></button></Link>
            </div>
        );
    }
};