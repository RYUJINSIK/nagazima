import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
	const router = useRouter();
	let user = '류진식';
	const notify = (user) =>
		toast.dark(`${user}님 안녕하세요 😀`, {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	return (
		<div>
			<HeaderNav />

			<ToastContainer />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default Index;
