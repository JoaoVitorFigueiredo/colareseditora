import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {CartContext} from "../../App"
import "./book-page.css";
import {addCartUtil} from "../../Utils/CartUtils";

export function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false); // Estado para controlar a expansão da descrição

    const cartContext = useContext(CartContext)

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

    function addCart(){
        addCartUtil(cartContext, book)
    }

    if (loading) return <div>A procurar...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!book) return <div>Nenhum livro encontrado.</div>;

    let priceDisplay;
    let homedelivery;
    let storepickup;
    let button;
    if (book.price) {
        priceDisplay = `${book.price},00€`;
        homedelivery = "Previsão de chegada em casa: 2-3 dias úteis.";
        storepickup = "Entrega em loja disponível.";
        button = <button onClick={addCart}><strong>ADICIONAR AO CARRINHO</strong><i className="fas fa-shopping-cart"/></button>;
    } else {
        priceDisplay = "Preço sob consulta.";
        homedelivery = "Não existe previsão de chegada para este livro.";
        storepickup = "Entrega em loja indisponível.";
    }
    let bookDescription;
    if (book.longDescription){
        bookDescription = <p>{book.longDescription}</p>
    }
    else {
        bookDescription = <p>A descrição para este livro está indisponível. Contacte-nos se desejar mais informações sobre a obra.</p>
    }
    // Função para alternar a expansão da descrição
    const toggleDescription = () => {
        setDescriptionExpanded(!descriptionExpanded);
    };

    return (
        <div className="page">
            <div className="book-details">
            <img alt={book.title} src={book.thumbnailUrl}></img>
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="authors">{book.authors.join(", ")}</p>
                    <p className="description">{book.shortDescription}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Páginas:</strong> {book.pageCount}</p>
                    <p><strong>Data de Publicação:</strong> {new Date(book.publishedDate.$date).toLocaleDateString()}</p>
                    <p><strong>Categorias:</strong> {book.categories.join(", ")}</p>
                </div>
            </div>
            <div className="book-description" style={{ display: descriptionExpanded ? 'block' : 'none' }}>
                <h3>Está interessado? Explore mais sobre o livro!</h3>
                {bookDescription}
            </div>
            <div className="toggle-description" onClick={toggleDescription}>
                {descriptionExpanded ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
            </div>
            <div class="additional-info">
                <p><strong>{priceDisplay}</strong></p>
            <div class="arrival-info">
                <p><i class="fa-solid fa-circle-check"></i> Previsão de chegada em casa: 2-3 dias úteis</p>
                <p><i class="fa-solid fa-circle-check"></i> Entrega em loja disponível</p>
            </div>
                {button}
            </div>
        </div>
    );
}
