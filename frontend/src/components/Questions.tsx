import { useQuery } from '@tanstack/react-query';
import { QuestionType, CategoryType } from '../types';
import {
	getQuestionsData,
	getQuestionsByCategoryID,
} from '../services/fetchClient';
import Question from './Question';
import { useEffect, useState } from 'react';
export const Questions = () => {
	const [catID, setCategoryID] = useState<number>();

	let { data, isLoading, error } = useQuery<QuestionType[], Error>({
		queryKey: catID ? ['categories', catID, 'questions'] : ['questions'],
		queryFn: () => getQuestionsByCategoryID(catID),

		staleTime: 1000,
	});

	let query = useQuery<CategoryType[], Error>({
		queryKey: ['categories'],
		queryFn: async (): Promise<CategoryType[]> => {
			const res = await fetch(`http://0.0.0.0:8080/categories`);
			if (res.ok) {
				return (await res.json()).categories as CategoryType[];
			} else {
				return Promise.all([]);
			}
		},

		staleTime: 1000,
	});

	//Logs for testing
	useEffect(() => {
		console.log(catID);
	}, [catID]);

	return (
		<>
			<main className="flex min-h-screen p-8">
				<section id="sidebar" className="px-8">
					<nav>
						{query.isLoading ? (
							'Loading'
						) : (
							<div className="flex flex-col gap-y-5">
								{query.data?.map((cat) => (
									<button
										onClick={() => {
											setCategoryID(cat.id);
										}}
										className="hover:text-blue-400 text-slate-600"
										key={cat.id}
									>
										{cat.type}
									</button>
								))}
							</div>
						)}
					</nav>
					<div className="mt-5 flex flex-col gap-2 items-end">
						<input
							className="py-1 rounded-sm bg-slate-100 focus:outline-none px-4 text-slate-500 text-sm"
							type="search"
							name="search"
						/>
						<button className="bg-blue-400 rounded-sm hover:bg-blue-500 text-white w-fit px-4 py-1 shadow-sm">
							Search
						</button>
					</div>
				</section>
				<section className="flex-1" id="content">
					<h2 className="mb-5 text-lg text-slate-700 font-semibold">
						Questions
					</h2>
					{isLoading ? (
						'Loading questions ....'
					) : (
						<ul className="flex flex-col gap-y-2">
							{data?.map((question) => (
								<Question
									key={question.id}
									question={question}
								/>
							))}
						</ul>
					)}
				</section>
			</main>
		</>
	);
};
