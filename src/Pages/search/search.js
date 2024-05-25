import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {PageNav} from "../../Components/pageNav/pageNav";
import "./search.css";

import endpoint from "../../assets/endpoint.json"

export function Search(){
    const  location  = useLocation()
    const { search } = location
    let page = new URLSearchParams(location.search).get("page")
    let searchString = new URLSearchParams(location.search).get("searchString")
    let searchOption = new URLSearchParams(location.search).get("searchOption")
    const [books, setBook] = useState([])
    const [pageNumber,setPageNumber] = useState()


    useEffect(() => {
        fetchBooks();
    },[page, searchString, searchOption])

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [page])

    const fetchBooks = async () => {
        try {
            console.log(`${endpoint.url}books/${searchOption}/${searchString}?limit=10&page=${page}`)
            const response = await fetch(`${endpoint.url}books/${searchOption}/${searchString}?limit=10&page=${page}`,{method:"GET"})
            const responseJson = await response.json()
            setBook(responseJson.books)
            setPageNumber(responseJson.pageLast)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    if (books.length > 0) {
        return (
            <div>
                <h1 className="search-results">A exibir resultados para "{searchString}" em {searchOption === "author" ? "autor" : searchOption === "title" ? "título" : "categoria"}</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
                <PageNav currentPage={page} currentPath={location.pathname} currentParams={search}
                         pageNumber={pageNumber}/>
            </div>
        )
    }else{
        return(
            <div class="search-result">
                <p>Nenhum resultado encontrado para <strong>{searchString}</strong> em <strong>{searchOption === "author" ? "autor" : searchOption === "title" ? "título" : "categoria"}</strong>.</p>
                <p>Verifica os parâmetros da tua pesquisa ou visita a loja para ter acesso a todos os nossos títulos.</p>
            </div>
        )
    }
}
