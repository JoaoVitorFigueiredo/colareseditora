import React from 'react';
import { Link } from 'react-router-dom';
import './book-thumbnail.css';
import NoImage from '../assets/book-noimage.png';

export function BookThumbnail(props) {

    let priceDisplay;
    if (props.book.price) {
        priceDisplay = `${props.book.price}€`;
    } else {
        priceDisplay = "Preço sob consulta.";
    }

    return (
        <div>
            <Link to={`/book/${props.book.id}`}><img src={props.book.thumbnailUrl}></img></Link>
            <p>{props.book.title}</p>
            <ul>{props.book.authors.map(author => <li>{author}</li>)}</ul>
            <p>{props.book.price}€</p>
            <p>{props.book.status}</p>
            <p>{"★".repeat(props.book.score)}</p>
            <Link to={`/book/${props.book.id}`}><button>Comprar</button></Link>
        </div>
    );
}