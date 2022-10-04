from flask import Blueprint, render_template,  jsonify, request, json
from . import db, decrypt
from .models import *


#For print functions
import sys
#from sys import stderr

#Setting up the file as a blueprint
main = Blueprint("main", __name__, static_folder="static", template_folder="template")

@main.route('/t')
def test():
    return jsonify({'msg': "Hello World"})

##The below functions used for the purpose of the tutorial
@main.route('/add_movie', methods = ["POST"])
def add_movie():
    movie_data = request.get_json()
    #data = json.loads(request.body)
    #movie_data = data.get("movie")
    #new_movie = Movie(title=movie_data['title'], ratings=movie_data['ratings'])
    new_movie = Movie(**movie_data)
    db.session.add(new_movie)
    db.session.commit()
    print(new_movie)
    
    #return 'Done', 201
    return movie_schema.jsonify(new_movie)

@main.route('/movies')
def movies():
    movies_list = Movie.query.all()
    movies = movies_schema.dump(movies_list)
    #print(movies, file=sys.stderr)

    #return jsonify(movies)
    return jsonify({'movies': movies})

#Registration
@main.route('/register', methods=['POST'])
def add_user():
    user_data = request.get_json()
    print(user_data, file=sys.stderr)
    #To hash the pass
    hashed_pwd = decrypt.generate_password_hash(user_data["pwd"]).decode('utf-8')
    print(hashed_pwd, file=sys.stderr)
    user_data.pop("pwd", hashed_pwd)
    user_data["pwd"] = hashed_pwd
    user = User(**user_data)
    db.session.add(user)
    db.session.commit()

    print(user_data, file=sys.stderr)
    print("Hello Registration", file=sys.stderr)

    #return jsonify({'msg': "Details Received"})
    return JsonResponse(status = 201)

@main.route(('/getUsers'))
def get_users():
    users_list = User.query.all()
    users = users_schema.dump(users_list)
    
    return jsonify(users)