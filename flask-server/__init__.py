from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/members')
def members():
    return {"members":["M1","M2"]}

if __name__ == "__main__":
    app.run(debug=True)