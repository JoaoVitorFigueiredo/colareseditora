import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom"
export function Filter(){
    const location = useLocation()

    const navigate = useNavigate()

    const [selectedOption, setOrderOption] = useState("score&order=desc");
    const [filterOption, setFilterOption] = useState("authors")
    const [filterString, setFilterString] = useState("")


    useEffect(() => {
        navigate(`${location.pathname}?selectedOption=${selectedOption}&filterOption=${filterOption}&filterString=${filterString}&per_page=10&page=1`)
    },[selectedOption,filterOption,filterString]);

    const updateFilter = (e) => {
            setFilterString(e.target.value);
        };

    const updateFilterOption = (e) => {
            setFilterOption(e.target.value)
        }
    const updateSort = (e) => {
        setOrderOption(e.target.value);
    }

    return (
        <div>
            <select id="dropdown" value={selectedOption} onChange={updateSort}>
                <option value="score&order=desc">Classificação ↓</option>
                <option value="score&order=asc">Classificação ↑</option>
                <option value="price&order=asc">Preço ↑</option>
                <option value="price&order=desc">Preço ↓</option>
            </select>
            <input value={filterString} onChange={updateFilter}/>
            <select id="dropdown" value={filterOption} onChange={updateFilterOption}>
                <option value="authors">Autor</option>
                <option value="categories">Categoria</option>
                <option value="title">Título</option>
            </select>
        </div>
    )
}