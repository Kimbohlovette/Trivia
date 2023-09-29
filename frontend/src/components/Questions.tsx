import { useQuery } from '@tanstack/react-query';
import { QuestionType, CategoryType } from '../types';
import {
	getQuestionsByCategoryID,
	getCategories,
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
		queryFn: getCategories,

		staleTime: 1000,
	});

	//Logs for testing
	useEffect(() => {
		console.log(catID);
	}, [catID]);

	return (
		<section className="flex-1 pt-8" id="content">
			<h2 className="mb-5 text-lg text-blue-500 font-semibold text-center">
				Questions
			</h2>
			{isLoading ? (
				'Loading questions ....'
			) : (
				<ul className="flex flex-col gap-y-2">
					{data?.map((question) => (
						<Question key={question.id} question={question} />
					))}
				</ul>
			)}
		</section>
	);
};
