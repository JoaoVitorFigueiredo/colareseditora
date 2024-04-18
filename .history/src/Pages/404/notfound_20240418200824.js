import React from 'react';
import './NotFoundPage.css'; // Importa o arquivo CSS

export const NotFoundPage = () => {
  return (
    <div className="container"> {/* Usa a classe CSS container */}
      <h1 className="title">Erro 404 - Not Found</h1> {/* Usa a classe CSS title */}
      <p className="message">Pedimos desculpa, mas esta página não existe.</p> {/* Usa a classe CSS message */}
    </div>
  );
};
