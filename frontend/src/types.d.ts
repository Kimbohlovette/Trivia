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

export type CreateFormData = Omit<QuestionType, 'id'>;

export interface QuizInfo {
	played: number[];
	runningScore: number;
}

export interface PlayPayload {
	previous_quizzes: number[];
	running_score: number;
	quiz_category: CategoryType;
	user_id: number;
}
