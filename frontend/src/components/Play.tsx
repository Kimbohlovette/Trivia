import { SubmitHandler, useForm } from 'react-hook-form';
import { QuestionType, QuizInfo } from '../types';
import { Suspense, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { playQuiz } from '../services/fetchClient';

const Play = () => {
	const savedQuizInfo = localStorage.getItem('@quizInfo');
	const [playedQuizzes, setPlayedQuizzes] = useState<number[]>([]);
	const [runningScore, setRunningScore] = useState<number>(0);
	const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);

	useEffect(() => {
		if (savedQuizInfo) {
			setPlayedQuizzes(JSON.parse(savedQuizInfo).played);
			setRunningScore(JSON.parse(savedQuizInfo).runningScore);
			playQuiz({
				previous_quizzes: playedQuizzes,
				running_score: runningScore,
				quiz_category: { type: 'click', id: 0 },
				user_id: 23,
			}).then((res) => {
				setCurrentQuiz(res);
				console.log('Inside the loader: ', res);
			});
		}
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<{}> = (payload) => {
		playQuiz({
			previous_quizzes: playedQuizzes,
			running_score: runningScore,
			quiz_category: { type: 'click', id: 0 },
			user_id: 23,
		}).then((res) => {
			setCurrentQuiz(res);
			setPlayedQuizzes((state) => [...state, res.id]);
		});
		reset();
	};
	return (
		<div className="flex items-center justify-center">
			<div className="divide-y w-full max-w-lg">
				<div className="mb-5">
					<div className="mt-8">
						<h1 className="text-blue-400 my-3 font-semibold text-2xl">
							Question
						</h1>
						<p className="my-4 text-slate-600 font-light max-w-xl">
							{currentQuiz?.question}
						</p>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="[&>*]:block w-full max-w-lg py-5 sm:flex sm:items-center gap-x-2"
					>
						<input
							defaultValue=""
							{...register('answer')}
							name="answer"
							type="text"
							placeholder="Type answer here"
							className="flex-1 border rounded-lg w-full px-4 py-2 focus:outline-blue-400"
						/>
						<button className="shadow rounded-lg bg-blue-400 hover:bg-blue-500 text-white text-center mt-8 sm:mt-0 px-4 py-2 w-full sm:max-w-fit">
							Submit
						</button>
					</form>
				</div>
				<div className="py-8 flex flex-col sm:flex-row sm:[&>*]:flex-1 [&>*]:justify-between [&>*]:flex gap-2">
					<div className="py-2 px-4 rounded-md my-1 bg-slate-50">
						<span className="text-slate-600">Wins</span>
						<span className="text-blue-300 text-lg font-semibold">
							{runningScore}
						</span>
					</div>
					<div className="py-2 px-4 rounded-md my-1 bg-slate-50">
						<span className="text-slate-600">Attempts left</span>
						<span className="text-blue-300 text-lg font-semibold">
							{5 - playedQuizzes.length}
						</span>
					</div>
					<div className="py-2 px-4 rounded-md my-1 bg-slate-50">
						<span className="text-slate-600">Total Rewards</span>
						<span className="text-blue-300 text-lg font-semibold">
							{runningScore}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Play;
