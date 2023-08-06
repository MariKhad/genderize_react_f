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
		await fetch(url1)
			.then(response => response.json())
			.then(result1 => {
				setGender(result1.gender)
				fetch(url2)
					.then(response => response.json())
					.then(result2 => {
						setCountry(result2.country[0].country_id)
					})
			})
			.catch(err => alert(err));
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.length > 2) {
			fetchDetails();
			setResult(`${name} is ${gender} from ${country}`);
		} else {
			setResult('The name is too short')
		}
	}

	const finalResult = () => result;

	return (
		<div className="container">
			<div className="task__body">
				<h1>Determination of gender and country by name</h1>
				<form className="form" onSubmit={handleSubmit} >
					<p>
						<input className="input" placeholder="Insert the name" onChange={handleChange} />
						<button>Send</button>
					</p>
				</form>
				<ResultDiv result={finalResult} />
			</div>
		</div>
	)
}
