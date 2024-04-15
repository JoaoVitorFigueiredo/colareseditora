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

    if (loading) return <div>A procurar...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!book) return <div>Nenhum livro encontrado.</div>;

    let priceDisplay;
    if (book.price) {
        priceDisplay = `${book.price}€`;
    } else {
        priceDisplay = "Preço sob consulta.";
    }

    return (
        <div className="page">
            <div className="book-details">
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="authors">{book.authors.join(", ")}</p>
                    <p className="description">{book.shortDescription}</p>
                    <p><strong>ID:</strong> {book.id}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Páginas:</strong> {book.pageCount}</p>
                    <p><strong>Data de Publicação:</strong> {new Date(book.publishedDate.$date).toLocaleDateString()}</p>
                    <p><strong>Categorias:</strong> {book.categories.join(", ")}</p>
                </div>
                <img alt={book.title} src={book.thumbnailUrl}></img>
            </div>
            <div className="book-description">
                <h3>Descrição</h3>
                <p>{book.longDescription}</p>
            </div>
            <div className="book-actions">
                <p>Estado: {book.status}</p>
                <p>Preço: {priceDisplay}</p>
                <button>Comprar agora!</button>
            </div>
        </div>
    );
}
