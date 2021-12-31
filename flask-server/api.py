from flask import Flask,Blueprint, json, render_template, redirect, jsonify, request, session, g, current_app
from db_connect import db
from models import User
from flask_bcrypt import Bcrypt
import jwt

app = Flask(__name__)
nagagima = Blueprint('nagagima',__name__)

bcrypt = Bcrypt()

header = {
    'typ': 'JWT',
    'alg': 'HS256'
}

algorithm = 'HS256'


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