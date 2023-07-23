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
	question?: string;
	category?: string;
	answer?: string;
	quizzoId?: number;
}
