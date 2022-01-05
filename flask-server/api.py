#알파벳 순서로 (자동화 툴도 있음)
#파이썬 원래 기능
import random
#추가적으로 내가 깐거
import csv
from flask import Flask,Blueprint, json, render_template, redirect, jsonify, request, current_app
from flask_bcrypt import Bcrypt
import numpy as np
from werkzeug.utils import secure_filename
import jwt
#로컬 내가 작성한것
from db_connect import db
from models import *



app = Flask(__name__)
nagagima = Blueprint('nagagima',__name__)

bcrypt = Bcrypt()

header = {
    'typ': 'JWT',
    'alg': 'HS256'
}

algorithm = 'HS256'

def keyword_find(movie_id):
    keywords=[]
    genre = MoviesAndGenre.query.filter(MoviesAndGenre.movie_id == movie_id).all()
    for id in genre:
        keyword_id = GenreAndKeyword.query.filter(GenreAndKeyword.genre_id == id.genre_id).all()
        for id in keyword_id:
            key = Keyword.query.filter(Keyword.id == id.keyword_id).first()
            keywords.append(key.keyword)

    return keywords

def recommand_keyword(keyword):
    movies = []
    keyword_id = Keyword.query.filter(Keyword.keyword == keyword).first()
    genre_keyword = GenreAndKeyword.query.filter(GenreAndKeyword.keyword_id == keyword_id.id).first()

    movie_genre = MoviesAndGenre.query.filter(MoviesAndGenre.genre_id == genre_keyword.genre_id).all()
    for movie_list in movie_genre:
        movie = Movies.query.filter(Movies.id == movie_list.movie_id).first()
        movies.append([movie.id, movie.title])

    return movies

def recommand_genre(keyword):
    movies = []
    genre_id = Genre.query.filter(Genre.genre == keyword).first()
    genre_movie = MoviesAndGenre.query.filter(MoviesAndGenre.genre_id == genre_id.id).all()
    for movie_list in genre_movie:
        movie = Movies.query.filter(Movies.id == movie_list.movie_id).first()
        movies.append([movie.id, movie.title])
    
    return movies



@nagagima.route('/', methods=['GET','POST'])
def start():
    if request.method == 'GET':
        return '서버 실행중,,'

    else:
        user = request.json
        token = user['token']
        #jwt 관련 라이브러리
        secret_key = current_app.config['JWT_SECRET_KEY']

        d = jwt.decode(token, secret_key, algorithm)
        
        return jsonify({'result':d})

@nagagima.route('/test', methods=['GET'])
def test():
    nn = recommand_genre('범죄')
    print(nn)

    
    return "test.,,,"

#메인페이지 키워드 10개 보내주기
@nagagima.route('/main', methods=['GET']) #GET??으로?? DB에 따로 저장하는 액션이 없으면 get으로
def main():
    keywords = []
    
    keyword_num = Keyword.query.count()
    genre_num = Genre.query.count()
    rannum_1 = random.sample(range(0,keyword_num),7)
    rannum_2 = random.sample(range(0,genre_num),3)
    for i in rannum_1:
        key = Keyword.query.filter(Keyword.id == i).first()
        keywords.append(key.keyword)
    for i in rannum_2:
        key = Genre.query.filter(Genre.id == i).first()
        keywords.append(key.genre)
        print(key.genre)

    return jsonify(keywords)

@nagagima.route('/select', methods=['GET'])
def select():
    #키워드 프론트에서 받아와야 함// 받아오기 전 테스트 중 
    # print(keywords)
    keyword_1 = request.args.get('keyword1')
    keyword_2 = request.args.get('keyword2')

    check_1 = Keyword.query.filter(Keyword.keyword == keyword_1).first()
    check_2 = Keyword.query.filter(Keyword.keyword == keyword_2).first()
    

    if check_1 is not None and check_2 is not None:
        movie_1 = recommand_keyword(keyword_1)
        movie_2 = recommand_keyword(keyword_2)
    elif check_1 is not None and check_2 is None:
        movie_1 = recommand_keyword(keyword_1)
        movie_2 = recommand_genre(keyword_2)
    elif check_1 is None and check_2 is not None:
        movie_1 = recommand_genre(keyword_1)
        movie_2 = recommand_keyword(keyword_2)
    else:
        movie_1 = recommand_genre(keyword_1)
        movie_2 = recommand_genre(keyword_2)

    movies = movie_1 + movie_2

    rannum = random.sample(range(0,len(movies)),10)

    random_movie = []
    for i in rannum:
        random_movie.append(movies[i])
    #이름이랑 id 보내기
    return jsonify(random_movie)

#회원가입
@nagagima.route('/signin', methods=['POST'])
def join():
    # 출력잘되는지 확인
    # print(request.json)
    # print(request.json['id'])
    
    user_id = request.json['id']
    user_pw = request.json['password']
    pw_hash = bcrypt.generate_password_hash(user_pw)
    name = request.json['name']

    try:
        user = User(name, user_id, pw_hash)
    #status 코드 - 200, 400(클라이언트 문제), 500(서버문제) 내가 적어서
        return 'success'
    #에러메시지 -> 정교하게 작성
    except:
        return 'fail'

#id 중복 체크
@nagagima.route('/idchk', methods=['POST'])
def idchk():
    #print(request.json)
    user_id = request.json['id']
    user = User.query.filter(User.user_id == user_id).first()

    if user is None:
        return 'Ok'
    else:
        return 'No' 
    

#로그인
@nagagima.route('/login', methods=['POST'])
def login():
    secret_key = current_app.config['JWT_SECRET_KEY']
    
    user_id = request.json['id']
    user_pw = request.json['password'] #pw? password? 데이터 넘어오는거 확인해야함

    user = User.query.filter(User.user_id == user_id).first()

    if user is not None: #id가 있을 때 
        if bcrypt.check_password_hash(user.user_pw, user_pw): #비밀번호 확인
                
                payload = {
                'email': user.user_id,
                'name': user.name
                }

                jwt_token = jwt.encode(payload, secret_key, algorithm)
                
                #d = jwt.decode(jwt_token, secret_key, algorithm) //decode

                return jsonify({'name':user.name, 'token':jwt_token})
        else : #비밀번호 틀림
                return 'fail'
    else: # id없는데 로그인하면 실패
        return 'fail'

#로그아웃
@nagagima.route('/logout', methods=['POST'])
def logout():
    try:
        return '로그아웃'
    except:
        return '로그아웃 실패??'


#영화 상세페이지
@nagagima.route('/detail', methods=['GET'])
def detail():

    movie_id = request.args.get('movie_id')
    movie_id = int(movie_id)
    
    movie = Movies.query.filter(Movies.id == movie_id).first() 

    id = movie.id
    title = movie.title
    type = movie.type
    open_year = movie.open_year
    rate = movie.rate
    running_time = movie.running_time
    genre1 = movie.genre1
    genre2 = movie.genre2
    genre3 = movie.genre3
    summary = movie.summary

    keywords = keyword_find(movie_id)
    rannum = random.sample(range(0,len(keywords)),3)
    
    return jsonify({'id':id, 'title':title, 'type':type, 'open_year':open_year, 
    'rate':rate, 'running_time':running_time, 'genre1':genre1, 'genre2': genre2, 
    'genre3':genre3, 'summary':summary, 'keyword1':keywords[rannum[0]], 
    'keyword2': keywords[rannum[1]], 'keyword3': keywords[rannum[2]]})

