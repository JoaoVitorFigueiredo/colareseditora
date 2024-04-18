import React from 'react';
import './notfound.css';
import notfoundimage from '../../assets/notfound.png';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <img src={notfoundimage} alt="Página não encontrada" className="image" /> {/* Adiciona a imagem com a classe CSS image */}
      <h1 className="title">Erro 404 - Not Found</h1>
      <p className="message">Pedimos desculpa, mas esta página não existe.</p>
    </div>
  );
};