import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'semantic-ui-react';

const HeaderForm = () => {
	const router = useRouter();
	const [loginUser, setLoginUser] = useState('');

	const onClickAction = (e) => {
		if (e.target.id === 'homeImg') {
			let link = document.location.href;
			let domain = link.slice(-4);

			if (domain === 'main') {
				location.reload();
			} else {
				router.push('/main');
			}
		}
		if (e.target.outerText === '서비스소개') {
			console.log('서비스소개');
			router.push('/info');
		}
		if (e.target.outerText === '시청기록분석') {
			console.log('서비스소개');
			router.push('/analysis');
		}
	};

	useEffect(() => {
		// get serverside props 메소드 알아보기 , window 사용 X (SSR 공부)
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
		<div
			style={{
				paddingTop: '30px',
				paddingLeft: '30px',
				paddingRight: '30px',
			}}
		>
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
					<Menu.Item
						key="info"
						name="info"
						value="info"
						onClick={onClickAction}
					>
						서비스소개
					</Menu.Item>
					<Menu.Item key="analysis" name="analysis" onClick={onClickAction}>
						시청기록분석
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<hr style={{ borderColor: '#2D2E2F' }}></hr>
		</div>
	);
};

export default HeaderForm;
