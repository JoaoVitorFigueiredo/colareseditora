import React from "react";
import {Link} from "react-router-dom";

export function PageNav(){
    const currentPage = currentPage
    const currentPath = currentPath
    const pageNumber = pageNumber
    let prevPage;
    let prev2Page
    let nextPage
    let next2Page

    if (currentPage-1 > 0){
        prevPage = currentPage - 1
        if (prevPage-1 > 0){
            prev2Page = currentPage - 2
        }
    }

    if (currentPage + 1 <= pageNumber){
        nextPage= currentPage + 1
        if(nextPage+1 <= pageNumber){
            next2Page = currentPage + 2
        }
    }

    function PrevPageButton(){
        if (prev2Page > 0){
            return <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${prevPage}`)}>icon pra voltar</Link>
        }
    }
    function NextPageButton(){
        if (prev2Page > 0){
            return <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${nextPage}`)}>icon pra avançar</Link>
        }
    }

    function PrevPages(){
        if (prevPage){
            if (prev2Page) {
                return (
                    <div>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${prev2Page}`)}>{prev2Page}</Link>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${prevPage}`)}>{prevPage}</Link>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${prevPage}`)}>{prevPage}</Link>
                    </div>
                )
            }
        }
    }
    function NextPages(){
        if (nextPage){
            if (next2Page) {
                return (
                    <div>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${next2Page}`)}>{next2Page}</Link>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${nextPage}`)}>{nextPage}</Link>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Link to={currentPath.replaceAll(`_page=${currentPage}`,`_page=${nextPage}`)}>{nextPage}</Link>
                    </div>
                )
            }
        }
    }


    return (
        <div>
            <PrevPageButton/>
            {prev2Page > 1 ? <p>...</p>:prev2Page}
            <PrevPages/>
            <strong>{currentPage}</strong>
            <NextPages/>
            {next2Page < pageNumber ? <p>...</p>:next2Page}
            <NextPageButton/>
        </div>
    )

}