from flask import Blueprint, render_template,  jsonify, request, json, make_response, current_app as app
from . import db, decrypt, util
from .models import *
from flask_login import login_user, current_user, logout_user, login_required
from functools import wraps 
import jwt
import datetime
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required #use of flask-jwt-extended


#For print functions
import sys
#from sys import stderr

#Setting up the file as a blueprint
main = Blueprint("main", __name__, static_folder="static", template_folder="template")

#Setting up login manager
from flask_login import LoginManager
login_manager = LoginManager()


# decorators
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):  
        token = None
        # if 'x-access-tokens' in request.headers:
        #     token = request.headers['x-access-tokens']
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split()[1]
        if not token:
            return jsonify({'message': "a valid token is missing"})
        try:
            data = jwt.decode(token,"SECRET_KEY", algorithms =['HS256'])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'token is invalid'})
            
        return f(*args, **kwargs)
    return decorator
   
def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if auth and auth.username == 'username1' and auth.password == 'password':
            return f(*args, **kwargs)
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
    return decorated

@main.route('/t')
def test():
    if request.authorization and request.authorization.username == 'username' and request.authorization.password == 'password':
        return '<h1>You are logged in!</h1>'
    else:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
    #return jsonify({'msg': "Hello World"})

@main.route('page')
@auth_required
def page():
    return '<h1>You are on page </h1>'

##The below functions used for the purpose of the tutorial
@main.route('/add_movie', methods = ["POST"])
def add_movie():
    movie_data = request.get_json()
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

        #Creating a token with PyJWT --- Can create both access token and refresh token
        token = jwt.encode(
            {
                "id" : check_username.id, 
                'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)
            },
            "SECRET_KEY", 
            algorithm='HS256'
        )
        #Creating an access token with JWT-extended - default expire time == 15min
        access_token = create_access_token(identity=username)

        #Creating a refresh token with JWT-extended - default expore time == 30days
        refresh_token = create_refresh_token(identity = username)

        res_data = {
            "msg": "Login Successfull",
            "roles": [2001, 1984],
            "token" : token,
            "access_token":access_token,
            "refresh_token": refresh_token
        }
        return make_response(jsonify(res_data), 201) 
    else:
       return make_response(jsonify({'msg': "Invalid Username or Password"}), 409) 


@main.route("/logout")
# @login_required
#@login_manager.user_loader
#@app.login_manager.user_loader
def logout():
    logout_user()
    return jsonify({'msg': "Logged Out"})

@main.route(('/getUsers'))
#@token_required ### Using pyPWT
@jwt_required() #Using jwt-extend (In this case only the access token required)
#@jwt_required(refresh=True) #Using jwt-extend --- Refresh token required
def get_users():
    users_list = User.query.all()
    users = users_schema.dump(users_list)
    
    return jsonify(users)

@main.route("/refresh")
@jwt_required(refresh=True)
def refresh():
    username = get_jwt_identity()
    access_token = create_access_token(identity=username)  

    return jsonify({"token":access_token})

@main.route('/add_supplier', methods=["POST", "GET"])
def add_supplier():
    if request.method == "POST":
        supplier_data = request.get_json()
        supplier_data.pop("county")
        new_supplier = Supplier(**supplier_data)
        db.session.add(new_supplier)
        db.session.commit()
        print(new_supplier)

        return supplier_schema.jsonify(new_supplier)
    else:
        zones = util.get_zones()
        return jsonify({ "zones": zones })

@main.route('/suppliers', methods=["GET"])
def suppliers():
    query_data = Supplier.query.all()
    suppliers = suppliers_schema.dump(query_data)
    
    return jsonify(suppliers)

@main.route('/suppliers/<int:id>', methods=["GET", "POST", "PUT", "DELETE"])
def supplierDetail(id):
    supplier = Supplier.query.filter_by(id=id).first()
    if request.method == "GET":
        return supplier_schema.jsonify(supplier)
        #return jsonify(())
    elif request.method == "PUT":
        supplier_data = request.get_json()
        for key, value in supplier_data.items():
            setattr(supplier, key, value)
        db.session.commit()

        return jsonify({'msg': "Supplier Details Updated"})
    elif request.method == "DELETE":
        print("Delete function trigger")
        db.session.delete(supplier)
        db.session.commit()
        return jsonify({'msg': "Delete function trigger"})

@main.route('/personnel/<int:id>', methods=["POST", "GET", "PUT", "DELETE"])
def personnel(id):
    company = Company.query.filter_by(id=id).first()
    persons_query = Person.query.filter_by(company_id=id)
    # persons_query = Person.query.with_parent(company)

    if request.method == "GET":
        persons = persons_schema.dump(persons_query)
        print(persons)
        return jsonify(persons)

    elif request.method == "POST":
        person_data = request.get_json()
        person = Person(**person_data)
        db.session.add(person)
        db.session.commit()
        return person_schema.jsonify(person)

    elif request.method == "PUT":
        # person = persons_query.filter_by(id=id).first()

        return person_schema.jsonify(person)
    elif request.method == "DELETE":
        person = persons_query.filter_by(id=id).first()
        db.session.delete(person)
        db.session.commit()
        return("hello")



@main.route('/get_variables')
def get_variables():
    data = util.get_data()
    return jsonify(data)



