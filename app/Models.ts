export const EMPTY_SEARCH_TOKEN = "0empty0";

export interface Quizzo {
	id?: number;
	name?: string;
	date?: Date;
}
export interface QuizzoWithQuestions {
	id?: number;
	name?: string;
	date?: Date;
	questions: Question[];
}
export interface Question {
	id?: number;
	question: string;
	answer: string;
	category: string;
	quizzoId?: number | null;
}
