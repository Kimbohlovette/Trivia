import React, { useState } from 'react';
import { QuestionType, QuestionsData } from '../types';
import { AiOutlineDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../services/fetchClient';

interface Props {
	question: QuestionType;
}

const Question = ({ question }: Props) => {
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const handleAnswerVisibility = () => {
		setShowAnswer((state) => !state);
	};
	const mutation = useMutation({
		mutationKey: ['questions', 'delete'],
		mutationFn: deleteQuestion,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['questions'] });
		},
	});
	return (
		<div className="py-8 px-4 shadow-sm rounded-sm border border-slate-100">
			<p className="text-slate-800 mb-4">{question.question}</p>
			<div className="flex items-center gap-5">
				<span className="text-slate-500 text-sm">
					Difficulty: {question.difficulty}
				</span>
				<button
					onClick={() => {
						mutation.mutate(question.id);
					}}
					className="text-slate-600 hover:bg-blue-200 p-2 rounded-xl border border-transparent focus:border-slate-200 focus:bg-blue-200"
				>
					<AiOutlineDelete />
				</button>
			</div>
			<div className="mt-5">
				<button
					disabled={mutation.isLoading}
					onClick={handleAnswerVisibility}
					className={
						mutation.isLoading
							? 'cursor-not-allowed bg-blue-400 py-1 px-2 shadow-sm text-white rounded-sm border text-sm font-medium hover:bg-blue-600 w-28'
							: 'bg-blue-400 py-1 px-2 shadow-sm text-white rounded-sm border text-sm font-medium hover:bg-blue-600 w-28'
					}
				>
					{!showAnswer ? 'Show answer' : 'Hide answer'}
				</button>
				{showAnswer && (
					<p className="rounded-sm text-sm text-slate-500 mt-4">
						{question.answer}
					</p>
				)}
			</div>
		</div>
	);
};

export default Question;
