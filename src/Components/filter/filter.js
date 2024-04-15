import React, {useState, useEffect} from "react";
export function Filter({selectBooks}){
    const [selectedOption, setOrderOption] = useState("-");
    const [filterOption, setFilterOption] = useState("")
    const [filterString, setFilterString] = useState("")


    useEffect(() => {
        selectBooks(selectedOption,filterString,filterOption)
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
                <option value="-score">Classificação ↓</option>
                <option value="score">Classificação ↑</option>
                <option value="price">Preço ↑</option>
                <option value="-price">Preço ↓</option>
            </select>
            <input value={filterString} onChange={updateFilter}/>
            <select id="dropdown" value={filterOption} onChange={updateFilterOption}>
                <option value="author">Autor</option>
                <option value="category">Categoria</option>
            </select>
        </div>
    )
}







