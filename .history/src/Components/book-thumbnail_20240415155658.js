import React from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import '../public/book-noimage.png';

export function BookThumbnail(props) {

    let priceDisplay;
    if (props.book.price) {
        priceDisplay = `${props.book.price}€`;
    } else {
        priceDisplay = "Preço sob consulta.";
    }

    return (
        <div className="book-thumbnail">
            {props.book.thumbnailUrl ? (
                <Link to={`/book/${props.book.id}`}>
                    <img className="thumbnail-image" src={props.book.thumbnailUrl} alt={props.book.title} />
                </Link>
            ) : (
                <div className="thumbnail-placeholder">
                    <img className="thumbnail-image" src={props.book.thumbnailUrl} alt={props.book.title} />
                </div>
            )}
            <div className="book-details">
                <p className="book-title">{props.book.title}</p>
                <ul className="author-list">
                    {props.book.authors.map((author, index) => <li key={index}>{author}</li>)}
                </ul>
                <ul className="category-list">
                    {props.book.authors.map((author, index) => <li key={index}>{author}</li>)}
                </ul>
                <p className="book-price">{priceDisplay}</p>
                <p className="book-status">{props.book.status}</p>
                <p className="book-score">{"★".repeat(props.book.score)}</p>
                <Link to={`/book/${props.book.id}`} className="buy-button">
                    Adicionar ao carrinho 
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </div>
        </div>
    );
}