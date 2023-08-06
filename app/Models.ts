export const EMPTY_SEARCH_TOKEN: string = "0empty0";
export const PAGE_SIZE: number = 20;

export interface Quizzo {
	id?: number;
	name?: string;
	date?: Date;
}
export interface QuizzoWithQuestions {
	id?: number;
	name: string;
	date: Date;
	questions: Question[];
}
export interface Question {
	id?: number;
	question: string;
	answer: string;
	category: string;
	quizzoId?: number | null;
}

export interface questionCreateInput {
	id: number;
	question: string;
	answer: string;
	category: string;
	quizzo?: { connect: { id: number } };
}
