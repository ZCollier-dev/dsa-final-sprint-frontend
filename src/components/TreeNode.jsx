import "./TreeNode.css";

function TreeNode({ node }) {
	if (!node) {
		return null;
	}
	return (
		<ul>
			<li>
				<div>{node.value}</div>
				{(node.left || node.right) && (
					<ul>
						<TreeNode node={node.left} />
						<TreeNode node={node.right} />
					</ul>
				)}
			</li>
		</ul>
	);
}

export default TreeNode;
