from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from datetime import timedelta


#Setting up a database object
db = SQLAlchemy()

#Setting up a Marshmallow object
ma = Marshmallow()

#Setting up decryption algorithm
decrypt = Bcrypt()

#Setting up login manager
login_manager = LoginManager()

#Setting up JWT Manager
jwt_manager = JWTManager()




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

    # To change exp time of the tokens
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=5)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(seconds=10)

    #Initialiaze a database + Marshmellow 
    db.init_app(app)
    ma.init_app(app)
    #Initialiazing decryption algorithm
    decrypt.init_app(app)

    #Initialiazing the login manager
    login_manager.init_app(app)
    
    login_manager.login_view = 'login'
    login_manager.login_message_category = 'info'

    from .models import User
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    #Initialiazing the jwt manager
    jwt_manager.init_app(app)

    #Setting up the blueprints
    from .views import main #Importing the blue  prints
    app.register_blueprint(main, url_prefix="")

    #In this case to create the database we call it at the last instance
    from .models import Movie #Importing the models to the project - Note that it should be called after the db instance
    
    with app.app_context():
        db.create_all()

    return app