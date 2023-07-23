"use client";

import { MouseEvent, useTransition } from "react";
import { deleteQuizzo } from "./actions";

function Delete({ params: { quizzoId } }: { params: { quizzoId: number } }) {
	const [isLoading, startTransition] = useTransition();

	async function handleDelete(e: MouseEvent<HTMLElement>) {
		e.preventDefault();
		e.stopPropagation();

		startTransition(async () => await deleteQuizzo(quizzoId));
	}
	return (
		<>
			{isLoading ? (
				<div className="loading-delete"></div>
			) : (
				<div className="delete-button" onClick={(e) => handleDelete(e)}>
					x
				</div>
			)}
		</>
	);
}

export default Delete;
