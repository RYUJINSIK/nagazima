import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import HeaderNav from '../components/HeaderNav';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Rating, Label, Button, Icon } from 'semantic-ui-react';

const Detail = () => {
	// FIXME:
	// 1. 별점 수정
	// 2. 키워드 추출
	// 3. 이미지 TITLE 수정
	const router = useRouter();
	const movie_id = router.asPath.replace('/detail?id=', '');

	const [movieData, setData] = useState([]);
	const [poster, setPoster] = useState('');
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

	useEffect(() => {
		axios
			.get('http://127.0.0.1:5000/detail', {
				params: {
					movie_id,
				},
			})
			.then(({ data }) => {
				setData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		setPoster(`/images/posters/${movieData.title}.jpg`);
	}, [movieData]);

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '50vh',
	};

	const mainDiv = {
		marginTop: '50px',
		padding: '30px 30px 30px 30px',
		width: '1300px',
		border: '1px solid #9e9e9e',
		borderRadius: '10px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const posterImg = {
		width: '350px',
		height: '500px',
	};
	const typeImg = {
		marginBottom: '-10px',
		marginRight: '15px',
		width: '40px',
		height: '40px',
	};
	return (
		<div>
			<HeaderNav />
			<div style={wrapper}>
				<div style={mainDiv}>
					<Grid>
						<Button
							size="large"
							color="red"
							floated="left"
							style={{ marginBottom: '5px' }}
						>
							<Icon name="checkmark" />
							뒤로가기
						</Button>
						<br />
						<Grid.Row>
							<Grid.Column width={5}>
								<img
									src={poster}
									style={posterImg}
									value="posterImg"
									id="posterImg"
								/>
							</Grid.Column>
							<Grid.Column width={11}>
								<h1>
									{/* <img
										src="/images/movie.png"
										style={typeImg}
										value="videoType"
										id="videoType"
									/> */}
									{movieData.title}
								</h1>
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
												<Rating
													defaultRating={4}
													maxRating={5}
													size="large"
													icon="star"
													disabled
												/>
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
											<Label
												color={colorSet[Math.floor(Math.random() * 12)]}
												size="large"
											>
												{movieData.keyword1}
											</Label>
											<Label
												color={colorSet[Math.floor(Math.random() * 12)]}
												size="large"
											>
												{movieData.keyword2}
											</Label>
											<Label
												color={colorSet[Math.floor(Math.random() * 12)]}
												size="large"
											>
												{movieData.keyword3}
											</Label>
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
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default Detail;
