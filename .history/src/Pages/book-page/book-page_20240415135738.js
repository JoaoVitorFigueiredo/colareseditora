import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export function BookPage(){
    let { id } = useParams()
    const [book, setBook] = useState([])


    useEffect(() => {
        fetchBooks();
    },[])
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:3030/books/?id=${id}`,{method:"GET"})
            const bookData = await response.json();
            setBook(bookData[0])
        }
        catch (error){
            console.error(`Error fetching data: ${error}`) // Era engraçado fazer isso daqui enviar pra uma página de erro.
        }
    }

    return(
        <div className="page">
            <div>
                <img alt={'?'} src={book.thumbnailUrl}></img>
                <p>{book.title}</p>
                <p>{book.shortDescription}</p>
            </div>
            <div>
                <p>{book.status}</p>
                <p>{book.price}€</p>
                <button>
                    Comprar
                </button>
            </div>
        </div>
    )
}