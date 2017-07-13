#coding:utf-8
import sys,urllib
from flask import json
from flask import request
import string,re
from . import apiBp
@apiBp.route('/query',methods=['GET','POST'])
def query():
    data = json.loads(request.form.get('data'))
    ss = data['url']
    print (ss)
    #wp = urllib.request.urlopen(ss)  # 打开连接
    wp = urllib.urlopen(ss)
    content = wp.read()  # 获取页面内容
    content = content.replace('ssrmc','所属人名称')
    content = content.replace('yzmj','养殖面积')
    content = content.replace('yzpz','养殖品种')
    content = content.replace('lxhf','类型划分')
    content = content.replace('fish','')
    #print content
    return content

@apiBp.route('/id',methods=['GET','POST'])
def getID():
    data = json.loads(request.form.get('data'))
    ss = data['url']
    print (ss)
    # wp = urllib.request.urlopen(ss)  # 打开连接
    wp = urllib.urlopen(ss)
    content = wp.read()  # 获取页面内容
    #<td>fish.944</td>
    r='fish\..*</td>'
    if(re.search(r,content)):
        line = re.search(r,content)
        #fish.1138</td>
        r2="\d+"
        id=re.search(r2,line.group())
        #print id.group()
        return id.group()
    return "none"