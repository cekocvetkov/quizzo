import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="page-content">
					<Header></Header>
					<div>{children}</div>
				</div>
				<Footer></Footer>
			</body>
		</html>
	);
}
