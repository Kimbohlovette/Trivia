import { QuestionType } from '../types';
import { AiOutlineDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../services/fetchClient';

interface Props {
	question: QuestionType;
}

const Question = ({ question }: Props) => {
	// const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const queryClient = useQueryClient();

	// const handleAnswerVisibility = () => {
	// 	setShowAnswer((state) => !state);
	// };
	const mutation = useMutation({
		mutationKey: ['questions', 'delete'],
		mutationFn: deleteQuestion,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['questions'] });
			queryClient.invalidateQueries({
				queryKey: ['categories', question.category, 'questions'],
			});
		},
	});
	return (
		<div className="px-4 shadow-sm rounded-lg border border-slate-100 flex">
			<div className="divide-y flex-1">
				<div className="py-4">
					<p className="text-slate-800">{question.question}</p>
					<div className="">
						<p className="rounded-sm text-sm text-blue-300">
							{question.answer}
						</p>
					</div>
				</div>
				<div className="flex gap-x-5 py-2 text-sm">
					<div className="flex items-center gap-x-2 text-slate-500">
						<span>Category:</span>
						<span className="text-xs">Science</span>
					</div>
					<div className="flex items-center gap-x-2 text-slate-500">
						<span className="">Difficulty:</span>
						<span className="text-xs">1</span>
					</div>
				</div>
			</div>
			<div className="p-4 flex items-center justify-center">
				<button
					onClick={() => {
						mutation.mutate(question.id);
						queryClient.invalidateQueries(['questions']);
					}}
					className="text-red-400"
				>
					<AiOutlineDelete />
				</button>
			</div>
		</div>
	);
};

export default Question;
