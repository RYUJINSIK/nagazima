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
					<Message color="black" icon="edit" header="회원가입" />
					<Form>
						<label>아이디</label>
						<Form.Field control={Input} placeholder="아이디" />
						<label>비밀번호</label>
						<Form.Input type="password" placeholder="비밀번호" />
						<label>비밀번호 재확인</label>
						<Form.Input type="password" placeholder="비밀번호 재확인" />
						<label>이름</label>
						<Form.Field control={Input} placeholder="이름" />
						<label>닉네임</label>
						<Form.Field control={Input} placeholder="닉네임" />
					</Form>
					<br />
					<div style={btnArea}>
						<Button inverted color="grey">
							회원가입
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
