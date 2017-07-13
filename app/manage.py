from app import create_app
#from flask_sqlalchemy import  SQLAlchemy
#from app import  db
#from model.NavModel import User
app=create_app()
'''
db = SQLAlchemy()
db.init_app(app)
from app.model import fishDataModel
fishes = fishDataModel.Fish.query.all()
print(fishes)
'''
if __name__=='__main__':
    app.run("127.0.0.1",5000)

