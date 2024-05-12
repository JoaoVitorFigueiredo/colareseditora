from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
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

from routes import books, users