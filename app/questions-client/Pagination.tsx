"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../Models";

function Pagination({ hasPrev, hasNext, loading, totalPages }: { hasPrev: boolean; hasNext: boolean; loading: boolean; totalPages: number }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page: number = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
	const perPage: number = searchParams.get("perPage") ? Number(searchParams.get("perPage")) : PAGE_SIZE;

	return (
		<div className="pagination">
			<button
				disabled={!hasPrev || loading}
				onClick={() => {
					router.push(`questions-client?page=${page - 1}&perPage=${perPage}`);
				}}
			>
				prev
			</button>
			<div>
				{page + 1} / {totalPages}
			</div>
			<button
				disabled={!hasNext || loading}
				onClick={() => {
					router.push(`questions-client?page=${page + 1}&perPage=${perPage}`);
				}}
			>
				next
			</button>
		</div>
	);
}

export default Pagination;
