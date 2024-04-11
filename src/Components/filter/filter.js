import {React, useState} from "react";
import { Link } from "react-router-dom";

export function Filter(){
    const {filterParams, setParams} = useState("")
    function OrderDropdown() {
        const [selectedOption, setSelectedOption] = useState('');

        const handleSelectChange = (event) => {
            setSelectedOption(event.target.value);
        };

        return (
            <div>
                <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                    <option value="sort={},descs">Classificação ↓</option>
                    <option value="ClassificaçãoAsc">Classificação ↑</option>
                    <option value="PreçoAsc">Preço ↑</option>
                    <option value="PreçoDesc">Classificação ↓</option>
                </select>
            </div>
        );
    }

    function FilterInput() {
        const {filterString, updateFilter} = useState("")
        function updateSearch(e){
            updateFilter(e.target.value)
        }
        return(
        <input value={filterString} onChange={updateFilter}></input>
        )
    }

    return (
        <div>
            <OrderDropdown/>
            <FilterInput/>
        </div>
    )
}



