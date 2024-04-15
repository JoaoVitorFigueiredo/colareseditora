import React, {useState} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {Filter} from "../../Components/filter/filter"

export function Shop(){
    const [books, setBooks] = useState([]);

    async function selectBooks(selectedOption,filterAuthor,filterCategory){
        try {
            const response = await fetch(`http://localhost:3030/books/_sort=${selectedOption}`,{method:"GET"})
            const booksData = await response.json();
            setBooks(booksData)
        }
        catch (error){
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