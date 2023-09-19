import React from 'react';

const Header = () => {
	return (
		<header className="px-4 py-5 bg-slate-100">
			<nav>
				<ul className="flex justify-center gap-x-10">
					<li>
						<button className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400">
							List
						</button>
					</li>
					<li>
						{' '}
						<button className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400">
							Add
						</button>
					</li>
					<li>
						{' '}
						<button className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400">
							Play
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
