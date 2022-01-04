import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import HeaderNav from '../components/HeaderNav';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Label, Icon, Message, Segment, Grid } from 'semantic-ui-react';

const Index = () => {
	const router = useRouter();
	const [movie, setMovie] = useState([]);
	const [keyword, setKeyword] = useState([]);
	const [keywordSet, setKeywordSet] = useState({
		keyword1: '',
		keyword2: '',
	});
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

	let colorNumSet = [];
	for (let i = 0; i <= 9; i++) {
		colorNumSet[i] = i;
	}

	useEffect(() => {
		axios
			.post('http://127.0.0.1:5000/main')
			.then(({ data }) => {
				setKeyword(data);
				setSelectedOne('');
				setSelectedTwo('');
				setViewSelect({
					...viewSelect,
					one: 'none',
					two: 'none',
				});
				setViewExample({
					...viewExample,
					one: 'inline-block',
					two: 'inline-block',
				});

				let audio = new Audio('/sound/netflix_sound.mp3');
				audio.play();
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
	const selectKeyword = (e) => {
		if (selectedOne === '') {
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
		} else {
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
		axios
			.post('http://127.0.0.1:5000/select ', {
				keyword1: selectedOne,
				keyword2: selectedTwo,
			})
			.then(({ data }) => {
				console.log(data);
				setMovie(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	console.log();

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
					<img src="/images/title33.png" value="home" id="homeImg" />
					<br />
					<div style={mainDiv}>
						<h1 style={{ textAlign: 'center' }}>
							관심있는 키워드 2가지를 선택해주세요
							<Button
								floated="right"
								compact
								size="huge"
								color="black"
								style={refreshButton}
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
					<Button color="red" animated size="massive" onClick={getMovieData}>
						<Button.Content visible>영상 추천받기</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow circle right" />
						</Button.Content>
					</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<HeaderNav />
				<div style={wrapper}>
					<div style={movieDiv}>
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
						<Grid>
							<Grid.Row>
								{movie.length &&
									movie.map((data, index) => {
										let poster = `/images/posters/${data[1]}.jpg`;
										return (
											<>
												<Grid.Column width={3}>
													<img
														src={poster}
														style={{
															paddingBottom: '20px',
															paddingTop: '20px',
														}}
														value={data[0]}
														id={data[0]}
													/>
												</Grid.Column>
											</>
										);
									})}
							</Grid.Row>
						</Grid>
					</div>
				</div>
			</div>
		);
	}
};

export default Index;
