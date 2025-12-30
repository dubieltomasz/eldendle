import JSONArray from '../public/weaponData.json'

interface Prop {
    options: number[];
    sendGuess: (match: number) => void;
};

function ListOptions({ options, sendGuess }: Prop) {
    function onclickfunction(index: number) {
        sendGuess(index);
    }

    if (options.length == 0) {
        return (<span></span>);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Weapon</th>
                    <th>Type</th>
                    <th>Damage Type</th>
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
                        <td>
                            {JSONArray.at(option)!!.Phy != "-" ? <p>Phy {JSONArray.at(option)!!.Phy}</p> : ""}
                            {JSONArray.at(option)!!.Mag != "-" ? <p>Mag {JSONArray.at(option)!!.Mag}</p> : ""}
                            {JSONArray.at(option)!!.Fir != "-" ? <p>Fir {JSONArray.at(option)!!.Fir}</p> : ""}
                            {JSONArray.at(option)!!.Lit != "-" ? <p>Lit {JSONArray.at(option)!!.Lit}</p> : ""}
                            {JSONArray.at(option)!!.Hol != "-" ? <p>Hol {JSONArray.at(option)!!.Hol}</p> : ""}
                        </td>
                        <td>{JSONArray.at(option)!!.Cri}</td>
                        <td>
                            {JSONArray.at(option)!!.Str != "-" ? <p>Str {JSONArray.at(option)!!.Str}</p> : ""}
                            {JSONArray.at(option)!!.Dex != "-" ? <p>Dex {JSONArray.at(option)!!.Dex}</p> : ""}
                            {JSONArray.at(option)!!.Int != "-" ? <p>Int {JSONArray.at(option)!!.Int}</p> : ""}
                            {JSONArray.at(option)!!.Fai != "-" ? <p>Fai {JSONArray.at(option)!!.Fai}</p> : ""}
                            {JSONArray.at(option)!!.Arc != "-" ? <p>Arc {JSONArray.at(option)!!.Arc}</p> : ""}
                        </td>
                        <td>{JSONArray.at(option)!!.Wgt}</td>
                        <td>{JSONArray.at(option)!!.Upgrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListOptions;