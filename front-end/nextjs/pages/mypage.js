import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import axios from 'axios';
import { useRouter } from 'next/router';
import {} from 'semantic-ui-react';

const Mypage = () => {
	const router = useRouter();

	const wrapper = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '90vh',
	};

	const mainDiv = {
		padding: '30px 30px 30px 30px',
		width: '1000px',
		// border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};
	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<form
						action="http://localhost:5000/fileupload"
						method="POST"
						enctype="multipart/form-data"
					>
						<input type="file" name="file" />
						<input type="submit" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Mypage;
