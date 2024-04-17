import React from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import NoImage from '../assets/book-noimage.png';

export function BookThumbnail(props) {
    let priceDisplay = props.book.price ? `${props.book.price.toFixed(2)}€` : "Preço sob consulta.";

    return (
        <div className="book-thumbnail">
            <Link to={`/book/${props.book.id}`}>
                <div className="thumbnail-container">
                    <img className="thumbnail-image" src={props.book.thumbnailUrl || NoImage} alt={props.book.title} />
                </div>
            </Link>
            <p className="book-title">{props.book.title}</p>
            <p className="book-price">{priceDisplay}</p>
            <Link to={`/book/${props.book.id}`} className="buy-button">
                Comprar 
            </Link>
        </div>
    );
}