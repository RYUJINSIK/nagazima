import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'semantic-ui-react';

const HeaderForm = () => {
	const router = useRouter();
	const [loginUser, setLoginUser] = useState('');

	const onClickAction = (e) => {
		if (e.target.id === 'homeImg') {
			router.push('/');
		}
		if (e.target.outerText === '서비스소개') {
			console.log('서비스소개');
		}
		if (e.target.outerText === '회원가입') {
			router.push('/signin');
		}
		if (e.target.outerText === '로그인') {
			router.push('/login');
		}
		if (e.target.outerText === '로그아웃') {
			localStorage.clear();
			setLoginUser('');
			router.push('/');
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userName = localStorage.getItem('userName');
			setLoginUser(userName);
		}
	}, []);

	const titleImg = {
		cursor: 'pointer',
		width: '140px',
		height: '35px',
	};
	return (
		<Menu inverted>
			<Menu.Item header>
				<img
					src="/images/title33.png"
					style={titleImg}
					value="home"
					id="homeImg"
					onClick={onClickAction}
				/>
			</Menu.Item>

			<Menu.Menu position="right">
				<Menu.Item key="info" name="info" value="info" onClick={onClickAction}>
					서비스소개
				</Menu.Item>
				{loginUser ? (
					<>
						<Menu.Item key="mypage" name="mypage" onClick={onClickAction}>
							마이페이지
						</Menu.Item>
						<Menu.Item key="logout" name="logout" onClick={onClickAction}>
							로그아웃
						</Menu.Item>
					</>
				) : (
					<>
						<Menu.Item key="signin" name="signin" onClick={onClickAction}>
							회원가입
						</Menu.Item>
						<Menu.Item key="login" name="login" onClick={onClickAction}>
							로그인
						</Menu.Item>
					</>
				)}
			</Menu.Menu>
		</Menu>
	);
};

export default HeaderForm;
