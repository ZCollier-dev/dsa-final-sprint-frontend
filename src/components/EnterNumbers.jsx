import { useState, useRef, useEffect } from "react";

// Enter numbers into a box, then send that list of numbers to the API

function EnterNumbers() {
	const [numberArray, setNumberArray] = useState([]);

	const [currentNumber, setCurrentNumber] = useState();

	const [errorMessage, setErrorMessage] = useState({
		type: "empty",
		message: "",
	});

	const [root, setRoot] = useState(null);

	const alert = useRef(null);

	useEffect(() => {
		alert.current.innerHTML = `<p>${errorMessage.message}</p>`;
		if (errorMessage.type === "empty") {
			alert.current.style.background = "rgba(0,0,0,0)";
		} else if (errorMessage.type === "error") {
			alert.current.style.background = "red";
		} else {
			alert.current.style.background = "green";
		}

		if (errorMessage.type != "empty") {
			setTimeout(() => {
				setErrorMessage({ type: "empty", message: "" });
			}, 5000);
		}
	}, [errorMessage]);

	const tree = useRef(null);

	useEffect(() => {
		tree.current.innerHTML = `<p>${root}</p>`;
	}, [root]);

	const handleNumberChange = (event) => {
		event.preventDefault();
		setCurrentNumber(event.target.value);
	};

	const handleNumberSubmit = (event) => {
		event.preventDefault();
		if (isNaN(currentNumber)) {
			setErrorMessage({
				type: "error",
				message: "ERR: Not A Number.",
			});
		} else {
			setErrorMessage({
				type: "empty",
				message: "",
			});
			setNumberArray(numberArray.push(currentNumber));
		}
	};

	const handleArraySubmit = (event) => {
		event.preventDefault();
		//Send the list to the API
		fetch("http://localhost:8080/binary-search-tree/process-numbers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(numberArray),
		})
			.then((response) => response.json())
			.then((data) => setRoot(data))
			.catch((error) =>
				setErrorMessage({
					type: "error",
					message: "ERR: " + error,
				})
			);
	};

	const handleArraySubmitBalance = (event) => {
		event.preventDefault();
		//Send the list to the API
		fetch("http://localhost:8080/binary-search-tree/process-numbers/balance", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(numberArray),
		})
			.then((response) => response.json())
			.then((data) => setRoot(data))
			.catch((error) =>
				setErrorMessage({
					type: "error",
					message: "ERR: " + error,
				})
			);
	};

	const handleArrayReset = (event) => {
		event.preventDefault();
		setNumberArray([]);
	};

	return (
		<main>
			<h2>Enter Numbers</h2>
			<p>
				Enter numbers into a box and press enter. They will show up on the list.
				Once you're happy with all the numbers, press submit.
			</p>
			<div className="alertbox" ref={alert}></div>
			<form onSubmit={handleNumberSubmit}>
				<label htmlFor="numberinput">Number Input: </label>
				<input
					type="number"
					id="numberinput"
					name="numberinput"
					value={currentNumber}
					onChange={handleNumberChange}
				/>
				<input type="submit" />
			</form>
			<p>
				Current numbers:
				{numberArray.map((number, index) => {
					return number + ", ";
				})}
			</p>
			<form onSubmit={handleArraySubmit}>
				<input type="submit" />
			</form>
			<form onSubmit={handleArraySubmitBalance}>
				<input type="submit" />
			</form>
			<form onReset={handleArrayReset}>
				<input type="reset" />
			</form>
			<div className="treebox" ref={tree}></div>
		</main>
	);
}

export default EnterNumbers;
