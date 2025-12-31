import JSONArray from '../../public/weaponData.json';
import './Input.css';

interface Prop {
    search: (match: number[]) => void;
};

function input({ search }: Prop) {
    function onChangeFunction(inputValue: string) {
        const expression: string = inputValue.trim().toLowerCase();
        const matches: number[] = [];

        if (expression !== '') {
            JSONArray.forEach((record, index: number) => {
                if (record.Name.toLocaleLowerCase().match(expression)) {
                    matches.push(index);
                }
            })
        }

        search(matches);
    }

    return (
        <input
            type='text'
            name='inputName'
            onChange={that => {
                onChangeFunction(that.target.value);
            }}
        />
    );
};

export default input;