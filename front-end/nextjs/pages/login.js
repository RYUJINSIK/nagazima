import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import { Button, Form, Input, Message, Icon, Label } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const router = useRouter();

	const [message, setMessage] = useState('');
	// 변수명을 지을땐 동사+명사로 지으면 제일 깔끔
	const [isError, setisError] = useState('none');
	const [user, setUser] = useState({
		id: '',
		password: '',
	});
	const onChangeAction = useCallback(
		(e) => {
			const { name, value } = e.target;
			setUser({ ...user, [name]: value });
		},
		[user, setUser],
	);
	const onSubmitAction = (e) => {
		if (user.id === '' || user.password === '') {
			setMessage('아이디, 비밀번호를 모두 입력해주세요.');
			setisError('inline-block');
			return false;
		}

		setisError('none');
		postLogin(user);
	};

	const setAuthInfo = (name, token) => {
		localStorage.setItem('userName', JSON.stringify(name));
		localStorage.setItem('token', JSON.stringify(token));
	};
	// async 필요 X
	// .env 파일 API_URL
	const postLogin = async (user) => {
		axios
			.post('http://127.0.0.1:5000/login', user)

			// .post(`${process.env.API_URL}/login`, user)
			.then(({ data }) => {
				if (data !== 'fail') {
					setisError('none');
					// setAuthInfo 함수 구현
					setAuthInfo(data.name, data.token);
					router.push('/');
					// showToast 함수 구현
					toast.configure();
					toast.success(`${data.name}님 안녕하세요 😀`, {
						theme: 'dark',
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}

				if (data === 'fail') {
					setMessage('아이디 또는 비밀번호가 잘못 입력 되었습니다.');
					setisError('inline-block');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

	const aaa = (isError) => {
		return {
			marginBottom: '5px',
			display: isError,
		};
	};

	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<Message color="black" icon="sign-in" header="로그인" />
					<Form>
						<label>ID</label>&nbsp;&nbsp;&nbsp;
						<Label
							circular
							color="red"
							horizontal
							// style={{ display: isError, marginBottom: '5px' }}
							style={aaa(isError)}
						>
							&nbsp;
							<Icon name="warning" /> {message}
						</Label>
						<Form.Field
							name="id"
							control={Input}
							onChange={onChangeAction}
							value={user.id}
							placeholder="ID를 입력해주세요"
						/>
						<label>Password</label>
						<Form.Input
							name="password"
							onChange={onChangeAction}
							value={user.password}
							type="password"
							placeholder="Password를 입력해주세요"
						/>
					</Form>
					<br />
					<div style={btnArea}>
						<Button
							inverted
							color="grey"
							animated
							type="submit"
							onClick={onSubmitAction}
						>
							<Button.Content visible>로그인</Button.Content>
							<Button.Content hidden>
								<Icon name="arrow right" />
							</Button.Content>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
