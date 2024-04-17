import React, {useState} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {Filter} from "../../Components/filter/filter"
import {PageNav} from "../../Components/pageNav/pageNav";

import {useLocation} from "react-router-dom"

export function Shop(){
    const  location  = useLocation()
    const { search } = location
    let page = new URLSearchParams(location.search).get("page")

    const [books, setBooks] = useState([]);
    async function selectBooks(selectedOption,filterString,filterOption){

        try {
            const response = await fetch(`http://localhost:3030/books?${filterOption}_like=${filterString}&_sort=${selectedOption}&_limit=10&_page=${page}`,{method:"GET"})
            console.log(response)
            let booksData = await response.json();

            setBooks(booksData)
        }
        catch (error) {
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }

    }
    return (
        <div>
            <Filter selectBooks={selectBooks}/>
            {books.map(book => <BookThumbnail book={book}/>)}
            </div>
    )
}