import './Input.css';

interface Prop {
    search: (match: string) => void;
};

function input({ search }: Prop) {
    function onChange(input: string) {
        let inputValue: string = input.trim().toLowerCase();

        if (inputValue === '') {
            inputValue = 'XXX';
        }

        search(inputValue);
    }

    return (
        <input
            type='text'
            name='inputName'
            onChange={that => {
                onChange(that.target.value);
            }}
        />
    );
};

export default input;