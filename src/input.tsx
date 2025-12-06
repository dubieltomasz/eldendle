import {useState, useCallback} from 'react'
import JSONArray from '../public/csvjson(1).json'
import JSONMap from '../public/csvjson.json'

interface Props{
    onSubmit: (match: string[]) => void;
};

function input({onSubmit}: Props) {
    const [inputName, setInputName] = useState<string>("");

    function search(event: React.FormEvent) {
        event.preventDefault();

        const inputValue = inputName.trim().toLowerCase();

        if(inputValue) {
            const matches = Object.keys(JSONMap).filter(key => key.toLowerCase().match(inputValue));
            matches.forEach(match => console.log(match));

            localStorage.setItem('guesses', JSON.stringify(matches));
            onSubmit(matches);
        }
    }

    return (
        <form onSubmit={search}>
            <input
                type="text"
                name="inputName"
                value={inputName}
                onChange={that => setInputName(that.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default input;