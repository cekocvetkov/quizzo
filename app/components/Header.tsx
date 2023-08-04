import Link from "next/link";

function Header() {
	return (
		<div className="navigation">
			<div className="logo">
				<Link href="/">quizzo</Link>
			</div>
			<div className="menu">
				<Link  href="/questions">questions</Link>
				<Link href="/add-quizzo">add quizzo</Link>
			</div>
		</div>
	);
}

export default Header;
