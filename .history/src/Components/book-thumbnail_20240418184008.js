import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import NoImage from '../assets/book-noimage.png';
import {CartContext} from "../App";
import {addCartUtil} from "../Utils/CartUtils";


export function BookThumbnail({book}) {
    let priceDisplay = book.price ? `${book.price.toFixed(2)}€` : "Preço sob consulta.";
    const cartContext = useContext(CartContext)

    const [addedToCart, setAddedToCart] = useState(false)

    async function addCart(){
        addCartUtil(cartContext, book)
        setAddedToCart(true)
        await new Promise(resolve => setTimeout(resolve,2000))
        setAddedToCart(false)

    }

    if (addedToCart){
        return (
            <div className="book-thumbnail">
                <Link to={`/book/${book.id}`}>
                    <div className="thumbnail-container">
                        <img className="thumbnail-image" src={book.thumbnailUrl || NoImage} alt={book.title}/>
                    </div>
                </Link>
                <p className="book-title">{book.title}</p>
                <p className="book-price">{priceDisplay}</p>

                <button className="buy-button">
                    <i className="fa-solid fa-check"></i>
                </button>
                <p>Adicionado ao carrinho!</p>
            </div>
        )
    } else {
        return (
            <div className="book-thumbnail">
                <Link to={`/book/${book.id}`}>
                    <div className="thumbnail-container">
                        <img className="thumbnail-image" src={book.thumbnailUrl || NoImage} alt={book.title}/>
                        <div className="book-classification">{"★".repeat(book.score)}{"☆".repeat(5 - book.score)}</div>
                    </div>
                </Link>
                <p className="book-title">{book.title}</p>
                <p className="book-price">{priceDisplay}</p>

                {book.price ? <button onClick={addCart} className="buy-button">
                    Adicionar <i className="fas fa-shopping-cart"></i>
                </button> :
                <Link to={`/book/${book.id}`} >
                    <button className="buy-button">
                        Detalhes <i class="fa-solid fa-eye check-icon"></i>
                    </button>
                    </Link>
                }

            </div>
        );
    }
}
