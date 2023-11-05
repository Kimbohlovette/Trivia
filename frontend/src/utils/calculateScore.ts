import { QuestionType } from '../types';

export const calculateScore = (question: QuestionType): number => {
	switch (question.difficulty) {
		case 1:
			return 100;
		case 2:
			return 250;
		case 3:
			return 295;
		case 4:
			return 320;
		case 5:
			return 350;
	}
	return 0;
};
