import {useState, useCallback} from 'react'
import JSONArray from '../public/csvjson(1).json'
import JSONMap from '../public/csvjson.json'

function input() {
    function search(formData: FormData) {
        const inputValue = formData.get('inputName')?.toString().toLowerCase();

        if(inputValue) {
            const matches = Object.keys(JSONMap).filter(key => key.toLowerCase().match(inputValue));
            matches.forEach(match => console.log(match));

            localStorage.setItem('guesses', JSON.stringify(matches));
        }
    }

    return (
        <form action={search}>
            <input type="text" name="inputName" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default input;