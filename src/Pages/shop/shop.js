import React, {useEffect, useState} from "react";
import {BookThumbnail} from "../../Components/book-thumbnail";
import {Filter} from "../../Components/filter/filter"

export function Shop(){
    const [books, setBooks] = useState([]);

    async function selectBooks(selectedOption,filterString,filterOption){
        try {
            const response = await fetch(`http://localhost:3030/books?_sort=${selectedOption}`,{method:"GET"})
            let booksData = await response.json();
            if (filterOption === "author"){
                booksData = booksData.filter(book => book.authors.some(author => author.toLowerCase().includes(filterString.toLowerCase())))
                console.log(booksData)
            }
            else{
                booksData = booksData.filter(book => book.categories.some(category => category.toLowerCase().includes(filterString.toLowerCase())))
            }
            setBooks(booksData)
        }
        catch (error) {
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