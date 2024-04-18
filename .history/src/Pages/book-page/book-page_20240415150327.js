import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./book-page.css"; 

export function BookPage() {
    let { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, [id]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:3030/books/?id=${id}`);
            if (!response.ok) {
                throw new Error('Resposta não sucedida do servidor');
            }
            const bookData = await response.json();
            setBook(bookData[0]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!book) return <div>Nenhum livro encontrado.</div>;

    return (
        <div className="page">
            <div className="book-details">
                <img alt={book.title} src={book.thumbnailUrl}></img>
                <div>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.shortDescription}</p>
                </div>
            </div>
            <div className="book-actions">
                <p>Status: {book.status}</p>
                <p>Preço: {book.price}€</p>
                <button>Comprar agora!</button>
            </div>
        </div>
    );
}
