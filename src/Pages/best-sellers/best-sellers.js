import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import './best-sellers.css';

import endpoint from "../../assets/endpoint.json"

export function BestSellers(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            const response = await fetch(`${endpoint.url}books/featured`,{method:"GET"})
            const booksData = await response.json();
            setBooks(booksData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }

    return (
        <div>
            <div>
                <h1 className="best-sellers-header">Mais vendidos</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
            </div>
            <div>
                <h1 className="best-sellers-header">Melhor avaliados</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
            </div>
        </div>
    )
}


