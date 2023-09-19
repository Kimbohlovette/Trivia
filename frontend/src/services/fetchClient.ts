import { CategoryType, QuestionsData } from '../types';

export const getQuestionsData = async (): Promise<QuestionsData> => {
	const res = await fetch('http://0.0.0.0:8080/questions');
	return await res.json();
};

export const getQuestionsByCategoryID = async (
	catID: number
): Promise<QuestionsData> => {
	const res = await fetch(
		`http://0.0.0.0:8080/categories/${catID}/questions`
	);
	return await res.json();
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
