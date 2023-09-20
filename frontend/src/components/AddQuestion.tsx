import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
	getCategories,
	getQuestionsByCategoryID,
} from '../services/fetchClient';

const AddQuestion = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: 1000,
	});
	return (
		<div className="flex items-center justify-center py-8">
			<div className="w-full max-w-lg">
				<h1 className="my-5 text-2xl font-semibold text-slate-800">
					Add a question
				</h1>
				<form className="flex flex-col gap-4">
					<label
						htmlFor="question"
						className="text-slate-600 font-medium"
					>
						Question
					</label>
					<input
						id="question"
						className="py-2 px-4 focus:outline-none border rounded-ms w-full"
						name="question"
						type="text"
					/>
					<label
						className="text-slate-600 font-medium"
						htmlFor="answer"
					>
						Answer
					</label>
					<input
						id="answer"
						className="py-2 px-4 focus:outline-none border rounded-ms w-full"
						name="answer"
						type="text"
					/>
					<div className="flex gap-2">
						<div className="flex-1 flex flex-col">
							<label
								className="text-slate-600 font-medium"
								htmlFor="category"
							>
								Select Category
							</label>
							<select
								className=" py-2 px-4 focus:outline-none border rounded-sm text-slate-600"
								name="cateogory"
								id="category"
							>
								{data &&
									data.map((cat) => {
										return (
											<option key={cat.id} value={cat.id}>
												{cat.type}
											</option>
										);
									})}
							</select>
						</div>
						<div className="flex-1 flex flex-col">
							<label
								className="text-slate-600 font-medium"
								htmlFor="difficulty"
							>
								Select difficulty
							</label>
							<select
								placeholder="Difficulty"
								className="py-2 px-4 focus:outline-none border rounded-sm text-slate-600"
								name="cateogory"
								id="difficulty"
							>
								{[1, 2, 4, 5].map((value) => {
									return (
										<option key={value} value={value}>
											{value}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<button className="py-2 px-1 text-sm font-medium bg-blue-400 text-white rounded-sm">
						Create Question
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddQuestion;
