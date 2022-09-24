from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os #To set out file paths
#from .views import main #Importing the blue  prints
#from .models import Movie



# Initialiazing the app
app = Flask(__name__)

#Settting up the base directory - this allows us to locate the path to the database
basedir = os.path.abspath(os.path.dirname(__file__))

#Confirg settings for the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # This is optional

#Setting up a database object
db = SQLAlchemy(app)

#Initialiaze Marshmellow - Note the order of initializing db and ma matters
ma = Marshmallow(app)

from .views import main #Importing the blue  prints
#Setting up the blueprints
app.register_blueprint(main, url_prefix="")


#Importing the models to the project - Note that it should be called after the db instance
from .models import Movie

#In this case to create the database we call it at the last instance
db.create_all()   

#Run Server      
if __name__ == '__main__': 
    app.run(debug=True)