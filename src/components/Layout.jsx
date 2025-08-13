import Button from "./Button";
import { Outlet, Link } from "react-router-dom";

function Layout() {
	return (
		<>
			<header>
				<h1>Binary Search Tree Algorithm</h1>
				<nav>
					<Link to="/">
						<Button name="Home"></Button>
					</Link>
					<Link to="/enter-numbers">
						<Button name="Enter Numbers"></Button>
					</Link>
					<Link to="/previous-trees">
						<Button name="Previous Trees"></Button>
					</Link>
				</nav>
			</header>
			<Outlet />
		</>
	);
}

export default Layout;
