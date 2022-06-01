import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import { useRef } from 'react';
import { Grid, Button, Label, Icon } from 'semantic-ui-react';
import axios from 'axios';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { Animated } from 'react-animated-css';

const Info = () => {
	const router = useRouter();
	const [chartOne, setChartOne] = useState([]);
	const [chartTwo2019, setChartTwo2019] = useState([]);
	const [chartTwo2020, setChartTwo2020] = useState([]);
	const [chartThreePie, setChartThreePie] = useState([]);
	const [chartThreeBar, setChartThreeBar] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/api/data`)
			.then(({ data }) => {
				console.log(data);
				setChartOne(data.covid19_data);
				setChartTwo2019(data.delivery_data_2019);
				setChartTwo2020(data.delivery_data_2020);
				setChartThreePie(data.OTT_Share);
				setChartThreeBar(data.ticker);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const goMainPage = () => {
		router.push('/main');
	};
	const Chart1 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'line',
		},
		title: {
			text: '월별 코로나 확진자 현황',
			style: {
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: '25px',
			},
		},
		yAxis: {
			visible: false,
		},
		xAxis: {
			categories: [
				'20/01',
				'20/02',
				'20/03',
				'20/04',
				'20/05',
				'20/06',
				'20/07',
				'20/08',
				'20/09',
				'20/10',
				'20/11',
				'20/12',
				'21/01',
				'21/02',
				'21/03',
				'21/04',
				'21/05',
				'21/06',
				'21/07',
				'21/08',
				'21/09',
				'21/10',
				'21/11',
				'21/12',
			],
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '확진자',
				data: chartOne,
				color: '#FF0000',
			},
		],
	};

	const Chart2 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'column',
		},
		title: {
			text: '연령대별 배달음식 주문량 변화',
			style: {
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: '25px',
			},
		},
		yAxis: {
			visible: false,
		},
		xAxis: {
			categories: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '2019',
				data: chartTwo2019,
				color: '#FF0000',
			},
			{
				animation: true,
				name: '2020',
				data: chartTwo2020,
				color: '#FF8C00',
			},
		],
	};

	const Chart3 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'pie',
		},
		title: {
			text: '점유율',
			style: {
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: '25px',
			},
		},
		yAxis: {
			visible: false,
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: 'OTT Service',
				data: chartThreePie,
				color: '#FF0000',
			},
		],
	};

	const Chart4 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'bar',
		},
		title: {
			text: '주식',
			style: {
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: '25px',
			},
		},
		yAxis: {
			visible: false,
		},
		xAxis: {
			categories: ['NETFLIX', '다우존스', 'S&P 500'],
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '주식',
				data: chartThreeBar,
				color: '#FF0000',
			},
		],
	};

	const DIVIDER_HEIGHT = 5;
	const outerDivRef = useRef();
	useEffect(() => {
		const wheelHandler = (e) => {
			e.preventDefault();
			const { deltaY } = e;
			const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
			const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

			if (deltaY > 0) {
				// 스크롤 내릴 때
				if (scrollTop >= 0 && scrollTop < pageHeight) {
					//현재 1페이지
					console.log('현재 1페이지, down');
					outerDivRef.current.scrollTo({
						top: pageHeight + DIVIDER_HEIGHT,
						left: 0,
						behavior: 'smooth',
					});
				} else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
					//현재 2페이지
					console.log('현재 2페이지, down');
					outerDivRef.current.scrollTo({
						top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
						left: 0,
						behavior: 'smooth',
					});
				} else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
					// 현재 3페이지
					console.log('현재 3페이지, down');
					outerDivRef.current.scrollTo({
						top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
						left: 0,
						behavior: 'smooth',
					});
				} else {
					// 현재 4페이지
					console.log('현재 4페이지, down');
					outerDivRef.current.scrollTo({
						top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
						left: 0,
						behavior: 'smooth',
					});
				}
			} else {
				// 스크롤 올릴 때
				if (scrollTop >= 0 && scrollTop < pageHeight) {
					//현재 1페이지
					console.log('현재 1페이지, up');
					outerDivRef.current.scrollTo({
						top: 0,
						left: 0,
						behavior: 'smooth',
					});
				} else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
					//현재 2페이지
					console.log('현재 2페이지, up');
					outerDivRef.current.scrollTo({
						top: 0,
						left: 0,
						behavior: 'smooth',
					});
				} else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
					// 현재 3페이지
					console.log('현재 3페이지, up');
					outerDivRef.current.scrollTo({
						top: pageHeight + DIVIDER_HEIGHT,
						left: 0,
						behavior: 'smooth',
					});
				} else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
					// 현재 3페이지
					console.log('현재 4페이지, up');
					outerDivRef.current.scrollTo({
						top: pageHeight * 2 + DIVIDER_HEIGHT,
						left: 0,
						behavior: 'smooth',
					});
				}
			}
		};
		const outerDivRefCurrent = outerDivRef.current;
		outerDivRefCurrent.addEventListener('wheel', wheelHandler);
		return () => {
			outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
		};
	}, []);

	const mainDiv = {
		// padding: '30px 30px 30px 30px',
		width: '100%',
		border: '1px solid #9e9e9e',
		borderRadius: '10px',
	};

	return (
		<>
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
				/>
			</head>
			<HeaderNav />

			<div ref={outerDivRef} className="outer">
				<div className="inner first-page">
					<br />
					<br />
					<Grid>
						<Grid.Row>
							<Grid.Column width={9}>
								<br />
								<br />
								<HighchartsReact highcharts={Highcharts} options={Chart1} />
							</Grid.Column>
							<Grid.Column
								width={7}
								style={{ paddingLeft: '40px', textAlign: 'center' }}
							>
								<br />
								<br />
								<Animated
									animationIn="fadeInUp"
									animationInDuration={3000}
									isVisible={true}
								>
									<h1>
										갈수록 증가하는 <br />
										코로나 확진자 수 !
									</h1>
								</Animated>

								<img
									src="/images/covid.svg"
									style={{ width: '300px', height: '300px' }}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
				<div className="divider"></div>
				<div className="inner second-page">
					<br />
					<br />
					<Grid>
						<Grid.Row>
							<Grid.Column width={7} style={{ textAlign: 'center' }}>
								<br />
								<br />
								<Animated
									animationIn="fadeInUp"
									animationInDuration={3000}
									isVisible={true}
								>
									<h1>
										확진자가 증가함으로써, <br />
										집에 머무는 시간이 많아지는 요즘
									</h1>
								</Animated>

								<img
									src="/images/stay.svg"
									style={{ width: '300px', height: '300px' }}
								/>
							</Grid.Column>
							<Grid.Column width={9}>
								<br />
								<br />
								<HighchartsReact highcharts={Highcharts} options={Chart2} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
				<div className="divider"></div>
				<div className="inner third-page">
					<br />
					<br />
					<Grid>
						<Grid.Row style={{ textAlign: 'center', paddingLeft: '40px' }}>
							<Grid.Column width={5}>
								<br />
								<br />
								<img
									src="/images/movie1.svg"
									style={{ width: '300px', height: '300px' }}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<br />
								<br />
								<h1>
									바깥 출입을 꺼리는{' '}
									<p
										style={{
											color: 'red',
											display: 'inline',
											fontSize: '40px',
										}}
									>
										'집콕족'
									</p>
									을 위한 <br />
									넷플릭스 컨텐츠 추천받기
								</h1>
								<br />
								<br />
								<Label color="black" size="large">
									<Icon name="arrow circle down" />
									추천받으러가기
								</Label>
								<br />
								<Button
									compact
									size="massive"
									color="black"
									style={{ border: '1px solid #fff' }}
									onClick={goMainPage}
								>
									<img
										src="/images/mini_title.png"
										value="posterImg"
										id="posterImg"
										onClick={goMainPage}
									/>
								</Button>
								<br />
							</Grid.Column>
							<Grid.Column width={5}>
								<br />
								<br />
								<img
									src="/images/movie2.svg"
									style={{ width: '300px', height: '300px' }}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default Info;
