# Flask + React

## Flask

Installation - Flask

First step is to create a virtual env

`pipenv shell`

`pip install flask` - To install flask and relevant packages- Can skip do to the below line

`pip install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy` -  For database and serialization.

Next to set-up the file that are to house the flask file, in this case we are to name the file `api`.

`export FLASK_APP=api` -This will enable us to run flask commands from the `api` folder.

`export FLASK_DEBUG=1` - This will place the app into debug mode.

`flask run` - To run the app.

The basic initialization file in to be name `__init__.py`, and also to check if it is properly working we use **POSTMAN**

```python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Initialiazing the app
app = Flask(__name__)

@app.route('/', methods=["GET"])
def test():
    return jsonify({'msg': "Hello World"})
       
#Run Server      
if __name__ == '__main__':
    app.run(debug=True)
```

Works everything is set-up properly, placing the routing functions inside a `views.py` file

```python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os #To set out file paths
from .views import main #Importing the blue  prints

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

#Setting up the blueprints
app.register_blueprint(main, url_prefix="")

       
#Run Server      
if __name__ == '__main__':
    app.run(debug=True)
```



The above is the `__init__.py` file,

 Note that in single page flask apps, we can instantiate the database by passing  `app` directly to the *SQLAlchemy* i.e

`db = SQLAlchemy(app)`

but in cases where we are using the creating_app function i.e with multiple files, the db instance is created outside the function, but it is instantiate inside.

```python
db = SQLAlchemy()
def create_app():
    app = Flask(__name__)
    app.config['SQALCHEMY_DATABASE_URI'] = 'Sqlite:///database.db'
	db.init_app(app)
    
    return app
```



and the below for the views.py file

```python
from flask import Blueprint, render_template,  jsonify

#Setting up the file as a blueprint
main = Blueprint("main", __name__, static_folder="static", template_folder="template")

@main.route('/', methods=["GET"])
def test():
    return jsonify({'msg': "Hello World"})

##The below functions used for the purpose of the turtorial
@main.route('/add_movie', methods = ["POST"])
def add_movie():
    return 'Done', 201

@main.route('/movies')
def movies():
    movies = []
    return jsonify({'movies': movies})
```



So far so go, everything works in POSTMAN

For the models we are to create a models.py

```python
from . import db

class Movie(db.Model):
    _id = db.Column('id', db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    ratings = db.Column(db.Integer)

    def __init__(self, title, ratings):
        self.title = title
        self.ratings = ratings  
```

To create the database run the below, in the python shell

```shell
>>> from api.models import Movie

>>> from api import db, app

>>> db.create_all()
```



Or we can place the `db.create_all()` in the `__init__.py` file at the bottom. Also to ensure that the tables are created together with the database, we import the tables after the `db` instance i.e after the line `db = SQLAlchemy(app)`

```python
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os #To set out file paths


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
```



To check the contents of the database

` sqlite3 api/database.db`

`sqlite> .tables`

### Migrations

To setup migrations, first we will have to install the package Flask-Migrate

`pip install Flask-Migrate`

Then we will have to configure the `__init__.py` file

```python
from flask_migrate import Migrate 

#Inside the app below the db instance call a migrate
migrate = Migrate(app, db)
```

To create the migration instance we will first have to direct Flask to our project folder

`export FLASK_APP=api` & `export FLASK_ENV=development` -- This is for bash commands

Check `https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/#the-application-factory`

Next to create a migration instance, run

`flask db init`

Now to create the first migration or to subsequent migrations

`flask db migrate -m "Initial migration."`

To apply changes to the database

`flask db upgrade`

Note that the error `ValueError: Constraint must have a name` might occur, this  can be rectified by setting up a naming convention for the data base

```python
from sqlalchemy import MetaData
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(app, metadata=metadata)
```

Check `https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#using-custom-metadata-and-naming-conventions` and `https://stackoverflow.com/questions/62640576/flask-migrate-valueerror-constraint-must-have-a-name`





**Note** to use print in flask we will do it as show below

```python
#For print functions
import sys
print(movies_list, file=sys.stderr)
```



For the flask there are three different project configurations... check the project files for the differences



## React

To set-up the react files, and start it

```shell
npx create-react-app front_end
cd front_end
npm start
```

For the UI, the project will use semantic UI

To install it 

```shell
npm install --save semantic-ui-react
npm i semantic-ui-react semantic-ui-css
```

And `index.js` we import it

```js
import 'semantic-ui-css/semantic.min.css'
```



First we will have to set-up a proxy where we indicate our local  host, the location of the backend server, this will avoid adding the local host address every time, hence inside the `package.json`

```js
"proxy": "http://localhost:5000",
```



To make an api call, we are to use the hook `useEffect` 

```react
useEffect(()=>{
    // fetch('/movies') //The http://localhost part is to placed under proxy in package.json
    // .then(response => response.json()).then(data => {console.log(data)})
    

    const fetchTasks = async() => {
      const res =  await fetch('/movies')
      const data = await res.json()
      console.log(data)
    }

    fetchTasks()
 }, [])
```

To save data obtained from the database we are to incorporate `useState`

```react
const [movies, setMovies] = useState([])
  useEffect(()=>{
    // fetch('/movies') //The http://localhost part is to placed under proxy in package.json
    // .then(response => response.json()).then(data => {console.log(data); setMovies(data)})
    

    const fetchTasks = async() => {
      const res =  await fetch('/movies')
      const data = await res.json()
      console.log(data)
      setMovies(data)
    }

    fetchTasks()
  }, [])
```



