import React from "react";
import { Link } from "react-router-dom";
import "./pageNav.css"; // Importando o arquivo CSS para aplicar estilos

export function PageNav(props) {
  const currentPage = parseInt(props.currentPage);
  const currentParams = props.currentParams;
  const pageNumber = parseInt(props.pageNumber);
  const currentPath = props.currentPath;
  const path = currentPath + currentParams;

  let prevPage;
  let prev2Page;
  let nextPage;
  let next2Page;

  if (currentPage - 1 > 0) {
    prevPage = currentPage - 1;
    if (prevPage - 1 > 0) {
      prev2Page = currentPage - 2;
    }
  }

  if (currentPage + 1 <= pageNumber) {
    nextPage = currentPage + 1;
    if (nextPage + 1 <= pageNumber) {
      next2Page = currentPage + 2;
    }
  }

  function PrevPageButton() {
    if (prevPage) {
      return (
        <Link
          to={path.replaceAll(`page=${currentPage}`, `page=${prevPage}`)}
          className="nav-link"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      );
    }
  }
  function NextPageButton() {
    if (nextPage) {
      return (
        <Link
          to={path.replaceAll(`page=${currentPage}`, `page=${nextPage}`)}
          className="nav-link"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      );
    }
  }

  function PrevPages() {
    if (prevPage) {
      if (prev2Page) {
        return (
          <div className="page-numbers">
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${prev2Page}`)}
              className="nav-link"
            >
              {prev2Page}
            </Link>
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${prevPage}`)}
              className="nav-link"
            >
              {prevPage}
            </Link>
          </div>
        );
      } else {
        return (
          <div className="page-numbers">
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${prevPage}`)}
              className="nav-link"
            >
              {prevPage}
            </Link>
          </div>
        );
      }
    } else {
      return null;
    }
  }
  
  function NextPages() {
    if (nextPage) {
      if (next2Page) {
        return (
          <div className="page-numbers">
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${nextPage}`)}
              className="nav-link"
            >
              {nextPage}
            </Link>
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${next2Page}`)}
              className="nav-link"
            >
              {next2Page}
            </Link>
          </div>
        );
      } else {
        return (
          <div className="page-numbers">
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${nextPage}`)}
              className="nav-link"
            >
              {nextPage}
            </Link>
          </div>
        );
      }
    } else {
      return null;
    }
  }
  

  return (
    <div className="page-nav">
      <PrevPageButton />
      {prev2Page > 1 ? <p>...</p> : null}
      <PrevPages />
      <strong>
  <Link
    to={path.replaceAll(`page=${currentPage}`, `page=${currentPage}`)}
    className={`nav-link ${currentPage === currentPage ? 'selected-page current-page' : ''}`}
        >
            {currentPage}
        </Link>
        </strong>
      <NextPages />
      {next2Page < pageNumber ? <p>...</p> : null}
      <NextPageButton />
    </div>
  );
}
