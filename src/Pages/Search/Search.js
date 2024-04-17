import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {useSearchParams} from "react-router-dom";

export function Search(){
    const  location  = useLocation()
    const { search } = location
    let page = new URLSearchParams(location.search).get("page")
    let searchString = new URLSearchParams(location.search).get("searchString")
    const [books, setBook] = useState([])

    useEffect(() => {
        fetchBooks();
    },[])

    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:3030/books?title_like=${searchString}&_limit=10&_page=${page}`,{method:"GET"})
            const bookData = await response.json();
            console.log(bookData)
            setBook(bookData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            {books.map(book => <BookThumbnail book={book}/>)}
        </div>
    )
}