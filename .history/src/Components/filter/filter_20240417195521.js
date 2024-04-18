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
<div className="filter-container">
  <select id="sort-dropdown" value={selectedOption} onChange={updateSort}>
    {/* Opções de ordenação */}
  </select>
  <input className="filter-input" value={filterString} onChange={updateFilter} />
  <select id="filter-dropdown" value={filterOption} onChange={updateFilterOption}>
    {/* Opções de filtro */}
  </select>
</div>
    )
}