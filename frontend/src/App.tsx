import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Questions } from './components/Questions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import AddQuestion from './components/AddQuestion';

const MyApp = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

const router = createBrowserRouter([
	{
		element: <MyApp />,
		children: [
			{ path: '/', element: <Questions /> },
			{ path: '/add', element: <AddQuestion /> },
		],
	},
]);
function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
