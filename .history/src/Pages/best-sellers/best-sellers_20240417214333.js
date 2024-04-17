import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import './best-sellers.css';

export function BestSellers(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3030/books/?_sort=-score&_limit=5',{method:"GET"})
            const booksData = await response.json();
            setBooks(booksData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            <h1 className="best-sellers-header">Os livros com melhor pontuação</h1>
            {books.map(book => <BookThumbnail book={book}/>)}
        </div>
    )
}


