import React from "react";
import {Link} from "react-router-dom"

export function BookThumbnail(props){
    return (
        <div>
            <Link to={`/book/${props.book.id}`}><img src={props.book.thumbnailUrl}></img></Link>
            <p>{props.book.title}</p>
            <ul>{props.book.authors.map(author => <li>{author}</li>)}</ul>
            <ul>{props.book.categories.map(category => <li>{category}</li>)}</ul>
            <p>{props.book.price}€</p>
            <p>{props.book.status}</p>
            <p>{"★".repeat(props.book.score)}</p>
            <Link to={`/book/${props.book.id}`}><button>Comprar</button></Link>
        </div>
    )
}