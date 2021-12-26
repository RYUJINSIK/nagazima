from flask import Blueprint, json, render_template, redirect, jsonify, request, session, g
from flask.templating import render_template_string
from db_connect import db
from models import User
from flask_bcrypt import Bcrypt

nagagima = Blueprint('nagagima',__name__)
bcrypt = Bcrypt()

@nagagima.route('/test')
def test():
    return {"members":['안녕하세요', '테스트 중 입니다!!!!!!!']}