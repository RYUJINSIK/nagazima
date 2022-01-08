from flask import Flask, json, request, jsonify, session
from flask_cors import CORS
from flask.templating import render_template
import pymysql
import xml.etree.ElementTree as elemTree
from api import nagagima
from db_connect import db



app = Flask(__name__)
app.register_blueprint(nagagima)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:93990@localhost:3306/nagagima"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

tree = elemTree.parse('keys.xml')
secret_key = tree.find('string[@name="secret_key"]').text
app.config['SECRET_KEY'] = secret_key


db.init_app(app)


if __name__ == '__main__':
    app.run(debug=True)

