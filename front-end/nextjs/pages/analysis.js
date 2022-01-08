import React, { useEffect, useState, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import HeaderNav from '../components/HeaderNav';
import { useRouter } from 'next/router';
import {
	Dimmer,
	Loader,
	Button,
	Label,
	Grid,
	Step,
	Popup,
	Icon,
} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

const Analysis = () => {
	const router = useRouter();
	const [watchData, setWatchData] = useState([]);
	const logoImgInput = useRef();
	const [fileName, setFileName] = useState('');
	const [loading, setLoading] = useState('none');
	const [viewDate, setViewDate] = useState([]);
	const [viewCount, setViewCount] = useState([]);
	const [genre, setGenre] = useState([]);
	const [genreCount, setGenreCount] = useState([]);
	const [actor, setActor] = useState([]);
	const [type, setType] = useState([]);
	const [ratio, setRatio] = useState([]);
	const [isError, setIsError] = useState('none');
	const [mainArticle, setMainArticle] = useState('inline-block');
	const [visibleChart, setVisibleChart] = useState({
		chart_1: 'none',
		chart_2: 'none',
		chart_3: 'none',
		chart_4: 'none',
	});

	const fileSet = (data, fileInfo, originalFile) => {
		setFileName(fileInfo.name);
		setWatchData(data);
	};

	const onClickSubmit = () => {
		setLoading('inline-block');
		setTimeout(getData, 2000);
	};

	const getData = () => {
		axios
			.post('http://127.0.0.1:5000/api/analysis', {
				watchData,
			})
			.then(({ data }) => {
				chartSetting(data);
				setLoading('none');
				setMainArticle('none');
				setVisibleChart({
					...visibleChart,
					chart_1: 'inline-block',
					chart_2: 'none',
					chart_3: 'none',
					chart_4: 'none',
				});
			})

			.catch((err) => {
				console.log(err);
				setIsError('inline-block');
				setLoading('none');
			});
	};

	const chartSetting = (chartData) => {
		// 일별 시청회수 차트
		setViewDate(chartData.date_1);
		setViewCount(chartData.viewing_cnt_1);

		// 많이본 장르 차트
		setGenre(chartData.genre_2);
		setGenreCount(chartData.genre_cnt_2);

		// 좋아하는 배우 차트
		setActor(chartData.actor_cnt_3);

		// 영상 비율
		setRatio(chartData.rate_4);
	};

	const getChart = (e) => {
		console.log(e.target.id);
		if (e.target.id === '1') {
			setVisibleChart({
				...visibleChart,
				chart_1: 'inline-block',
				chart_2: 'none',
				chart_3: 'none',
				chart_4: 'none',
			});
		}

		if (e.target.id === '2') {
			setVisibleChart({
				...visibleChart,
				chart_1: 'none',
				chart_2: 'inline-block',
				chart_3: 'none',
				chart_4: 'none',
			});
		}

		if (e.target.id === '3') {
			setVisibleChart({
				...visibleChart,
				chart_1: 'none',
				chart_2: 'none',
				chart_3: 'inline-block',
				chart_4: 'none',
			});
		}

		if (e.target.id === '4') {
			setVisibleChart({
				...visibleChart,
				chart_1: 'none',
				chart_2: 'none',
				chart_3: 'none',
				chart_4: 'inline-block',
			});
		}
	};
	const Chart1 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'column',
		},
		title: {
			text: '일별 시청회수',
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
			categories: viewDate,
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '시청회수',
				data: viewCount,
				color: '#FF0000',
			},
		],
	};

	const Chart2 = {
		chart: {
			backgroundColor: '#00ff0000',
			inverted: false,
			polar: false,
		},
		title: {
			text: '많이본 장르',
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
			categories: genre,
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '장르',
				data: genreCount,
				color: '#FF0000',
			},
		],
	};

	const Chart3 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'bar',
		},
		title: {
			text: '좋아하는 배우',
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
			categories: actor,
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '출연수',
				data: actor,
				color: '#FF0000',
			},
		],
	};

	const Chart4 = {
		chart: {
			backgroundColor: '#00ff0000',
			type: 'pie',
		},
		title: {
			text: '시청 비율',
			style: {
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: '25px',
			},
		},
		yAxis: {
			categories: ['Movie', 'TV Show'],
		},
		xAxis: {
			categories: ['Movie', 'TV Show'],
		},
		legend: {
			backgroundColor: '#fff',
			isVisible: false,
		},
		series: [
			{
				animation: true,
				name: '구분',
				data: ratio,

				data: [
					{
						name: '영화',
						y: ratio[0],
					},
					{
						name: 'TV프로그램',
						y: ratio[1],
					},
				],
				color: '#FF0000',
			},
		],
	};

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '10vh',
	};

	const mainDiv = {
		marginTop: '20px',
		padding: '30px 30px 30px 30px',
		width: '1300px',
		// border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	};

	const fileLabel = {
		display: 'none',
	};

	const gridCSS = {
		display: 'flex',
		flexDirection: 'column',
	};

	const onImgInputBtnClick = (e) => {
		logoImgInput.current.click();
	};

	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<div style={{ display: mainArticle }}>
						<h1>
							여러분의{' '}
							<p style={{ color: 'red', display: 'inline' }}>NETFLIX</p>{' '}
							시청기록을 분석해드립니다.
						</h1>
						<br />
						<img src="/images/analysis.svg" style={{ width: '400px' }} />
						<br />
						<br />
						<Popup
							pinned
							on="click"
							position="bottom center"
							content={
								<Step.Group vertical>
									<Step style={{ display: 'flex', flexDirection: 'column' }}>
										<Step.Content>
											<Step.Title>
												<h1>1. 로그인 후 계정 탭 클릭</h1>
											</Step.Title>
											<Step.Description>
												<img
													style={{ width: '300px' }}
													src="/images/step1.png"
												/>
											</Step.Description>
										</Step.Content>
									</Step>

									<Step>
										<Step.Content>
											<Step.Title>
												<h1>2. 시청기록 클릭</h1>
											</Step.Title>
											<Step.Description>
												<img
													style={{ width: '700px' }}
													src="/images/step2.png"
												/>
											</Step.Description>
										</Step.Content>
									</Step>

									<Step>
										<Step.Content>
											<Step.Title>
												<h1>3. 시청기록 다운로드</h1>
											</Step.Title>
											<Step.Description>
												<img
													style={{ width: '700px' }}
													src="/images/step3.png"
												/>
											</Step.Description>
										</Step.Content>
									</Step>
								</Step.Group>
							}
							trigger={
								<Button color="black">
									<Icon name="pin" />
									시청기록 데이터 다운로드 방법
								</Button>
							}
						/>
						<br />
						<br />
						<Button size="huge" color="orange">
							<CSVReader
								label={'파일 업로드'}
								inputStyle={fileLabel}
								ref={logoImgInput}
								onFileLoaded={(data, fileInfo, originalFile) =>
									fileSet(data, fileInfo, originalFile)
								}
							/>
						</Button>
						<Label size="huge" color="black">
							{fileName}
						</Label>
						<Button size="huge" color="red" onClick={onClickSubmit}>
							분석하기
						</Button>
						<br />
						<Label
							basic
							color="red"
							size="large"
							pointing
							style={{ display: isError }}
						>
							올바른 시청기록 파일이 아닙니다 !
						</Label>
						<div style={{ display: loading }}>
							<Dimmer active>
								<Loader size="massive">시청기록 분석중</Loader>
							</Dimmer>
						</div>
					</div>
					<br />
					<br />
					<Grid style={{ display: visibleChart.chart_1 }}>
						<Grid.Row>
							<Grid.Column width={13}>
								<HighchartsReact highcharts={Highcharts} options={Chart1} />
							</Grid.Column>
							<Grid.Column width={3} style={gridCSS}>
								<br />
								<br />
								<Button size="huge" color="red" id="1" onClick={getChart}>
									일별 시청회수
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="2" onClick={getChart}>
									많이본장르
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="3" onClick={getChart}>
									좋아하는 배우
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="4" onClick={getChart}>
									시청 비율
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid style={{ display: visibleChart.chart_2 }}>
						<Grid.Row>
							<Grid.Column width={13}>
								<HighchartsReact highcharts={Highcharts} options={Chart2} />
							</Grid.Column>
							<Grid.Column width={3} style={gridCSS}>
								<br />
								<br />
								<Button size="huge" color="red" id="1" onClick={getChart}>
									일별 시청회수
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="2" onClick={getChart}>
									많이본장르
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="3" onClick={getChart}>
									좋아하는 배우
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="4" onClick={getChart}>
									시청 비율
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid style={{ display: visibleChart.chart_3 }}>
						<Grid.Row>
							<Grid.Column width={13}>
								<HighchartsReact highcharts={Highcharts} options={Chart3} />
							</Grid.Column>
							<Grid.Column width={3} style={gridCSS}>
								<br />
								<br />
								<Button size="huge" color="red" id="1" onClick={getChart}>
									일별 시청회수
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="2" onClick={getChart}>
									많이본장르
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="3" onClick={getChart}>
									좋아하는 배우
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="4" onClick={getChart}>
									시청 비율
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid style={{ display: visibleChart.chart_4 }}>
						<Grid.Row>
							<Grid.Column width={13}>
								<HighchartsReact highcharts={Highcharts} options={Chart4} />
							</Grid.Column>
							<Grid.Column width={3} style={gridCSS}>
								<br />
								<br />
								<Button size="huge" color="red" id="1" onClick={getChart}>
									일별 시청회수
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="2" onClick={getChart}>
									많이본장르
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="3" onClick={getChart}>
									좋아하는 배우
								</Button>
								<br />
								<br />
								<Button size="huge" color="red" id="4" onClick={getChart}>
									시청 비율
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default Analysis;
