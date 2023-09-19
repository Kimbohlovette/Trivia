import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryType, QuestionsData } from '../types';
import { getQuestionsData } from '../services/fetchClient';
import Question from './Question';
export const Questions = () => {
	//const queryClient = useQueryClient();
	let query = useQuery<QuestionsData, Error>({
		queryKey: ['questions'],
		queryFn: getQuestionsData,

		staleTime: 1000,
	});

	return (
		<>
			<main className="flex min-h-screen p-8">
				<section id="sidebar" className="px-8">
					<nav>
						<ul className="flex flex-col gap-y-5">
							{query.data?.categories?.map((cat) => (
								<li
									className="hover:text-blue-400 text-slate-600"
									key={cat.id}
								>
									{cat.type}
								</li>
							))}
						</ul>
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
					<ul className="flex flex-col gap-y-2">
						{query.data?.questions?.map((question) => (
							<Question key={question.id} question={question} />
						))}
					</ul>
				</section>
			</main>
		</>
	);
};
