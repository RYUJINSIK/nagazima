from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'hello world'

@app.route('/members')
def members():
    return {"members":["M1","M2"]}

@app.route('/test')
def test():
    return {"members":['안녕하세요', '테스트 중 입니다.']}


if __name__ == "__main__":
    app.run(debug=True)