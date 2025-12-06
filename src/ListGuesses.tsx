interface Props{
    guesses: string[];
};

function ListGuesses({guesses}: Props) {
    return (
        <tbody>
            {guesses.map((guess) => (
                <tr>
                    <td>a</td>
                    <td>{guess}</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                </tr>
            ))}
        </tbody>
    );
}

export default ListGuesses;