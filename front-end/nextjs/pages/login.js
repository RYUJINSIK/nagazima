import React from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import { Button, Form, Input, Message } from 'semantic-ui-react';

const Login = () => {
	const router = useRouter();
	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '50vh',
	};

	const mainDiv = {
		padding: '10px 30px 30px 30px',
		width: '500px',
		border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const btnArea = {
		textAlign: 'center',
	};

	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<Message color="black" icon="sign-in" header="로그인" />
					<Form>
						<label>아이디</label>
						<Form.Field control={Input} placeholder="ID" />
						<label>비밀번호</label>
						<Form.Field control={Input} placeholder="Password" />
					</Form>
					<br />
					<div style={btnArea}>
						<Button inverted color="grey">
							ID/PW 찾기
						</Button>
						<Button inverted color="grey">
							로그인
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
