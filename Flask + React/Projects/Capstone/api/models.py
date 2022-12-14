from . import db, ma
from flask_login import UserMixin
#from sqlalchemy.orm import DeclarativeBase

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

#Defining Company Class
class Company(db.Model):
  __tablename__ = 'company'
  id = db.Column(db.Integer, primary_key=True)
  nameC = db.Column(db.String(64))
  address = db.Column(db.Integer)
  email = db.Column(db.String(64))
  contact = db.Column(db.Integer)
  location = db.Column(db.String(64))
  type = db.Column(db.String(50))

  __mapper_args__ = {
        'polymorphic_identity': 'company',
        'with_polymorphic': '*',
        "polymorphic_on": type
  }

  def __repr__(self):
    return f"{self.nameC}"

#Defining Supplier Class
class Supplier(Company):
  __tablename__ = 'supplier'
  s_id = db.Column(db.Integer, db.ForeignKey('company.id'))
  zone = db.Column(db.Integer)

  __mapper_args__ = {
        'polymorphic_identity': 'supplier',
        'with_polymorphic': '*',
  }

  def __repr__(self):
    return f"{self.nameC}"

#Defining Supplier Schema
class SupplierSchema(ma.Schema):
  class Meta:
    fields = ('id', "nameC", "email", "address", "contact", "location", "zone")

#Init Schema
supplier_schema = SupplierSchema()
suppliers_schema = SupplierSchema(many=True)

#Defining Client Class
class Client(Company):
  __tablename__ = 'client'
  c_id = db.Column(db.Integer, db.ForeignKey('company.id'))
  county = db.Column(db.Integer)
  
  __mapper_args__ = {
        'polymorphic_identity': 'client',
        'with_polymorphic': '*',
  }

  def __repr__(self):
    return f"{self.nameC}"

#Defining Client Schema
class ClientSchema(ma.Schema):
  class Meta:
    fields = ('id', "nameC", "email", "address")

#Init Schema
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)


#Defining Product Class
class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.Integer)
  nameP = db.Column(db.String(64))
  brand = db.Column(db.String(64))
  size = db.Column(db.Integer)
  weight = db.Column(db.Integer)
  description = db.Column(db.Integer)
  prices = db.relationship('Price', backref='productPrices', lazy=True)
  
  def __repr__(self):
    return f"{self.nameP}: {self.brand}"
    

class Price(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  price = db.Column(db.Integer)
  product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
  # supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'), nullable=False)

  def __repr__(self):
    return f"{self.id}: {self.price}"