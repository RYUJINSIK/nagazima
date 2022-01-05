from datetime import datetime
from db_connect import db


class User(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(15), nullable=False)
    user_id = db.Column(db.String(45), nullable=False, unique=True)
    user_pw = db.Column(db.String(45), nullable=False)

    def __init__(self, name, user_id, user_pw):
        self.name = name
        self.user_id = user_id
        self.user_pw = user_pw
    
#안바뀌는 데이터 200개? 그정돈 그냥 변수로 저장, 확장이나 변화 생각하면서 테이블 만들기 
class Movies(db.Model):
# genre1 이라고 해도됨
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(300), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    open_year = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.String(5), nullable=False)
    running_time = db.Column(db.String(50), nullable=False)
    genre1 = db.Column(db.String(10), nullable=False)
    genre2 = db.Column(db.String(10))
    genre3 = db.Column(db.String(10))
    summary = db.Column(db.Text, nullable=False)

class Genre(db.Model):

    __tablename__ = 'genre'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    genre = db.Column(db.String(15), nullable=False)

class MoviesAndGenre(db.Model):
    
    __tablename__ = 'movies_and_genre'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    movie_id = db.Column(db.Integer, nullable=False)
    genre_id = db.Column(db.Integer, nullable=False)

class GenreAndKeyword(db.Model):
    
    __tablename__ = 'genre_and_keyword'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True) 
    genre_id = db.Column(db.Integer, nullable=False)
    keyword_id = db.Column(db.Integer, nullable=False)

class Keyword(db.Model):
    
    __tablename__ = 'keyword'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    keyword = db.Column(db.String(30), nullable=False)

