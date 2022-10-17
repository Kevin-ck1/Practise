from . import db, ma
from flask_login import UserMixin

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    ratings = db.Column(db.Integer)

    def __init__(self, title, ratings):
        self.title = title
        self.ratings = ratings  

#Defining movie schema
class MovieSchema(ma.Schema):
  class Meta:
    fields = ('id', 'title', 'ratings')

# Init schema
movie_schema = MovieSchema()
movies_schema = MovieSchema(many=True)

class User(UserMixin, db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user = db.Column(db.String(24))
  email = db.Column(db.String(50))
  pwd = db.Column(db.String(24))

  def __repr__(self):
    return f"User('{self.user}', '{self.email}')"

#Defining User Schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', "user", "email", "pwd")

#Init Schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)
  