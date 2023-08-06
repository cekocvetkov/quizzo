"use server";

import prisma from "@/db/PrismaClient";
import { EMPTY_SEARCH_TOKEN, Question } from "../Models";

export async function findQuestions(searchInput: string, page: number, perPage: number) {
	console.log(`Finding questions for input '${searchInput}'...`);
	if (searchInput === EMPTY_SEARCH_TOKEN) {
		const questionsAll: Question[] = await prisma.question.findMany({ skip: page * perPage, take: perPage });
		return questionsAll;
	}

	const questions: Question[] = await prisma.question.findMany({
		skip: page * perPage,
		take: perPage,
		where: {
			OR: [
				{
					question: {
						contains: searchInput,
					},
				},
				{ answer: { contains: searchInput } },
				{ category: { contains: searchInput } },
			],
		},
	});

	return questions;
}

export async function findAllQuestionsCount(searchInput: string) {
	if (searchInput === EMPTY_SEARCH_TOKEN) {
		const count: number = await prisma.question.count();
		return count;
	}
	let count = await prisma.question.count({
		where: {
			OR: [
				{
					question: {
						contains: searchInput,
					},
				},
				{ answer: { contains: searchInput } },
				{ category: { contains: searchInput } },
			],
		},
	});

	return count;
}
