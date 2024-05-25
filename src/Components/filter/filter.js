import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom"
import "./filter.css";

export function Filter(){
    const location = useLocation()

    const navigate = useNavigate()

    const [selectedOption, setOrderOption] = useState("score&order=-1");
    const [filterOption, setFilterOption] = useState("author")
    const [filterString, setFilterString] = useState("")


    useEffect(() => {
        navigate(`${location.pathname}?selectedOption=${selectedOption}&filterOption=${filterOption}&filterString=${filterString}&page=1`)
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
          <select
            id="sort-dropdown"
            value={selectedOption}
            onChange={updateSort}
          >
            <option value="score&order=-1">Classificação ↓</option>
            <option value="score&order=1">Classificação ↑</option>
            <option value="price&order=1">Preço ↑</option>
            <option value="price&order=-1">Preço ↓</option>
          </select>
          <input
            className="filter-input"
            value={filterString}
            onChange={updateFilter}
          />
          <select
            id="filter-dropdown"
            value={filterOption}
            onChange={updateFilterOption}
          >
            <option value="author">Autor</option>
            <option value="categories">Categoria</option>
            <option value="title">Título</option>
          </select>
        </div>
      );
    }