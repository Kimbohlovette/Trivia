import React from 'react';

import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { AiFillTrophy } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
interface Props {
	totalScore: number;
	correctScore: number;
	onCloseModal: () => void;
}
const GameResultModal = ({ correctScore, totalScore, onCloseModal }: Props) => {
	return (
		<div className="bg-slate-200 fixed top-0 left-0 h-full w-full z-50">
			<div className="flex items-center justify-center h-screen">
				<div className="relative bg-white shadow-lg rounded-sm px-5 py-8 w-full max-w-lg">
					<h1 className="text-blue-400 text-2xl sm:text-4xl font-semibold text-center mb-4">
						Game Over
					</h1>
					<div className="flex flex-row flex-wrap justify-center items-center gap-4 py-2">
						<div className="flex flex-col items-center shadow px-8 py-2">
							<FaCheck className="text-green-500" />
							<span className="text-slate-600 font-bold text-xl">
								0{correctScore}
							</span>
						</div>
						<div className="flex flex-col items-center  shadow px-8 py-2">
							<ImCross className="text-red-400" size={12} />
							<span className="text-slate-600 font-bold text-xl">
								0{5 - correctScore}
							</span>
						</div>
						<div className="flex flex-col items-center  shadow px-8 py-2">
							<AiFillTrophy className="text-blue-500" />
							<span className="text-slate-600 font-bold text-xl">
								{totalScore}
							</span>
						</div>
					</div>
					<div
						onClick={() => {
							onCloseModal();
						}}
						className="absolute right-5 top-5"
					>
						<RxCross2 className="text-xl text-slate-600" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameResultModal;
