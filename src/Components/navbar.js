import React, {useState} from "react";
import {Link} from "react-router-dom";

export function Navbar(){
    const [searchString, setSearchString] = useState('')
    function updateSearch(e){
        setSearchString(e.target.value)
    }

    return <div className="navbar">
        <div className="links">
            <input value={searchString} onChange={updateSearch}></input>
            <link to={`/search/${searchString}`}></link>
            <Link to="/"> Main Page (icon) </Link>
            <Link to="/shop"> Loja </Link>
            <Link to="/sales"> Promoções </Link>
            <Link className="Cart" to="/cart"> Carrinho (icon) </Link>
        </div>
    </div>
}