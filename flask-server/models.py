from db_connect import db
from datetime import datetime

class User(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(15), nullable=False)
    user_id = db.Column(db.String(45), nullable=False, unique=True)
    user_pw = db.Column(db.String(45), nullable=False)
    img_path = db.Column(db.String(100)) 

    def __init__(self, name, user_id, user_pw):
        self.name = name
        self.user_id = user_id
        self.user_pw = user_pw
    
class Letter(db.Model):
    
    __tablename__ = 'letter'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.String(300), nullable=False)

    def __init__(self, title, content):
        self.title = title
        self.content = content

class Letter_keyword(db.Model):
    
    __tablename__ = 'letter_keyword'

    letter_id = db.Column(db.Integer, primary_key=True, nullable=False)
    keyword = db.Column(db.String(30), nullable=False)

    def __init__(self, letter_id, keyword):
        self.letter_id = letter_id
        self.keyword = keyword

class User_record(db.Model):
    
    __tablename__ = 'user_record'

    user_id = db.Column(db.String(45), primary_key=True, nullable=False, unique=True)
    file_path = db.Column(db.String(100))

class Movies(db.Model):

    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(300), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    open_year = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.Numeric(precision=2, scale=1), nullable=False)
    running_time = db.Column(db.String(10), nullable=False)
    genre1 = db.Column(db.String(10), nullable=False)
    genre2 = db.Column(db.String(10))
    genre3 = db.Column(db.String(10))
    summary = db.Column(db.Text, nullable=False)