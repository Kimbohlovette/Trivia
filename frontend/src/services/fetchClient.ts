import {
	PlayPayload,
	QuestionType,
	CategoryType,
	CreateFormData,
	QuestionsData,
} from '../types';

const baseUrl = 'http://localhost:5000';

export const getQuestionsData = async (): Promise<QuestionsData> => {
	const res = await fetch(`${baseUrl}/questions`);
	return await res.json();
};

export const getQuestionsByCategoryID = async (
	categoryID?: number
): Promise<QuestionType[]> => {
	const res = categoryID
		? await fetch(`${baseUrl}/categories/${categoryID}/questions`)
		: await fetch(`${baseUrl}/questions`);
	if (res.ok) {
		return (await res.json()).questions as QuestionType[];
	} else {
		return Promise.all([]);
	}
};

export const getCategories = async (): Promise<CategoryType[]> => {
	const res = await fetch(`${baseUrl}/categories`);
	if (res.ok) {
		return (await res.json()).categories as CategoryType[];
	} else {
		return Promise.all([]);
	}
};

export const deleteQuestion = async (
	questionID: number
): Promise<{ success: boolean; id: number }> => {
	return await (
		await fetch(`${baseUrl}/questions/${questionID}`, {
			method: 'DELETE',
		})
	).json();
};

export const createQuestion = async (
	payload: CreateFormData
): Promise<{ success: true }> => {
	return await (
		await fetch(`${baseUrl}/questions/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
	).json();
};

export const playQuiz = async (payload: PlayPayload): Promise<QuestionType> => {
	return await (
		await fetch(`${baseUrl}/quizzes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
	).json();
};
