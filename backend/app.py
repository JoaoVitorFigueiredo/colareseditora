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

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('token')  
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users_collection.find_one({"username": data['username']})
            
            if not current_user:
                return jsonify({'message': 'User not found'}), 401
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

from routes import books, users



