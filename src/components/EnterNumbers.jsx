import { useState, useRef, useEffect } from "react";
import TreeNode from "./TreeNode";

// Enter numbers into a box, then send that list of numbers to the API

function EnterNumbers() {
	const [numberArray, setNumberArray] = useState(["Empty"]);

	const [currentNumber, setCurrentNumber] = useState("");

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
				setErrorMessage(() => {
					return { type: "empty", message: "" };
				});
			}, 10000);
		}
	}, [errorMessage]);

	const tree = useRef(null);

	useEffect(() => {
		!root
			? null
			: (tree.current.innerHTML = `<p>Tree Height: ${root.treeHeight}</p>
		<p>Input Numbers:</p><p>${root.inputNumbers.map((value) => {
			return " " + value;
		})}</p>
		<h3>Tree:</h3>`);
	}, [root]);

	const handleNumberChange = (event) => {
		setCurrentNumber(() => event.target.value);
	};

	const handleNumberSubmit = (event) => {
		event.preventDefault();
		if (isNaN(currentNumber)) {
			setErrorMessage(() => {
				return {
					type: "error",
					message: "ERR: Not A Number.",
				};
			});
		} else {
			setErrorMessage(() => {
				return { type: "empty", message: "" };
			});
			if (numberArray[0] === "Empty") {
				setNumberArray(() => [parseFloat(currentNumber)]);
			} else {
				setNumberArray((previous) =>
					previous.concat(parseFloat(currentNumber))
				);
			}
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
				setErrorMessage(() => {
					return {
						type: "error",
						message: "ERR: " + error,
					};
				})
			);
		console.log(root);
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
				setErrorMessage(() => {
					return {
						type: "error",
						message: "ERR: " + error,
					};
				})
			);
	};

	const handleArrayReset = (event) => {
		event.preventDefault();
		setNumberArray(() => {
			return ["Empty"];
		});
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
				<button type="submit">Submit Number</button>
			</form>
			<p>Current numbers:</p>
			<p>
				{numberArray.map((value) => {
					return value + ", ";
				})}
			</p>
			<form onSubmit={handleArraySubmit}>
				<button type="submit">Create Binary Search Tree</button>
			</form>
			<form onSubmit={handleArraySubmitBalance}>
				<button type="submit">Create Balanced Binary Search Tree</button>
			</form>
			<form onReset={handleArrayReset}>
				<button type="reset">Reset Numbers</button>
			</form>
			<div className="treebox" ref={tree}></div>
			{!root ? null : <TreeNode node={root.rootNode} />}
		</main>
	);
}

export default EnterNumbers;
