import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';

import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import axios from 'axios';
import { Animated } from 'react-animated-css';
import { useRouter } from 'next/router';
import {
	Button,
	Label,
	Icon,
	Dimmer,
	Loader,
	Grid,
	Rating,
} from 'semantic-ui-react';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const Index = () => {
	const router = useRouter();
	const [movie, setMovie] = useState([]);
	const [keyword, setKeyword] = useState([]);
	const [movieData, setData] = useState([]);
	const [loading, setLoading] = useState('inline-block');
	const [isError, setIsError] = useState('none');
	let colorSet = [
		'red',
		'orange',
		'yellow',
		'olive',
		'green',
		'teal',
		'blue',
		'violet',
		'purple',
		'pink',
		'brown',
		'grey',
	];

	const [selectedOne, setSelectedOne] = useState('');
	const [colorOne, setColorOne] = useState('');
	const [selectedTwo, setSelectedTwo] = useState('');
	const [colorTwo, setColorTwo] = useState('');
	const [viewSelect, setViewSelect] = useState({
		one: 'none',
		two: 'none',
	});
	const [viewExample, setViewExample] = useState({
		one: 'inline-block',
		two: 'inline-block',
	});

	let colorNumSet = [];
	for (let i = 0; i <= 9; i++) {
		colorNumSet[i] = i;
	}

	const refreshKeyword = () => {
		getData();
	};

	const keywordSetting = (data) => {
		setKeyword(data);
	};

	const getData = () => {
		axios
			.get(
				'http://elice-kdt-3rd-team-07.koreacentral.cloudapp.azure.com/api/main',
			)
			.then(({ data }) => {
				keywordSetting(data);
				setLoading('none');
			})
			.catch((err) => {
				console.log(err);
				setLoading('none');
			});
	};

	useEffect(() => {
		getData();
		let audio = new Audio('/sound/netflix_sound.mp3');
		audio.play();
	}, []);

	const selectKeyword = (e) => {
		if (selectedOne === '' && e.target.innerText !== selectedTwo) {
			console.log(e.target.innerText);

			setColorOne(e.target.name);
			setSelectedOne(e.target.innerText);
			setViewSelect({
				...viewSelect,
				one: 'inline-block',
			});
			setViewExample({
				...viewExample,
				one: 'none',
			});
		} else if (selectedTwo === '' && e.target.innerText !== selectedOne) {
			console.log(e.target.innerText);

			setColorTwo(e.target.name);
			setSelectedTwo(e.target.innerText);
			setViewSelect({
				...viewSelect,
				two: 'inline-block',
			});
			setViewExample({
				...viewExample,
				two: 'none',
			});
		}
	};

	const getDetailPage = (movie_id) => {
		axios
			.get('http://127.0.0.1:5000/api/detail', {
				params: {
					movie_id,
				},
			})
			.then(({ data }) => {
				console.log(data);
				setData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteKeyword = (e) => {
		if (selectedOne === e.target.innerText) {
			setSelectedOne('');
			setViewSelect({
				...viewSelect,
				one: 'none',
			});
			setViewExample({
				...viewExample,
				one: 'inline-block',
			});
		} else {
			setSelectedTwo('');
			setViewSelect({
				...viewSelect,
				two: 'none',
			});
			setViewExample({
				...viewExample,
				two: 'inline-block',
			});
		}
	};

	const getMovieData = () => {
		if (selectedOne === '' || selectedTwo === '') {
			setIsError('inline-block');
			return;
		}

		axios
			.get('http://127.0.0.1:5000/api/select', {
				params: {
					keyword1: selectedOne,
					keyword2: selectedTwo,
				},
			})
			.then(({ data }) => {
				console.log(data);
				setMovie(data);
				getDetailPage(data[0][0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		console.log('movie set ! ');
	}, [movie]);

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
		border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};
	const movieDiv = {
		padding: '30px 30px 30px 30px',
		width: '1000px',
		// border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};
	const detailDiv = {
		padding: '30px 30px 30px 30px',
		width: '100%',
		// border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const btnArea = {
		textAlign: 'center',
	};

	const keywordButton = {
		margin: '10px',
	};

	const refreshButton = {
		padding: '10px 5px 10px 15px',
	};

	if (movie.length === 0) {
		return (
			<div>
				<HeaderNav />
				<div style={wrapper}>
					<div style={{ display: loading }}>
						<Dimmer active>
							<Loader size="massive">데이터 세팅중</Loader>
						</Dimmer>
					</div>
					{/* <img src="/images/title33.png" value="home" id="homeImg" /> */}
					<br />
					<div style={mainDiv}>
						<h1 style={{ textAlign: 'center' }}>
							관심있는 키워드 혹은 장르 2가지를 선택해주세요
							<Button
								floated="right"
								compact
								size="huge"
								color="black"
								style={refreshButton}
								onClick={refreshKeyword}
							>
								<Icon name="redo" />
							</Button>
						</h1>
						<br />
						<div style={btnArea}>
							{keyword.length &&
								keyword.map((data, index) => {
									if (index === 4) {
										return (
											<>
												<Label
													size="massive"
													color={colorSet[colorNumSet[index]]}
													as="a"
													style={keywordButton}
													name={colorNumSet[index]}
													value={colorNumSet[index]}
													onClick={selectKeyword}
												>
													{data}
												</Label>
												<br />
											</>
										);
									} else {
										return (
											<Label
												size="massive"
												color={colorSet[colorNumSet[index]]}
												as="a"
												style={keywordButton}
												name={colorNumSet[index]}
												value={colorNumSet[index]}
												onClick={selectKeyword}
											>
												{data}
											</Label>
										);
									}
								})}
						</div>
					</div>
					<br />
					<br />
					<div style={mainDiv}>
						<h1 style={{ textAlign: 'center' }}>
							오늘은&nbsp;&nbsp;
							<Label
								size="massive"
								style={{ display: viewExample.one }}
								color="grey"
								as="a"
								onClick={deleteKeyword}
							>
								키워드1
								<Icon
									name="close"
									value={selectedOne}
									onClick={deleteKeyword}
								/>
							</Label>
							<Label
								size="massive"
								style={{ display: viewSelect.one }}
								color={colorSet[colorOne]}
								as="a"
								value={selectedOne}
								onClick={deleteKeyword}
							>
								{selectedOne}
								<Icon
									name="close"
									value={selectedOne}
									onClick={deleteKeyword}
								/>
							</Label>
							<Label
								size="massive"
								style={{ display: viewExample.two }}
								color="grey"
								as="a"
								onClick={deleteKeyword}
							>
								키워드2
								<Icon
									name="close"
									value={selectedOne}
									onClick={deleteKeyword}
								/>
							</Label>
							<Label
								size="massive"
								style={{ display: viewSelect.two }}
								color={colorSet[colorTwo]}
								as="a"
								onClick={deleteKeyword}
							>
								{selectedTwo}
								<Icon name="close" onClick={deleteKeyword} />
							</Label>{' '}
							&nbsp;&nbsp;와 관련있는 영상이 보고싶어 !
						</h1>
					</div>
					<br />
					<br />
					<div>
						<Button color="red" animated size="massive" onClick={getMovieData}>
							<Button.Content visible>영상 추천받기</Button.Content>
							<Button.Content hidden>
								<Icon name="arrow circle right" />
							</Button.Content>
						</Button>
						<Label
							basic
							color="red"
							pointing="left"
							size="big"
							style={{ display: isError }}
						>
							키워드를 두가지 모두 선택해주세요 !
						</Label>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<>
				<head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
					/>
				</head>
				<div>
					<HeaderNav />
					<div style={wrapper}>
						<div style={detailDiv}>
							<Grid>
								<br />
								<Grid.Row>
									<Grid.Column width={8}>
										<h1 style={{ textAlign: 'center' }}>
											선택한 키워드 &nbsp;
											<Label size="massive" color={colorSet[colorOne]} as="a">
												{selectedOne}
											</Label>
											&nbsp;
											<Label size="massive" color={colorSet[colorTwo]} as="a">
												{selectedTwo}
											</Label>
											&nbsp; 에 대한 추천결과입니다 !
										</h1>
										<Swiper
											effect={'coverflow'}
											grabCursor={true}
											centeredSlides={true}
											onSlideChange={(e) => {
												getDetailPage(movie[e.activeIndex][0]);
											}}
											slidesPerView={'3'}
											coverflowEffect={{
												rotate: 50,
												stretch: 0,
												depth: 100,
												modifier: 1,
												slideShadows: true,
											}}
											pagination={true}
											className="mySwiper"
										>
											{movie.length &&
												movie.map((data) => (
													<SwiperSlide>
														<img
															src={`/images/posters/${data[0]}.jpg`}
															style={{
																paddingBottom: '20px',
																paddingTop: '20px',
															}}
															id={data[0]}
														/>
													</SwiperSlide>
												))}
										</Swiper>
									</Grid.Column>

									<Grid.Column width={8}>
										<Animated
											animationIn="fadeInUp"
											animationInDuration={2000}
											isVisible={true}
										>
											<h1>{movieData.title}</h1>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>개봉년도</h3>
													</Grid.Column>
													<Grid.Column width={12}>
														<h3>{movieData.open_year}</h3>
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>평점</h3>
													</Grid.Column>
													<Grid.Column width={12}>
														<h3>
															{/* <Rating
																defaultRating={4}
																maxRating={5}
																size="large"
																icon="star"
																disabled
															/> */}
															{movieData.rate}
														</h3>
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>장르</h3>
													</Grid.Column>
													<Grid.Column width={12}>
														{movieData.genre1 ? (
															<Label
																color={colorSet[Math.floor(Math.random() * 12)]}
																size="large"
															>
																{movieData.genre1}
															</Label>
														) : (
															<></>
														)}
														{movieData.genre2 ? (
															<Label
																color={colorSet[Math.floor(Math.random() * 12)]}
																size="large"
															>
																{movieData.genre2}
															</Label>
														) : (
															<></>
														)}
														{movieData.genre3 ? (
															<Label
																color={colorSet[Math.floor(Math.random() * 12)]}
																size="large"
															>
																{movieData.genre3}
															</Label>
														) : (
															<></>
														)}
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>키워드</h3>
													</Grid.Column>
													<Grid.Column width={12}>
														{movieData.keywords &&
															movieData.keywords.map((data) => (
																<Label
																	color={
																		colorSet[Math.floor(Math.random() * 12)]
																	}
																	size="large"
																>
																	{data}
																</Label>
															))}
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>상영시간</h3>
													</Grid.Column>
													<Grid.Column width={12}>
														<h3>{movieData.running_time}</h3>
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<br />
											<Grid>
												<Grid.Row>
													<Grid.Column width={4}>
														<h3>줄거리</h3>
													</Grid.Column>
												</Grid.Row>
											</Grid>
											<h4>{movieData.summary}</h4>
											<br />
										</Animated>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default Index;
