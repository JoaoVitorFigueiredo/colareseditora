import React, { useContext } from "react";
import { CartContext } from "../../App";
import { Link } from "react-router-dom";
import NoImage from "../../assets/book-noimage.png";
import "./cart.css"; 

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addBook = (book) => {
    setCart((prevCart) => ({
      ...prevCart,
      books: prevCart.books.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ),
      total: prevCart.total + book.price,
      volume: prevCart.volume + 1,
    }));
  };

  const subtractBook = (book) => {
    setCart((prevCart) => ({
      ...prevCart,
      books: prevCart.books.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
      ),
      total: prevCart.total - book.price,
      volume: prevCart.volume - 1,
    }));
    setCart((prevCart) => ({
      ...prevCart,
      books: prevCart.books.filter((item) => item.quantity > 0),
    }));
  };

  const removeBook = (book) => {
    setCart((prevCart) => ({
      ...prevCart,
      total: prevCart.total - book.price * book.quantity,
      volume: prevCart.volume - book.quantity,
    }));
    setCart((prevCart) => ({
      ...prevCart,
      books: prevCart.books.filter((item) => item.id !== book.id),
    }));
  };

  if (cart.volume > 0) {
    return (
      <div className="cart-container">
        <div className="cart-items">
          {cart.books.map((book) => (
            <div className="book-item" key={book.id}>
              {book.thumbnailUrl ? (
                <Link to={`/book/${book.id}`}>
                  <img
                    className="thumbnail-image"
                    src={book.thumbnailUrl}
                    alt={book.title}
                  />
                </Link>
              ) : (
                <div className="thumbnail-placeholder">
                  <img
                    className="thumbnail-image"
                    src={NoImage}
                    alt={book.title}
                  />
                </div>
              )}

              <div className="book-details">
                <p className="book-title">AAAA {book.pageCount}</p>
	@@ -104,4 +66,35 @@ export const Cart = () => {
      </div>
    );
  }
};