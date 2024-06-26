import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {CartContext} from "../../App"
import "./book-page.css";
import {addCartUtil} from "../../Utils/CartUtils"
import NoImage from '../../assets/book-noimage.png';

import endpoint from "../../assets/endpoint.json"

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
            const response = await fetch(`${endpoint.url}books/${id}`);
            if (!response.ok) {
                throw new Error('Resposta não sucedida do servidor');
            }
            const bookData = await response.json();
            setBook(bookData);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const [addedToCart, setAddedToCart] = useState(false)

    async function addCart(){
        addCartUtil(cartContext, book)
        setAddedToCart(true)
        await new Promise(resolve => setTimeout(resolve,2000))
        setAddedToCart(false)
    }

    if (loading) return <div>A procurar...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!book) return <div>Nenhum livro encontrado.</div>;

    let priceDisplay;
    let homedelivery;
    let storepickup;
    let button;
    if (book.price) {
        priceDisplay = `${book.price}€`;
        homedelivery = "Previsão de chegada em casa: 2 dias úteis.";
        storepickup = "Entrega em loja disponível.";
        if (addedToCart){
            button = <button><strong>ADICIONADO AO CARRINHO</strong> <i className="fas fa-check"/></button>;
        }else {
            button = <button onClick={addCart}><strong>ADICIONAR AO CARRINHO</strong> <i className="fas fa-shopping-cart"/></button>;
        }
    } else {
        priceDisplay = "Indisponível.";
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

            <img className="thumbnail-image" src={book.thumbnailUrl || NoImage} alt={book.title} onError={(e) => { if (e.target.src !== NoImage) e.target.src = NoImage; }}/>
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="authors">{book.authors.join(", ")}</p>
                    <p className="description">{book.shortDescription}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Páginas:</strong> {book.pageCount}</p>
                    <p><strong>Data de Publicação:</strong> {new Date(book.publishedDate.$date).toLocaleDateString()}</p>
                    <p><strong>Categorias:</strong> {book.categories.join(", ")}</p>
                </div>
                <div className="toggle-description" onClick={toggleDescription}>
                    {descriptionExpanded ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
                </div>
                <div className="book-description" style={{ display: descriptionExpanded ? 'block' : 'none' }}>
                    <h3>Está interessado? Explore mais sobre o livro!</h3>
                    {bookDescription
            }
                </div>
            </div>
            <div class="additional-info">
                <p><strong>{priceDisplay}</strong></p>
                <div class="arrival-info">
                    <p><i class="fa-solid fa-circle-check"></i> {homedelivery}</p>
                    <p><i class="fa-solid fa-circle-check"></i> {storepickup}</p>
                </div>
                {button}
            </div>

        </div>
    );
}
