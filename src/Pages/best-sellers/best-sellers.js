import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import './best-sellers.css';

import primavera from "../../assets/primavera.jpg"

import Carousel from "react-bootstrap/Carousel";
import {Image} from "react-bootstrap";

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

    function InfoSlider(){
        return (
            <Carousel>
                <Carousel.Item >
                    <Carousel.Caption>
                        <div style={{BackgroundImage: {primavera}}}>
                            <h1>Chegaram os descontos de primavera!</h1>
                            <p>Celebre o florecer com novos livros na J&J Books</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>

                </Carousel.Item>

            </Carousel>
        )
    }

    return (
        <div>
            <div>
                <h1 className="best-sellers-header">Mais vendidos</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
            </div>
            <div>
                <h1 className="best-sellers-header">Melhor avaliados</h1>
                {books.map(book => <BookThumbnail book={book}/>)}
            </div>

        </div>
    )
}


