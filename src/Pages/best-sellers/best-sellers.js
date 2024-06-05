import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import './best-sellers.css';

import endpoint from "../../assets/endpoint.json"

export function BestSellers(){
    const [featuredBooks, setFeaturedBooks] = useState([])
    const [bestSellerBooks, setBestSellerBooks] = useState([])

    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            const featured_response = await fetch(`${endpoint.url}books/featured`,{method:"GET"})
            const featuredBooksData = await featured_response.json();
            setFeaturedBooks(featuredBooksData)

            const bestSeller_response = await fetch(`${endpoint.url}books/bestsellers`,{method:"GET"})
            const bestSellerBooksData = await bestSeller_response.json();
            setBestSellerBooks(bestSellerBooksData)
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }

    return (
        <div>
            <div>
                <h1 className="best-sellers-header">Mais vendidos</h1>
                {bestSellerBooks.map(book => <BookThumbnail book={book}/>)}
            </div>
            <div>
                <h1 className="best-sellers-header">Melhor avaliados</h1>
                {featuredBooks.map(book => <BookThumbnail book={book}/>)}
            </div>
        </div>
    )
}


