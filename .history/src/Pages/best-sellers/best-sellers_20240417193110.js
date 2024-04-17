import React, {useState, useEffect} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";

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
        {/* Aqui você pode colocar outros conteúdos da página, como cabeçalhos, menus, etc. */}
        <h1>Minha Página Inicial</h1>
        {/* Renderizando o componente BookLibrary */}
        <BookLibrary />
        </div>
        <div>
            {books.map(book => <BookThumbnail book={book}/>)}
        </div>
    )
}


