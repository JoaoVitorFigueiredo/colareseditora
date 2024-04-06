import React from "react";
import {Link} from "react-router-dom"

export function BookThumbnail(id,title,publishedDate,price,status,authors,score,thumbnailUrl){
    return (
        <div>
            <Link to={`/book/${id}`}><img src={thumbnailUrl}></img></Link>
            <p>{title}</p>
            <ul>{authors.map(author => <li>{author}</li>)}</ul>
            <p>{price}€</p>
            <p>{status}</p>
            <p>{"★".repeat(score)}</p>
            <Link to={`/book/${id}`}><button>Comprar</button></Link>
        </div>
    )
}