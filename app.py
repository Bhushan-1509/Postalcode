# from flask import Flask,send_from_directory,render_template,jsonify,sessions
# from flask import send_from_directory,redirect,url_for
# from flask_bootstrap import Bootstrap
from flask import *
import json
import os
import requests
import sys
import csv
import pandas
from flask_session import Session



with open('config.json') as data_file:
    config = json.load(data_file)

app = Flask(__name__, static_url_path='')
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)



@app.route('/')
def index():
    return render_template("index.html")

@app.route('/search-by-pin')
def searchByPin():
    return render_template("searchByPin.html")

@app.route('/search-by-post-office')
def searchByPostOffice():
    return render_template("searchByPostOffice.html")

@app.route('/findStates')
def findStates():
    req = requests.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')

    statesData = req.json()
    return jsonify(statesData)

@app.route('/findDistricts/<state_id>')
def findDistricts(state_id):
    req = requests.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/{s_id}'.format(s_id = state_id))
    statesData = req.json()
    return jsonify(statesData)

if __name__ == '__main__':
    app.run(debug=True,host=config['host'],port=config['port'])

