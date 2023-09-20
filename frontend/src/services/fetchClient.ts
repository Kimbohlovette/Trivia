import { CategoryType, QuestionType, QuestionsData } from '../types';

export const getQuestionsData = async (): Promise<QuestionsData> => {
	const res = await fetch('http://0.0.0.0:8080/questions');
	return await res.json();
};

export const getQuestionsByCategoryID = async (
	categoryID?: number
): Promise<QuestionType[]> => {
	const res = categoryID
		? await fetch(`http://0.0.0.0:8080/categories/${categoryID}/questions`)
		: await fetch('http://0.0.0.0:8080/questions');
	if (res.ok) {
		return (await res.json()).questions as QuestionType[];
	} else {
		return Promise.all([]);
	}
};

export const getCategories = async (): Promise<CategoryType[]> => {
	const res = await fetch(`http://0.0.0.0:8080/categories`);
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
		await fetch(`http://0.0.0.0:8080/questions/${questionID}`, {
			method: 'DELETE',
		})
	).json();
};
