import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {
	const router = useRouter();
	return (
		<div>
			<HeaderNav />
		</div>
	);
};

export default Detail;
