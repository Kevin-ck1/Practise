import pandas as pd 
from sqlalchemy.sql import func
from . import db
from .models import *

#Not in use for now
def get_zones():
    df = pd.read_excel('api/static/data.xlsx', sheet_name='Zones')
    a = df['ZONES'].tolist()

    return a

#Not in use for now
def get_counties():
    df = pd.read_excel('api/static/data.xlsx', sheet_name='Counties')
    counties = df['County'].tolist()
    return counties

#Not in use for now
def get_categories():
    df = pd.read_excel('api/static/data.xlsx', sheet_name='Categories')
    a = df['CATEGORIES'].tolist()
    return a

#Not in use for now
def get_status():
    df = pd.read_excel('api/static/data.xlsx', sheet_name='Status')
    a = df['STATUS'].tolist()
    return a

def get_data():
    def data(a, b):
        df = pd.read_excel('api/static/data.xlsx', sheet_name=a)
        c = df[b].tolist()
        return c
    data1 = {"Counties":data('Counties', 'County'), "Categories":data('Categories', 'CATEGORIES'), "Status":data('Status', 'STATUS'), "Zones":data('Zones', 'ZONES')}

    return data1

#Not in use for now - To be used while calculating cost for supply
def get_county():
    df = pd.read_excel('api/static/data.xlsx', sheet_name= "Counties")
    a = df.to_dict('records')
    return a

def updateJobValue(id):
    # job_query = Job.query.filter_by(id = id)
    supplies = Supply.query.filter_by(job_id = id)
    # print(supplies)
    # value = db.select(db.func.sum(supplies.total))
    sum_query = db.select(db.func.sum(Supply.total)).where(Supply.job_id == id)
    value = db.engine.execute(sum_query).first()[0]
    # print(value)
    # print(job_schema.dump(job_query))
    # job_query = Job.query.filter_by(id = id).first()
    # job_query.value = value
    # db.session.commit()
    # print(job_schema.dump(job_query))

    return value

    # query = db.select([db.func.sum(payment_table.c.amount)])