import JSONArray from '../public/weaponData.json'

interface Prop {
    guesses: number[];
    todaysEldendle: number;
};

function ListGuesses({guesses, todaysEldendle}: Prop) {
    return (
        <tbody>
            {[...guesses].reverse().map((guess, index) => (
                <tr key={index}>
                    <td>Picture</td>
                    <td className={guess === todaysEldendle ? "good" : "veryWrong"}>{JSONArray.at(guess)!!.Name}</td>
                    <td className={JSONArray.at(guess)!!.Type === JSONArray.at(todaysEldendle)!!.Type ? "good" : "veryWrong"}>{JSONArray.at(guess)!!.Type}</td>
                    <td>
                        {JSONArray.at(guess)!!.Phy != "-" ? <p>Phy {JSONArray.at(guess)!!.Phy}</p> : ""}
                        {JSONArray.at(guess)!!.Mag != "-" ? <p>Mag {JSONArray.at(guess)!!.Mag}</p> : ""}
                        {JSONArray.at(guess)!!.Fir != "-" ? <p>Fir {JSONArray.at(guess)!!.Fir}</p> : ""}
                        {JSONArray.at(guess)!!.Lit != "-" ? <p>Lit {JSONArray.at(guess)!!.Lit}</p> : ""}
                        {JSONArray.at(guess)!!.Hol != "-" ? <p>Hol {JSONArray.at(guess)!!.Hol}</p> : ""}
                    </td>
                    <td className={JSONArray.at(guess)!!.Cri === JSONArray.at(todaysEldendle)!!.Cri ? "good" : "veryWrong"}>
                        {JSONArray.at(guess)!!.Cri}{JSONArray.at(todaysEldendle)!!.Cri - JSONArray.at(guess)!!.Cri > 0 ? '^' : 'v'}
                    </td>
                    <td>
                        {JSONArray.at(guess)!!.Str != "-" ? <p>Str {JSONArray.at(guess)!!.Str}</p> : ""}
                        {JSONArray.at(guess)!!.Dex != "-" ? <p>Dex {JSONArray.at(guess)!!.Dex}</p> : ""}
                        {JSONArray.at(guess)!!.Int != "-" ? <p>Int {JSONArray.at(guess)!!.Int}</p> : ""}
                        {JSONArray.at(guess)!!.Fai != "-" ? <p>Fai {JSONArray.at(guess)!!.Fai}</p> : ""}
                        {JSONArray.at(guess)!!.Arc != "-" ? <p>Arc {JSONArray.at(guess)!!.Arc}</p> : ""}
                    </td>
                    <td className={JSONArray.at(guess)!!.Wgt === JSONArray.at(todaysEldendle)!!.Wgt ? "good" : "veryWrong"}>
                        {JSONArray.at(guess)!!.Wgt}{JSONArray.at(todaysEldendle)!!.Wgt - JSONArray.at(guess)!!.Wgt > 0 ? '^' : 'v'}
                    </td>
                    <td className={JSONArray.at(guess)!!.Upgrade === JSONArray.at(todaysEldendle)!!.Upgrade ? "good" : "veryWrong"}>{JSONArray.at(guess)!!.Upgrade}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default ListGuesses;