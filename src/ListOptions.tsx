import JSONArray from '../public/csvjson.json'

interface Prop {
    options: number[];
    sendGuess: (match: number) => void;
};

function ListOptions({ options, sendGuess }: Prop) {
    function onclickfunction(index: number) {
        sendGuess(index);
    }

    if(options.length == 0) {
        return (<span></span>);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Weapon</th>
                    <th>Type</th>
                    <th>Damage</th>
                    <th>Critical Boost</th>
                    <th>Scaling</th>
                    <th>Weight</th>
                    <th>Upgrade Material</th>
                </tr>
            </thead>
            <tbody>
                {options.map((option, index) => (
                    <tr key={index} onClick={() => onclickfunction(option)} className='hoverAnim'>
                        <td>Picture</td>
                        <td>{JSONArray.at(option)!!.Name}</td>
                        <td>{JSONArray.at(option)!!.Type}</td>
                        <td>{JSONArray.at(option)!!.Name}</td>
                        <td>{JSONArray.at(option)!!.Cri}</td>
                        <td>{JSONArray.at(option)!!.Name}</td>
                        <td>{JSONArray.at(option)!!.Wgt}</td>
                        <td>{JSONArray.at(option)!!.Upgrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListOptions;