#coding:utf-8
from flask import render_template,redirect,url_for

from . import authorityBp
from ..api.AppInfo import APP
#login
@authorityBp.route('/',methods=['GET','POST'])
def index():
    return render_template('index.html',title='')

@authorityBp.route('/login',methods=['GET','POST'])
def login():
    return "TODO"
