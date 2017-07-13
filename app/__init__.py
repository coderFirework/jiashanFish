from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from flask_bootstrap import Bootstrap

def create_app():
    app=Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:vgelab010@119.23.128.14:5432/jiashanFish'
    app.app_context().push()
    db.init_app(app)
    #initial db first,then load Db module
    from .authority import authorityBp as authority_blueprint
    from .api import apiBp as apiBp_blueprint
    app.register_blueprint(authority_blueprint)
    app.register_blueprint(apiBp_blueprint)
    bootstrap = Bootstrap(app)



    #app.app_context().push();
    #db = SQLAlchemy(app)


    return app

