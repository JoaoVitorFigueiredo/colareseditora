from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
from functools import wraps
import os
import jwt

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

client = MongoClient(
 os.getenv("MONGO_URI"),
 tls=True,
 tlsAllowInvalidCertificates=True)

db = client["library_db"]
books_collection = db["books"]
users_collection = db["users"]
cart_collection = db["cart"]

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('token')  
        if not token:
            return jsonify({'code' : '400', 'status': 'Bad Request', 'message': 'Token header is required'}), 400
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            
        except jwt.ExpiredSignatureError:
            return jsonify({'code' : '401', 'status': 'Unauthorized', 'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'code' : '401', 'status': 'Unauthorized', 'message': 'Invalid Token'}), 401
        
        return f(*args, **kwargs)
    return decorated

from routes import books_misc, books_get, users