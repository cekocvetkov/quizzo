"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { EMPTY_SEARCH_TOKEN, PAGE_SIZE, Question } from "../Models";
import Pagination from "./Pagination";
import QuestionsRenderer from "./QuestionsRenderer";
import { findAllQuestionsCount, findQuestions } from "./actions";

interface Pagination {
	page: number;
	perPage: number;
}

function QuestionsSearchForm({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const [searchString, setSearchString] = useState<string>("");
	const [questions, setQuestions] = useState<Question[]>([]);
	const [totalCount, setTotalCount] = useState<number>();

	const page: number = searchParams.page ? Number(searchParams.page) : 0;
	const perPage = searchParams.perPage ? Number(searchParams.perPage) : PAGE_SIZE;

	async function handleChange(event: ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value);
		let value = "";
		if (event.target.value == null || event.target.value == "") {
			value = EMPTY_SEARCH_TOKEN;
		} else {
			value = event.target.value;
		}
		startTransition(async () => {
			let q: Question[] = await findQuestions(value, 0, PAGE_SIZE);
			setQuestions(q);
			setTotalCount(await findAllQuestionsCount(value));
			router.push(`questions-client?page=0&perPage=${PAGE_SIZE}`);
			setSearchString(value === EMPTY_SEARCH_TOKEN ? "" : value);
		});
	}

	useEffect(() => {
		startTransition(async () => {
			let q: Question[] = await findQuestions(EMPTY_SEARCH_TOKEN, page, perPage);
			setQuestions(q);
			setTotalCount(await findAllQuestionsCount(EMPTY_SEARCH_TOKEN));
		});
	}, []);

	useEffect(() => {
		startTransition(async () => {
			let q: Question[] = await findQuestions(searchString, page, perPage);
			setQuestions(q);
		});
	}, [page]);

	return (
		<>
			<div className="search-input-wrapper">
				<input className="search-input" value={searchString} type="text" placeholder="you can search for questions here" onChange={handleChange} />
				<Pagination hasPrev={page > 0} hasNext={(page + 1) * perPage < totalCount!} loading={isLoading} totalPages={Math.ceil(totalCount! / PAGE_SIZE)}></Pagination>
			</div>
			{isLoading ? <div className="loading">we&apos;re loading the data...</div> : <QuestionsRenderer questions={questions}></QuestionsRenderer>}
		</>
	);
}

export default QuestionsSearchForm;
