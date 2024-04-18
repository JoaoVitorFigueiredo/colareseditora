import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import NoImage from '../assets/book-noimage.png';
import {CartContext} from "../App";
import {addCartUtil} from "../Utils/CartUtils";

export function BookThumbnail({book}) {
    let priceDisplay = book.price ? `${book.price.toFixed(2)}€` : "Preço sob consulta.";
    const cartContext = useContext(CartContext)

    return (
        <div className="book-thumbnail">
            <Link to={`/book/${book.id}`}>
                <div className="thumbnail-container">
                    <img className="thumbnail-image" src={book.thumbnailUrl || NoImage} alt={book.title} />
                </div>
            </Link>
            <p className="book-title">{book.title}</p>
            <p className="book-price">{priceDisplay}</p>
            <button onClick={() => addCartUtil(cartContext,book)} className="buy-button">
            <i className="fas fa-shopping-cart"></i>
            </button>
        </div>
    );
}