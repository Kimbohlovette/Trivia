import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createQuestion, getCategories } from '../services/fetchClient';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateFormData } from '../types';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: 1000,
	});

	const mutation = useMutation({
		mutationKey: ['questions', 'post'],
		mutationFn: createQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries(['questions']);
		},
	});

	const navigation = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFormData>();
	const onSubmit: SubmitHandler<CreateFormData> = (payload) => {
		mutation.mutate(payload);
		navigation('/');
	};
	return (
		<div className="flex items-center justify-center py-8">
			<div className="w-full max-w-lg">
				<h1 className="my-5 text-2xl font-semibold text-slate-800">
					Add a question
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<label
						htmlFor="question"
						className="text-slate-600 font-medium"
					>
						Question
					</label>
					<input
						defaultValue=""
						{...register('question')}
						id="question"
						className="py-2 px-4 focus:outline-blue-400 border rounded-full w-full"
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
						defaultValue=""
						{...register('answer')}
						id="answer"
						className="py-2 px-4 focus:outline-blue-400 border rounded-full w-full"
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
								defaultValue={1}
								{...register('category')}
								className=" py-2 px-4 focus:outline-blue-400 border rounded-full text-slate-600"
								name="category"
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
								defaultValue={1}
								{...register('difficulty')}
								placeholder="Difficulty"
								className="py-2 px-4 focus:outline-blue-400 border rounded-full w-full"
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
					<button
						disabled={mutation.isLoading}
						className={
							isLoading
								? 'py-2 px-1 text-sm font-medium bg-blue-300 text-white rounded-full'
								: 'py-2 px-1 text-sm font-medium bg-blue-500 text-white rounded-full'
						}
					>
						Create Question
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddQuestion;
