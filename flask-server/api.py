from flask import Flask,Blueprint, json, render_template, redirect, jsonify, request, session, g, current_app
from db_connect import db
from models import *
from flask_bcrypt import Bcrypt
import jwt
import random

app = Flask(__name__)
nagagima = Blueprint('nagagima',__name__)

bcrypt = Bcrypt()

header = {
    'typ': 'JWT',
    'alg': 'HS256'
}

algorithm = 'HS256'

def keyword(movie_id):
    keywords=[]
    genre = Movies_and_Genre.query.filter(Movies_and_Genre.movie_id == movie_id).all()
    for id in genre:
        keyword = Genre_and_Keyword.query.filter(Genre_and_Keyword.genre_id == id.genre_id).all()
        for key in keyword:
            keywords.append(key.keyword)

    return keywords



@nagagima.route('/', methods=['GET','POST'])
def start():
    if request.method == 'GET':
        return '서버 실행중,,'

    else:
        user = request.json
        token = user['token']
        
        secret_key = current_app.config['JWT_SECRET_KEY']

        d = jwt.decode(token, secret_key, algorithm)
        
        print(d)
        
        return jsonify({'result':d})

@nagagima.route('/test', methods=['GET'])
def test():
    genre = Movies_and_Genre.query.filter(Movies_and_Genre.movie_id == 0).all()
    print(genre)
    return "test.,,,"

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
        db.session.add(user)
        db.session.commit()

        return 'success'
    
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
        session['login'] = None
        return '로그아웃'
    except:
        return '로그아웃 실패??'


#영화 상세페이지
@nagagima.route('/detail', methods=['POST'])
def detail():
    data = request.json
    movie_id = data['movie_id']
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

    keywords = keyword(movie_id)
    rannum = random.sample(range(0,len(keywords)),3)

    # keywords=[]
    # genre = Movies_and_Genre.query.filter(Movies_and_Genre.movie_id == movie_id).all()
    # for id in genre:
    #     keyword = Genre_and_Keyword.query.filter(Genre_and_Keyword.genre_id == id.genre_id).all()
    #     for key in keyword:
    #         keywords.append(key.keyword)
    
    # rannum = random.sample(range(0,len(keywords)),3)

    # print(keywords[rannum[0]])
    
    return json.dumps({'id':id, 'title':title, 'type':type, 'open_year':open_year, 
    'rate':rate, 'running_time':running_time, 'genre1':genre1, 'genre2': genre2, 
    'genre3':genre3, 'summary':summary, 'keyword1':keywords[rannum[0]], 
    'keyword2': keywords[rannum[1]], 'keyword3': keywords[rannum[2]]})


