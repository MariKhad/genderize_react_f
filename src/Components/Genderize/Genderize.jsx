import { useState } from "react";
import { URL_GENDERIZE, URL_NATIONALIAZE } from "../../const/url";
import { ResultDiv } from "./ResultDiv/ResultDiv";

export const Genderize = () => {
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [country, setCountry] = useState('');
	const [result, setResult] = useState('Here will be the result');
	const handleChange = (e) => {
		setName(e.target.value)
	}

	const fetchDetails = async () => {
		const url1 = `${URL_GENDERIZE}?name=${name}`;
		const url2 = `${URL_NATIONALIAZE}?name=${name}`;

		Promise.all([
			await fetch(url1),
			await fetch(url2),
		])
			.then(async ([json1, json2]) => {
				const data1 = await json1.json();
				const data2 = await json2.json();
				setGender(data1.gender);
				setCountry(data2.country[0].country_id);
			})
			.catch(err => alert(err))
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name.length > 2) {
			await fetchDetails();
			setResult(`${name} is ${gender} from ${country}`);
			setName('');
			setCountry('');
			setGender('');
		} else {
			setResult('The name is too short')
		}
	}

	return (
		<div className="container">
			<div className="task__body">
				<h1>Determination of gender and country by name</h1>
				<form className="form" onSubmit={handleSubmit} >
					<p>
						<input className="input" value={name} placeholder="Insert the name in English" onChange={handleChange} />
						<button>Send</button>
					</p>
				</form>
				<ResultDiv result={result} />
			</div>
		</div>
	)
}
