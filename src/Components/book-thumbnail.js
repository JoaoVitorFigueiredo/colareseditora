import React from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import NoImage from '../assets/book-noimage.png';

export function BookThumbnail(props) {

    let priceDisplay;
    let buttonBookPageText;
    let iconBookPage;
    if (props.book.price) {
        priceDisplay = `${props.book.price.toFixed(2)}€`;
        buttonBookPageText = "Comprar agora"
        iconBookPage = <i className="fas fa-shopping-cart"></i>
    } else {
        priceDisplay = "Preço sob consulta.";
        buttonBookPageText = "Ver mais";
        iconBookPage = <i className="fas fa-shopping-cart"></i>
    }

    return (
        <div className="book-thumbnail">

            {props.book.thumbnailUrl ? (
                <Link to={`/book/${props.book.id}`}>
                    <img className="thumbnail-image" src={props.book.thumbnailUrl} alt={props.book.title} />
                </Link>
            ) : (
                <div className="thumbnail-placeholder">
                    <img className="thumbnail-image" src={NoImage} alt={props.book.title} />
                </div>
            )}
            <div className="book-details">
                <div className="book-title">
                    <p className="book-title">{props.book.title}</p>
                </div>
                <ul className="author-list">
                    {props.book.authors.map((author, index) => <li key={index}>{author}</li>)}
                </ul>
                <ul className="book-category">
                    {props.book.categories.map((category, index) => <li key={index}>{category}</li>)}
                </ul>
                <p className="book-price">{priceDisplay}</p>
                <p className="book-status">{props.book.status}</p>
                <p className="book-score">{"★".repeat(props.book.score)+"☆".repeat(5-props.book.score)}</p>
                <Link to={`/book/${props.book.id}`} className="buy-button">
                    {buttonBookPageText}
                    {iconBookPage}
                </Link>
            </div>
        </div>
    );
}