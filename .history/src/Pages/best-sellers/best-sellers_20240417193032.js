import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";

export function BookLibrary() {
    return (
        <div className="book-library">
            <h1 className="library-title">BestSellers | TOP #5 </h1>
            <div className="book-thumbnails">
                {/* Aqui você pode mapear a lista de livros e renderizar cada miniatura usando o componente BookThumbnail */}
                {/* Exemplo: props.books.map(book => <BookThumbnail key={book.id} book={book} />) */}
            </div>
        </div>
    );
}

// Verificar Promises pra isso
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
    return (
        <div>
            {books.map(book => <BookThumbnail book={book}/>)}
        </div>
    )
}


