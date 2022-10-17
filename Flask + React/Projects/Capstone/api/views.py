from flask import Blueprint, render_template,  jsonify, request, json, make_response
from . import db, decrypt
from .models import *
from flask_login import login_user, current_user, logout_user, login_required


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
def register_user():
    user_data = request.get_json()
    username = user_data["user"]
    email = user_data["email"]
    check_username = User.query.filter_by(user=username).first()
    check_email = User.query.filter_by(email=email).first()
    if check_username:
        return make_response(jsonify({"msg":"Username Already Exists"}), 409)
        #return jsonify("Username Already Exists")
    elif check_email:
        return make_response(jsonify({"msg": "Email Already Exists"}), 409)
    
    #To hash the pass
    hashed_pwd = decrypt.generate_password_hash(user_data["pwd"]).decode('utf-8')
    user = User(user = username, email=email, pwd=hashed_pwd)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    res_data = {
            "msg": "User Added",
            "roles": "user"
        }
    return make_response(jsonify(res_data),201)

@main.route('/login',  methods=['POST'])
def login():
    user_data = request.get_json()
    username = user_data["user"]
    check_username = User.query.filter_by(user=username).first()

    if check_username and decrypt.check_password_hash(check_username.pwd, user_data["pwd"]):
        #Login Successfull
        login_user(check_username) # Sets the current user to the user provided
        res_data = {
            "msg": "Login Successfull",
            "roles": "user"
        }
        return make_response(jsonify(res_data), 201) 
    else:
       return make_response(jsonify({'msg': "Invalid Username or Password"}), 409) 


@main.route("/logout")
def logout():
    logout_user()
    return jsonify({'msg': "Logged Out"})

@main.route(('/getUsers'))
def get_users():
    users_list = User.query.all()
    users = users_schema.dump(users_list)
    
    return jsonify(users)