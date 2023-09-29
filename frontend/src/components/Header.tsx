import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="px-4 py-5 bg-slate-100">
			<nav>
				<ul className="flex justify-center gap-x-10">
					<li>
						<Link
							to="/"
							className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400"
						>
							List
						</Link>
					</li>
					<li>
						<Link
							to={'/play'}
							className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400"
						>
							Play
						</Link>
					</li>
					<li>
						<Link
							to={'/add'}
							className="py-2 px-4 text-slate-600 font-normal border-b-2 border-transparent hover:bg-slate-200 hover:border-b-blue-400"
						>
							Add
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
