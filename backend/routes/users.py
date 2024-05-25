from flask import request, jsonify, current_app
import jwt
import datetime
from app import app, users_collection, token_required

@app.route('/api/v1/user/signup', methods=['POST'])

def signup():
    username = request.form.get("username")
    password = request.form.get("password")
    
    if not username or not password:
        return jsonify({'code' : '400', 'status': 'Bad Request', 'message': 'Username and password form is required'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'code' : '409', 'status': 'Conflict', 'message': 'User already exists'}), 409

    user = {
        'username': username,
        'password': password, 
        'confirmed': False
    }

    users_collection.insert_one(user)
    return jsonify({'code' : '201', 'status': 'Created', 'message': 'User created successfully'}), 201

@app.route('/api/v1/user/login', methods=['POST'])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    
    if not username or not password:
        return jsonify({'code' : '400', 'status': 'Bad Request', 'message': 'Username and password form is required'}), 400
    
    user = users_collection.find_one({'username': username})
    
    if not user:
        return jsonify({'code' : '404', 'status': 'Not Found', 'message': 'User not registered'}), 404
    
    if user['password'] != password:  
        return jsonify({'code' : '401', 'status': 'Unauthorized', 'message': 'Incorrect user password'}), 401
    
    if not user['confirmed']:
        return jsonify({'code' : '403', 'status': 'Forbidden', 'message': 'User not confirmed'}), 403
    
    token = jwt.encode({
        'username': user['username'],
        'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')
    
    return jsonify({'code' : '200', 'status': 'Success', 'message': 'User logged in successfully', 'token': token})


# Endpoint de Confirmação para adicionar novo Administrador
@app.route('/api/v1/user/confirmation', methods=['POST'])
@token_required
def confirm_user():
    
    username = request.form.get("username")
    
    if not username:
        return jsonify({'code' : '400', 'status': 'Bad Request', 'message': 'Username form is required'}), 400
    
    user = users_collection.find_one({'username': username})
    
    if not user:
        return jsonify({'code' : '404', 'status': 'Not Found', 'message': 'User not registered'}), 404
    
    users_collection.update_one({'username': username}, {'$set': {'confirmed': True}})

    if user is not None and user["confirmed"] == True:
        return jsonify({'code' : '409', 'status': 'Conflict', 'message': 'User already has administrator permissions'}), 409 
    
    return jsonify({'code' : '200', 'status': 'Success', 'message': 'User confirmed successfully'}), 200
