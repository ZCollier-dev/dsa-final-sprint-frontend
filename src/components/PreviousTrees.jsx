import { useState, useRef, useEffect } from "react";

// Get trees from API

function PreviousTrees() {
	const [trees, setTrees] = useState([]);

	const tree = useRef(null);

	useEffect(() => {
		fetch("http://localhost:8080/binary-search-tree", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => setTrees(data))
			.catch((error) =>
				setErrorMessage({
					type: "error",
					message: "ERR: " + error,
				})
			);

		tree.current.innerHTML = `<p>${trees}</p>`;
	}, []);

	return (
		<main>
			<h2>Previous Trees</h2>
			<p>These trees are from all prior uses of this app.</p>
			<div className="treebox" ref={tree}></div>
		</main>
	);
}

export default PreviousTrees;
