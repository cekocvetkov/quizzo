"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { EMPTY_SEARCH_TOKEN } from "../Models";

async function QuestionsSearchForm() {
	const router = useRouter();

	function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
		console.log(event.target.value);
		let value = "";
		if (event.target.value == null || event.target.value == "") {
			value = EMPTY_SEARCH_TOKEN;
		} else {
			value = event.target.value;
		}
		router.push(`/questions/${value}`);
	}

	useEffect(() => {
		router.push(`/questions/${EMPTY_SEARCH_TOKEN}`);
	}, []);

	return (
		<>
			<div className="search-input-wrapper">
				<input className="search-input" type="text" placeholder="you can search for questions here" onChange={handleSearch} />
			</div>
		</>
	);
}

export default QuestionsSearchForm;
