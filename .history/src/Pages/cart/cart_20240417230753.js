import {React, useEffect, useState, useContext} from "react";
import {CartContext} from "../../App"
import {Link} from "react-router-dom";
import NoImage from "../../assets/book-noimage.png";

export const Cart = () =>{
    function BookInCart({book}){
        function addBook() {
            setCart(prevCart => ({
                ...prevCart,
                books: prevCart.books.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                total: prevCart.total + book.price,
                volume: prevCart.volume + 1
            }));
        }
        function subtractBook(){
            setCart(prevCart => ({
                ...prevCart,
                books: prevCart.books.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
                ),
                total: prevCart.total - book.price,
                volume: prevCart.volume - 1
            }));
            setCart(prevCart => {return {...prevCart, books: prevCart.books.filter(item => item.quantity > 0)}})
        }
        function removeBook(){
            setCart(prevCart => ({
                ...prevCart,
                total: prevCart.total - (book.price*book.quantity),
                volume: prevCart.volume - book.quantity
            }));
            setCart(prevCart => {return {...prevCart, books: prevCart.books.filter(item => item.id !== book.id)}})
        }

  if (cart.volume > 0) {
    return (
      <div className="cart-container">
        <div className="cart-items">
          {cart.books.map((book) => (
            <div className="book-item" key={book.id}>
              {book.thumbnailUrl ? (
                <Link to={`/book/${book.id}`}>
                  <img
                    className="thumbnail-image"
                    src={book.thumbnailUrl}
                    alt={book.title}
                  />
                </Link>
              ) : (
                <div className="thumbnail-placeholder">
                  <img
                    className="thumbnail-image"
                    src={NoImage}
                    alt={book.title}
                  />
                </div>
              )}

              <div className="book-details">
                <p className="book-title">AAAA {book.pageCount}</p>
                <div className="quantity-buttons">
                  <button onClick={() => subtractBook(book)}>-</button>
                  <p>{book.quantity}</p>
                  <button onClick={() => addBook(book)}>+</button>
                </div>
              </div>
              <button className="remove-button" onClick={() => removeBook(book)}>
                Remover
              </button>
            </div>
        )
    }
    const {cart, setCart} = useContext(CartContext)

    if (cart.volume>0){
        return (
            <div>
                <div>
                    {cart.books.map(book => <BookInCart book={book}/>)}
                </div>
                <div>
                    <p>Preço total: {cart.total.toFixed(2)}</p>
                    <p>Quantidade de itens: {cart.volume}</p>
                    <button>Check-out</button>
                </div>
            </div>
        )
    }
    else{
        return (
        <div>
            <p>Parece que seu carrinho está sem nenhum livro...</p>
            <p>Escolha na loja os artigos que deseja e retorne aqui para realizar sua compra!</p>
        </div>
        )
    }


}