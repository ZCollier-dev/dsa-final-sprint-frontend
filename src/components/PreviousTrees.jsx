import { useState, useRef, useEffect } from "react";
import TreeNode from "./TreeNode";

// Get trees from API

function PreviousTrees() {
	const [trees, setTrees] = useState([]);

	const [errorMessage, setErrorMessage] = useState({
		type: "empty",
		message: "",
	});

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

	useEffect(() => {
		//Get all trees from the API
		fetch("http://localhost:8080/binary-search-tree", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => {
				setTrees(data);
			})
			.catch((error) =>
				setErrorMessage(() => {
					return {
						type: "error",
						message: "ERR: " + error,
					};
				})
			);
	}, []);

	return (
		<main>
			<h2>Previous Trees</h2>
			<p>These trees are from all prior uses of this app.</p>
			<div className="alertbox" ref={alert}></div>
			<div className="treebox">
				{trees.length === 0 ? (
					<p>Loading trees...</p>
				) : (
					trees.map((tree, i) => (
						<div key={tree.id || i}>
							<p>Tree Height: {tree.treeHeight}</p>
							<p>Input Numbers: {tree.inputNumbers.join(", ")}</p>
							<h3>Tree:</h3>
							<div className="tree">
								<TreeNode node={tree.rootNode} />
							</div>
						</div>
					))
				)}
			</div>
		</main>
	);
}

export default PreviousTrees;
