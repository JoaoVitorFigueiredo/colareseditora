function PrevPages() {
    if (prevPage) {
      if (prev2Page) {
        return (
          <div className="page-numbers">
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${prev2Page}`)}
              className={`nav-link ${prev2Page === currentPage ? 'selected-page' : ''}`}
            >
              {prev2Page}
            </Link>
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${prevPage}`)}
              className={`nav-link ${prevPage === currentPage ? 'selected-page' : ''}`}
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
              className={`nav-link ${prevPage === currentPage ? 'selected-page' : ''}`}
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
              className={`nav-link ${nextPage === currentPage ? 'selected-page' : ''}`}
            >
              {nextPage}
            </Link>
            <Link
              to={path.replaceAll(`page=${currentPage}`, `page=${next2Page}`)}
              className={`nav-link ${next2Page === currentPage ? 'selected-page' : ''}`}
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
              className={`nav-link ${nextPage === currentPage ? 'selected-page' : ''}`}
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
  