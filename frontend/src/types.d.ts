export interface QuestionType {
	question: string;
	answer: string;
	difficulty: number;
	category: number;
	id: number;
}

export interface QuestionsData {
	questions?: QuestionType[];
	currentCategory: string;
	categories?: CategoryType[];
	totalQuestions: number;
}

export interface CategoryType {
	id: number;
	type: string;
}
