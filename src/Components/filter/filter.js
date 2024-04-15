import React, {useState, useEffect} from "react";
import Select from "react-select"

export function Filter({selectBooks}){

    const [selectedOption, setOrderOption] = useState('');
    const [filterAuthor, setFilterAuthor] = useState("")
    const [filterCategory, setFilterCategory] = useState("")


    useEffect(() => {
        selectBooks(selectedOption,filterAuthor,filterCategory)
    },[selectedOption,filterAuthor,filterCategory]);

    const updateCategory = (e) => {
            setFilterCategory(e.target.value);
        };

    const updateAuthor = (e) => {
            setFilterAuthor(e.target.value)
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
                <option value="-price">Classificação ↓</option>
            </select>
            <Select options={[3,4]} value={filterAuthor} onChange={updateAuthor}/>
            <Select options={[1,2]} value={filterCategory} onChange={updateCategory}/>
        </div>
    )
}







