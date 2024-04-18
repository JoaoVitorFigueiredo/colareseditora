import React from 'react';
import './notfound.css';
import notfoundimage from '../../assets/notfound.png';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <img src={notfoundimage} alt="Página não encontrada" className="image"/> 
      <h1 className="title">Erro 404 - Not Found</h1>
      <p className="message">Pedimos desculpa, mas acabaste de encontrar o livro perdido.</p>
    </div>
  );
};