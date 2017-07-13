#coding:utf-8
from app import db
class Fish(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    #username = db.Column(db.String(80), unique=True)
    #email = db.Column(db.String(120), unique=True)
    gid = db.Column(db.Integer,primary_key=True)
    ssrmc=db.Column(db.CHAR(50),nullable=True)
    yzmj= db.Column(db.Float,nullable=True)
    yzpz=db.Column(db.CHAR(50),nullable=True)
    lxhf=db.Column(db.CHAR(20),nullable=True)
    ssxz=db.Column(db.CHAR(50),nullable= True)

    def __init__(self,name,area,pinzhong,type):
        self.ssrmc = name
        self.yzmj = area
        self.yzpz = pinzhong
        self.lxhf = type

    def __repr__(self):
        return '<Fish %r>' % self.ssrmc
#fishes = Fish.query.all()
#print(fishes)