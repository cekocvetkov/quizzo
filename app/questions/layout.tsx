import QuestionsSearchForm from "./QuestionsSearchForm";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QuestionsSearchForm></QuestionsSearchForm>
			<div>{children}</div>
		</>
	);
}
