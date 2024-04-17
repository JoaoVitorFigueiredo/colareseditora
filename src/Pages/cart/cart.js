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
        function removeBook(){
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

        return (
            <div>
                {book.thumbnailUrl ? (
                    <Link to={`/book/${book.id}`}>
                        <img className="thumbnail-image" src={book.thumbnailUrl} alt={book.title} />
                    </Link>
                ) : (
                    <div className="thumbnail-placeholder">
                        <img className="thumbnail-image" src={NoImage} alt={book.title} />
                    </div>
                )}

                <div className="book-title">
                    <p className="book-title">{book.title}</p>
                </div>
               <div className="buantity-buttons"></div>
                <button onClick={removeBook}>-</button>
                <p>{book.quantity}</p>
                <button onClick={addBook}>+</button>
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