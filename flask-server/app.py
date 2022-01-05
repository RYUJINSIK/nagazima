import pymysql
from flask import Flask, json, request, jsonify, session
from flask_cors import CORS
from flask.templating import render_template
import xml.etree.ElementTree as elemTree
from api import nagagima
from db_connect import db
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.register_blueprint(nagagima)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:93990@127.0.0.1:3307/nagagima"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

tree = elemTree.parse('keys.xml')
secret_key = tree.find('string[@name="secret_key"]').text
app.config['SECRET_KEY'] = secret_key
app.config['JWT_SECRET_KEY'] = 'your_secret_key_for_jwtklkl'

db.init_app(app)
bcrypt = Bcrypt(app)

if __name__ == '__main__':
    app.run(debug=True)

