import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Play = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<{}> = (payload) => {
		console.log(payload);
	};
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="text-center mt-8">
					<h1 className="text-blue-700 my-3 font-medium text-2xl">
						Question
					</h1>
					<p className="my-4 text-slate-600 text-lg max-w-xl">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Sit porro quasi, dolores quos mollitia quam
						voluptatum illum velit temporibus ipsa nam beata?
					</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="[&>*]:block w-full max-w-lg py-5"
				>
					<input
						defaultValue=""
						{...register('answer')}
						name="answer"
						type="text"
						placeholder="Type answer here"
						className="border w-full px-4 py-3 focus:outline-blue-400 text-center"
					/>
					<button className="shadow bg-blue-400 hover:bg-blue-600 text-white text-center mx-auto my-4 px-4 py-2 rounded-sm ">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Play;
