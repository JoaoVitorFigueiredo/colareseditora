import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BookThumbnail} from "../../Components/book-thumbnail";

export function Search(){
    let { searchString } = useParams()
    const [books, setBook] = useState([])


    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            console.log(title)
            const response = await fetch(`http://localhost:3030/books?title_like=${searchString}`,{method:"GET"})
            const bookData = await response.json();
            setBook(bookData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            {books.map(book => BookThumbnail(book.id,book.title,book.publishedDate,book.price,book.status,book.authors,book.score,book.thumbnailUrl))}
        </div>
    )
}