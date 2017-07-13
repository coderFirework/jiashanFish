# coding:utf-8
from app.model import fishDataModel
from flask import request
from flask import json
from . import apiBp
import psycopg2
import string


@apiBp.route('/modify', methods=['GET', 'POST'])
# Modify recoder by id,
def modify():
    data = json.loads(request.form.get('data'))
    id = data['gid']
    name = data['name']
    area = data['area']
    pinzhong = data['pinzhong']
    type = data['type']
    # print("name is:"+name)

    fish = fishDataModel.Fish.query.filter_by(gid=id).first()
    fish.ssrmc = name
    fish.yzmj = area
    fish.yzpz = pinzhong
    fish.lxhf = type
    fishDataModel.db.session.commit()
    return (fish.yzpz)


#
@apiBp.route('/initialssxz', methods=['GET', 'POST'])
# def initialssxz():
#     data = json.loads(request.form.get('data'))
#     id = data['gid']
#     ssxz = data['ssxz']
#
#     fish = fishDataModel.Fish.query.filter_by(gid=id).first()
#     fish.ssxz = ssxz
#     fishDataModel.db.session.commit()
#     return (fish.ssxz)
def initialssxz():
    data = json.loads(request.form.get('data'))
    id = data['gid']
    ssxz = data['ssxz']

    fish = fishDataModel.Fish.query.filter_by(gid=id).first()
    fish.ssxz = ssxz
    fishDataModel.db.session.commit()
    return (fish.ssxz)


@apiBp.route('/getAreaInfo', methods=['GET', 'POST'])
def getAreaInfo():
    data = json.loads(request.form.get('data'))
    xz = data["ssxz"]
    type = data["lxhf"]
    amin = data["min"]
    amax = data["max"]
    print amax;
    if amax == "最大值".decode("utf-8"):
        amax = '10000'
    print amax;
    # 数据库连接参数
    connect = psycopg2.connect(database="jiashanFish", user="postgres", password="vgelab010", host="119.23.128.14",
                               port="5432")
    cur = connect.cursor()
    if amin != "0" or amax != "最大值" and amin != "" and amax != "":
        if type == "all":
            sql = "SELECT sum(yzmj) FROM fish WHERE ssxz=" + "'" + xz + "'" + "and yzmj>=" + amin + " and yzmj<=" + amax
            # print sql
        else:
            sql = "SELECT sum(yzmj) FROM fish WHERE ssxz=" + "'" + xz + "'" + " and lxhf=" + "'" + type + "'" + "and yzmj>=" + amin + " and yzmj<=" + amax
            # print sql
    else:
        if type == "all":
            sql = "SELECT sum(yzmj) FROM fish WHERE ssxz=" + "'" + xz + "'"
            # print sql
        else:
            sql = "SELECT sum(yzmj) FROM fish WHERE ssxz=" + "'" + xz + "'" + " and lxhf=" + "'" + type + "'"
            # print sql
    cur.execute(sql)
    rows = cur.fetchall()
    for i in rows:
        mj = str(i[0]).decode("utf-8")
        if mj == "None":
            mj = "0"
    connect.commit()
    cur.close()
    connect.close()
    return mj


@apiBp.route('/getAreaByName', methods=['GET', 'POST'])
def getAreaByName():
    namearr = ["姚庄镇", "陶庄镇", "罗星街道", "西塘镇", "惠民街道", "大云镇", "天凝镇", "干窑镇", "魏塘街道"]
    # data = json.loads(request.form.get('data'))
    # xz = data["ssxz"]
    # 数据库连接参数
    connect = psycopg2.connect(database="jiashanFish", user="postgres", password="vgelab010", host="119.23.128.14",
                               port="5432")
    cur = connect.cursor()
    allinfo = []
    for k in namearr:
        sql = "SELECT lxhf,sum(yzmj) FROM fish WHERE ssxz=" + "'" + k + "'" + " group by lxhf"
        cur.execute(sql)
        rows = cur.fetchall()
        arr = [0, 0, 0, 0, 0]
        for j in rows:
            type = str(j[0]).decode("utf-8")
            mj = j[1]
            if type == "围养".decode("utf-8"):
                arr[1] = mj
            elif type == "鱼塘".decode("utf-8"):
                arr[2] = mj
            elif type == "外荡".decode("utf-8"):
                arr[3] = mj
            elif type == "未归类".decode("utf-8"):
                arr[4] = mj
        arr[0] = arr[1]+ arr[2] + arr[3] + arr[4]
        allinfo.append(arr)
    print allinfo
    connect.commit()
    cur.close()
    connect.close()
    return str(allinfo)


@apiBp.route('/getAllArea', methods=['GET', 'POST'])
def getAllArea():
    connect = psycopg2.connect(database="jiashanFish", user="postgres", password="vgelab010", host="119.23.128.14",
                               port="5432")
    cur = connect.cursor()
    sql = "SELECT lxhf,sum(yzmj) FROM fish  group by lxhf"
    cur.execute(sql)
    rows = cur.fetchall()
    arr = [0, 0, 0, 0, 0]
    for i in rows:
        type = str(i[0]).decode("utf-8")
        mj = i[1]
        if type == "围养".decode("utf-8"):
            arr[1] = mj
        elif type == "鱼塘".decode("utf-8"):
            arr[2] = mj
        elif type == "外荡".decode("utf-8"):
            arr[3] = mj
        elif type == "未归类".decode("utf-8"):
            arr[4] = mj
    arr[0] = arr[1] + arr[2] + arr[3] + arr[4]
    print arr[0]
    connect.commit()
    cur.close()
    connect.close()
    return str(arr).decode("utf-8")
