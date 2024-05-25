import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {Filter} from "../../Components/filter/filter"
import {PageNav} from "../../Components/pageNav/pageNav";
import './shop.css';

import endpoint from "../../assets/endpoint.json"


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

    useEffect(()=>{
        window.scrollTo(0,300)
    }, [page])

    const fetchBooks = async ()=> {
        try {
            const response = await fetch(`${endpoint.url}books/${filterOption}/${filterString}?sortby=${selectedOption}&order=${selectedOrder}&limit=10&page=${page}`,{method:"GET"})
            const booksData = await response.json();
            setBooks(booksData)

        } catch (error) {
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    return (
        <div>
            <h1 className="shop-header">Biblioteca de Livros</h1>
            <Filter/>
            {books.length > 0? books.map(book => <BookThumbnail book={book}/>):<p>Nenhum resultado encontrado :/</p>}
            {books.length > 0? <PageNav currentPage={page} currentPath={location.pathname} currentParams={search} pageNumber={pageNumber}/>:null}
        </div>
    )
}