import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib

def handler(event, context):
    '''
    Business: User authentication and registration
    Args: event with httpMethod, body (email, password, action)
    Returns: HTTP response with user data or error
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body = json.loads(event.get('body', '{}'))
    action = body.get('action')
    email = body.get('email')
    password = body.get('password')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Email and password required'})
        }
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if action == 'register':
        first_name = body.get('first_name', '')
        last_name = body.get('last_name', '')
        
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )
        existing = cursor.fetchone()
        
        if existing:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'User already exists'})
            }
        
        cursor.execute(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (%s, %s, %s, %s) RETURNING id, email, first_name, last_name",
            (email, password_hash, first_name, last_name)
        )
        conn.commit()
        user = cursor.fetchone()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'user': dict(user)
            })
        }
    
    else:
        cursor.execute(
            "SELECT id, email, first_name, last_name FROM users WHERE email = %s AND password = %s",
            (email, password_hash)
        )
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid email or password'})
            }
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'user': dict(user)
            })
        }
