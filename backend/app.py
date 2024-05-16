from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
from functools import wraps
import os



load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(
 os.getenv("MONGO_URI"),
 tls=True,
 tlsAllowInvalidCertificates=True)

db = client["library_db"]
books_collection = db["books"]
users_collection = db["users"]

def token_required(func):
 @wraps(func)
 def decorated(*args, **kwargs):
  
  return func(*args,**kwargs)

 return decorated


from routes import books, users



