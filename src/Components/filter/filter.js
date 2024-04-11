import {React, useState} from "react";
import { useHistory } from "react-router-dom";

export function Filter(){
    const [selectedOption, setOrderOption] = useState('');
    const [filterString, setFilterString] = useState("")
    const [filterOption, setFilterOption] = useState("")
    const handleFilterChange = (e) => {
            setFilterOption(e.target.value);
        };


    const updateFilter = (e) => {
            e.stopPropagation();
            setFilterString(e.target.value)
        }
    const handleSelectChange = (e) => {
        setOrderOption(e.target.value);
    }



    return (
        <div>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                <option value="ClasDesc">Classificação ↓</option>
                <option value="ClassAsc">Classificação ↑</option>
                <option value="PriceAsc">Preço ↑</option>
                <option value="PriceDesc">Classificação ↓</option>
            </select>
            <input value={filterString} onChange={updateFilter}/>
            <select id="dropdown" value={filterOption} onChange={handleFilterChange}>
                <option value="Autor">Autor</option>
                <option value="Categoria">Categoria</option>

            </select>
        </div>
    )
}



