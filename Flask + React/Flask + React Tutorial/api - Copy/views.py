from flask import Blueprint, render_template,  jsonify, request
from . import db, app
from api import app
from .models import *

#For print functions
import sys
#from sys import stderr

#Setting up the file as a blueprint
main = Blueprint("main", __name__, static_folder="static", template_folder="template")

@main.route('/', methods=["GET"])
def test():
    return jsonify({'msg': "Hello World"})

##The below functions used for the purpose of the tutorial
@main.route('/add_movie', methods = ["POST"])
def add_movie():
    movie_data = request.get_json()
    #data = json.loads(request.body)
    #movie_data = data.get("movie")
    new_movie = Movie(title=movie_data['title'], ratings=movie_data['rating'])
    #new_movie = Movie(**movie_data)
    db.session.add(new_movie)
    db.session.commit()
    print(new_movie)
    return 'Done', 201

@main.route('/movies')
def movies():
    movies_list = Movie.query.all()
    movies = movies_schema.dump(movies_list)
    #print(movies, file=sys.stderr)

    #return jsonify(movies)
    return jsonify({'movies': movies})