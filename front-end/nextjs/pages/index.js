import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';

const Main = () => {
	const router = useRouter();

	const goMainPage = () => {
		router.push('/main');
	};

	return (
		<div class="main-box">
			<video
				src="/videos/MainVideo.mp4"
				autoplay="autoplay"
				muted="muted"
				width="100%"
				loop
			>
				<source src="/videos/MainVideo.mp4" type="video/mp4" />
				<strong>Your browser does not support the video tag.</strong>
			</video>

			{/* 
            <video src="/videos/MainVideo.mp4" preload="auto" loop="" playsinline="" width="1903" height="1070" style="position: absolute; width: 1903px; height: 1070.44px; top: -75.2188px; left: 0px;"></video> */}
			<div class="main-text">
				<p>
					지금 보고싶은 영상
					<br />
					추천받기
				</p>
				<Button compact size="massive" color="black" onClick={goMainPage}>
					<img src="/images/mini_title.png" value="posterImg" id="posterImg" />
				</Button>
			</div>
		</div>
	);
};

export default Main;
