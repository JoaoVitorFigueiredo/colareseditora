import {React, useEffect, useState} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";

export function Shop(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:3030/books/",{method:"GET"})
            const booksData = await response.json();
            setBooks(booksData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            {books.map(book => BookThumbnail(book.id,book.title,book.publishedDate,book.price ,book.status,book.authors,book.score,book.thumbnailUrl))}
        </div>
    )
}