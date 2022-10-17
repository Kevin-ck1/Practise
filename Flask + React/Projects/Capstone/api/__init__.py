from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_login import LoginManager



#Setting up a database object
db = SQLAlchemy()

#Setting up a Marshmallow object
ma = Marshmallow()

#Setting up decryption algorithm
decrypt = Bcrypt()

#Setting up login manager
login_manager = LoginManager()




def create_app():
    # Initialiazing the app
    app = Flask(__name__)

    #Settting up the base directory - this allows us to locate the path to the database
    import os #To set out file paths
    basedir = os.path.abspath(os.path.dirname(__file__))

    #Confirg settings for the database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # This is optional
    #Setting up secret key for the use of sessions
    SECRET_KEY = os.urandom(32)
    app.config['SECRET_KEY'] = SECRET_KEY

    #Initialiaze a database + Marshmellow 
    db.init_app(app)
    ma.init_app(app)
    #Initialiazing decryption algorithm
    decrypt.init_app(app)

    #Initialiazing the login manager
    login_manager.init_app(app)

    #Setting up the blueprints
    from .views import main #Importing the blue  prints
    app.register_blueprint(main, url_prefix="")

    #In this case to create the database we call it at the last instance
    from .models import Movie #Importing the models to the project - Note that it should be called after the db instance
    
    with app.app_context():
        db.create_all()

    return app