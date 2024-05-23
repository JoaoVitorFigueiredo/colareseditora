from flask import request, jsonify, current_app
import jwt
import datetime
from app import app, users_collection, token_required

@app.route('/api/v1/user/signup', methods=['POST'])

def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Bad Request', 'status': 'Username and password are required'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    user = {
        'username': username,
        'password': password, 
        'confirmed': False
    }

    users_collection.insert_one(user)
    return jsonify({'message': 'Created', 'status': 'User created successfully'}), 201

@app.route('/api/v1/user/login', methods=['POST'])

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Bad Request', 'status': 'Username and password are required'}), 400
    
    user = users_collection.find_one({'username': username})
    
    if not user:
        return jsonify({'message': 'Not Found', 'status': 'User not registered'}), 404
    
    if user['password'] != password:  
        return jsonify({'message': 'Unauthorized', 'status': 'Incorrect password'}), 401
    
    if not user['confirmed']:
        return jsonify({'message': 'Forbidden', 'status': 'User not confirmed'}), 403
    
    token = jwt.encode({
        'username': user['username'],
        'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')
    
    return jsonify({'token': token})

@app.route('/api/v1/user/confirmation', methods=['POST'])
@token_required

def confirm_user():
    
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        return jsonify({'message': 'Bad Request', 'status': 'Username is required'}), 400
    
    user = users_collection.find_one({'username': username})
    
    if not user:
        return jsonify({'message': 'Not Found', 'status': 'User not registered'}), 404
    
    users_collection.update_one({'username': username}, {'$set': {'confirmed': True}})
    return jsonify({'message': 'Success', 'status': 'User confirmed successfully'}), 200
