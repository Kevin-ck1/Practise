from . import db, ma

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