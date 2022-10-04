from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt


#Setting up a database object
db = SQLAlchemy()

#Setting up a Marshmallow object
ma = Marshmallow()

#Setting up decryption algorithm
decrypt = Bcrypt()




def create_app():
    # Initialiazing the app
    app = Flask(__name__)

    #Settting up the base directory - this allows us to locate the path to the database
    import os #To set out file paths
    basedir = os.path.abspath(os.path.dirname(__file__))

    #Confirg settings for the database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # This is optional
    #app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

    #Initialiaze a database + Marshmellow 
    db.init_app(app)
    ma.init_app(app)
    #Initialiazing decryption algorithm
    decrypt.init_app(app)

    #Setting up the blueprints
    from .views import main #Importing the blue  prints
    app.register_blueprint(main, url_prefix="")

    #In this case to create the database we call it at the last instance
    from .models import Movie #Importing the models to the project - Note that it should be called after the db instance
    
    with app.app_context():
        db.create_all()

    return app