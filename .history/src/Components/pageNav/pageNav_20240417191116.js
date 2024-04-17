import React from "react";
import {Link} from "react-router-dom";

export function PageNav(props){
    const currentPage = parseInt(props.currentPage)
    const currentParams = props.currentParams
    const pageNumber = parseInt(props.pageNumber)
    const currentPath = props.currentPath
    const path = currentPath+currentParams

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
        if (prevPage){
            return <Link to={path.replaceAll(`page=${currentPage}`,`page=${prevPage}`)}>icon pra voltar</Link>
        }
    }
    function NextPageButton(){
        if (nextPage){
            return <Link to={path.replaceAll(`page=${currentPage}`,`page=${nextPage}`)}>icon pra avançar</Link>
        }
    }

    function PrevPages(){
        if (prevPage){
            if (prev2Page) {
                return (
                    <div>
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${prev2Page}`)}>{prev2Page}</Link>
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${prevPage}`)}>{prevPage}</Link>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${prevPage}`)}>{prevPage}</Link>
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
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${nextPage}`)}>{nextPage}</Link>
                        <p></p>
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${next2Page}`)}>{next2Page}</Link>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Link to={path.replaceAll(`page=${currentPage}`,`page=${nextPage}`)}>{nextPage}</Link>
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