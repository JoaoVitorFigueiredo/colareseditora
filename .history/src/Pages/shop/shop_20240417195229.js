import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {Filter} from "../../Components/filter/filter"
import {PageNav} from "../../Components/pageNav/pageNav";

import {useLocation} from "react-router-dom"

export function Shop(){
    const  location  = useLocation()
    const { search } = location
    const page = new URLSearchParams(location.search).get("page")
    const selectedOption = new URLSearchParams(location.search).get("selectedOption")
    const filterString = new URLSearchParams(location.search).get("filterString")
    const filterOption = new URLSearchParams(location.search).get("filterOption")
    const selectedOrder = new URLSearchParams(location.search).get("order")
    const [pageNumber,setPageNumber] = useState(0)
    const [books, setBooks] = useState([]);


    useEffect(() =>{
            fetchBooks()
        },
        [selectedOption,filterString,filterOption,selectedOrder,page])

    const fetchBooks = async ()=> {
        try {
            const responseTotal = await fetch(`http://localhost:3030/books?${filterOption}_like=${filterString}`, { method: "GET" });
            const allBooks = await responseTotal.json();
            const totalBooks = allBooks.length;
            const totalPages = Math.ceil(totalBooks / 10);

            setPageNumber(totalPages);

            if (selectedOption){
                const response = await fetch(`http://localhost:3030/books?price_ne=&${filterOption}_like=${filterString}&_sort=${selectedOption}&_order=${selectedOrder}&_per_page=10&_page=${page}`,{method:"GET"})
                let booksData = await response.json();
                setBooks(booksData)
            }
            else{
                setBooks(allBooks)
            }
        }
        catch (error) {
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            <h1 className="shop-header">Os livros mais populares...</h1>
            <Filter/>
            {books.map(book => <BookThumbnail book={book}/>)}
            <PageNav currentPage={page} currentPath={location.pathname} currentParams={search} pageNumber={pageNumber}/>
            </div>
    )
}