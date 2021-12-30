import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import {
	Button,
	Form,
	Input,
	Message,
	Icon,
	Label,
	Popup,
} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
	const router = useRouter();
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState({
		errorId: 'none',
		errorPassword: 'none',
		errorName: 'none',
	});
	const [user, setUser] = useState({
		id: '',
		password: '',
		passwordCheck: '',
		name: '',
	});

	let isKorEng = /^[가-힣a-zA-Z]+$/; //이름: 한글이나 영문
	let isMail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 형식

	//비밀번호
	let isEngNum = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/; //영문,숫자
	let isEngSpecial = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,}$/; //영문,특수문자
	let isSpecialNum = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,}$/; //특수문자, 숫자
	let isEngNumSpecial =
		/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/; //영문,숫자,특수문자 모두 사용

	const onChangeAction = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	// else 사용을 줄이자 else보다는 if를 많이사용
	const onClickCheck = (e) => {
		if (user.id === '') {
			setMessage('아이디를 입력하세요 !');
			setIsError({
				...isError,
				errorId: 'inline-block',
				errorPassword: 'none',
				errorName: 'none',
			});
		} else {
			if (!regCheck(isMail, user.id)) {
				setMessage('적합하지 않은 이메일 형식입니다.');
				setIsError({
					...isError,
					errorId: 'inline-block',
					errorPassword: 'none',
					errorName: 'none',
				});
				return false;
			} else {
				setIsError({
					...isError,
					errorId: 'none',
					errorPassword: 'none',
					errorName: 'none',
				});
				idChk(user.id);
			}
		}
	};

	const onSubmitAction = (e) => {
		if (user.id === '' || user.name === '') {
			setMessage('아이디, 이름을 모두 입력해주세요.');
			setIsError({
				...isError,
				errorId: 'inline-block',
				errorPassword: 'none',
				errorName: 'none',
			});
			return false;
		}
		if (user.password != user.passwordCheck) {
			setMessage('비밀번호가 일치하지않습니다 !');
			setIsError({
				...isError,
				errorId: 'none',
				errorPassword: 'inline-block',
				errorName: 'none',
			});
			return false;
		}

		if (!regCheck(isKorEng, user.name)) {
			setMessage('이름은 한글 또는 영문으로만 입력해주세요.');
			setIsError({
				...isError,
				errorId: 'none',
				errorPassword: 'none',
				errorName: 'inline-block',
			});
			return false;
		}

		if (!regCheck(isMail, user.id)) {
			setMessage('적합하지 않은 이메일 형식입니다.');
			setIsError({
				...isError,
				errorId: 'inline-block',
				errorPassword: 'none',
				errorName: 'none',
			});
			return false;
		}

		if (
			!regCheck(
				isEngNum || isEngSpecial || isSpecialNum || isEngNumSpecial,
				user.password,
			)
		) {
			setMessage('비밀번호 생성 규칙을 지켜 입력해주세요.');
			setIsError({
				...isError,
				errorId: 'none',
				errorPassword: 'inline-block',
				errorName: 'none',
			});
			return false;
		}

		setIsError({
			...isError,
			errorId: 'none',
			errorPassword: 'none',
			errorName: 'none',
		});
		postSignin(user);
	};

	function regCheck(regex, val) {
		if (regex.test(val)) {
			return true;
		}
	}
	// parameter를 명확하게, user 정보를 세분화해서 전달(데이터가 적다면) / 데이터가 많을땐 객체그대로 보내지만, 문서화 필수
	const postSignin = async (user) => {
		axios
			.post('http://127.0.0.1:5000/signin', user)
			.then(({ data }) => {
				if (data === 'success') {
					console.log('signin!');
					router.push('/');
					toast.configure();
					toast.success('회원가입이 완료되었습니다. 👏', {
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
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const idChk = async (id) => {
		axios
			.post('http://127.0.0.1:5000/idchk', { id: id })
			.then(({ data }) => {
				console.log(data);
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

	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<Message color="black" icon="edit" header="회원가입" />
					<Form>
						<label>ID</label> &nbsp;&nbsp;&nbsp;
						<Button
							compact
							size="mini"
							color="black"
							floated="right"
							onClick={onClickCheck}
							style={{ marginBottom: '5px' }}
						>
							<Icon name="checkmark" />
							ID 중복검사
						</Button>
						<Label
							circular
							color="red"
							horizontal
							style={{ display: isError.errorId, marginBottom: '5px' }}
						>
							&nbsp;
							<Icon name="warning" /> {message}
						</Label>
						<Form.Field
							name="id"
							onChange={onChangeAction}
							value={user.id}
							control={Input}
							placeholder="아이디는 이메일 형식으로 입력해주세요. ex) elice@elice.com"
						/>
						<label>Password</label>&nbsp;
						<Popup
							size="mini"
							content="비밀번호는 영문,숫자,특수문자 중 2가지 조합하여 10자리 이상
							입력하거나, 3가지 모두 사용하여 8자리 이상 입력해주세요"
							trigger={<Icon name="info circle" />}
						/>{' '}
						&nbsp;&nbsp;&nbsp;
						<Label
							circular
							color="red"
							horizontal
							style={{ display: isError.errorPassword, marginBottom: '5px' }}
						>
							&nbsp;
							<Icon name="warning" /> {message}
						</Label>
						<Form.Input
							name="password"
							onChange={onChangeAction}
							value={user.password}
							type="password"
							placeholder="비밀번호"
						/>
						<label>Password Check</label>
						<Form.Input
							name="passwordCheck"
							onChange={onChangeAction}
							value={user.passwordCheck}
							type="password"
							placeholder="비밀번호 재입력"
						/>
						<label>Name</label> &nbsp;&nbsp;&nbsp;
						<Label
							circular
							color="red"
							horizontal
							style={{ display: isError.errorName, marginBottom: '5px' }}
						>
							&nbsp;
							<Icon name="warning" /> {message}
						</Label>
						<Form.Field
							name="name"
							onChange={onChangeAction}
							value={user.name}
							control={Input}
							placeholder="이름은 한글이나 영문으로만 입력해주세요."
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
							<Button.Content visible>회원가입</Button.Content>
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

export default Signin;
