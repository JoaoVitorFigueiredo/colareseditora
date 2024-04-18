import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {PageNav} from "../../Components/pageNav/pageNav";
import "./book-page.css";

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
            const responseTotal = await fetch(`http://localhost:3030/books?title_like=${searchString}`,{method:"GET"})
            const allBooks = await responseTotal.json();
            const totalBooks = allBooks.length
            setPageNumber(Math.ceil(totalBooks / 10))


            const response = await fetch(`http://localhost:3030/books?${searchOption}_like=${searchString}&_per_page=10&_page=${page}`,{method:"GET"})
            const bookData = await response.json();
            setBook(bookData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }
    if (books.length > 0) {
        return (
            <div>
                <h1 className="search-results">A exibir resultados para "{searchString}" em {searchOption === "authors" ? "autor" : searchOption === "title" ? "título" : "categoria"}</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
                <PageNav currentPage={page} currentPath={location.pathname} currentParams={search}
                         pageNumber={pageNumber}/>
            </div>
        )
    }else{
        return(
            <div>
                <p>Nenhum resultado encontrado para <strong>{searchString}</strong> em <strong>{searchOption === "authors" ? "autor" : searchOption === "title" ? "título" : "categoria"}</strong></p>
                <p>Verifique os parâmetros da sua pesquisa ou visite a loja para ter acesso a todos os nossos títulos</p>
            </div>
        )
    }
}