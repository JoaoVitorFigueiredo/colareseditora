import React, {useContext} from "react";
import {CartContext} from "../../App"
import {Link} from "react-router-dom";
import NoImage from "../../assets/book-noimage.png";
import {addBookUtil, removeBookUtil, subtractBookUtil} from "../../CartUtils";

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
                <button onClick={subtractBook}>-</button>
                <p>{book.quantity}</p>
                <button onClick={addBook}>+</button>
                <button onClick={removeBook}>Remover</button>
            </div>
        )
    }
    const cartContext = useContext(CartContext)
    const {cart} = cartContext

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
            <Link to="/shop"><button>Para a loja</button></Link>
        </div>
        )
    }


}