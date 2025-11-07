import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from decimal import Decimal

def handler(event, context):
    '''
    Business: Search hotels by city or get hotel details
    Args: event with httpMethod, queryStringParameters (city) or path (id)
    Returns: HTTP response with list of hotels or hotel details
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    city = params.get('city', '')
    hotel_id = params.get('id', '')
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if hotel_id:
        cursor.execute(
            "SELECT * FROM hotels WHERE id = %s",
            (hotel_id,)
        )
        hotel = cursor.fetchone()
        conn.close()
        
        if not hotel:
            return {
                'statusCode': 404,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Hotel not found'})
            }
        
        hotel_dict = dict(hotel)
        for key, value in hotel_dict.items():
            if isinstance(value, Decimal):
                hotel_dict[key] = float(value)
            elif hasattr(value, 'isoformat'):
                hotel_dict[key] = value.isoformat()
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'hotel': hotel_dict})
        }
    
    if not city:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'City parameter required'})
        }
    
    cursor.execute(
        "SELECT * FROM hotels WHERE LOWER(city) = LOWER(%s) ORDER BY stars DESC, rating DESC",
        (city,)
    )
    hotels = cursor.fetchall()
    conn.close()
    
    result = []
    for hotel in hotels:
        hotel_dict = dict(hotel)
        for key, value in hotel_dict.items():
            if isinstance(value, Decimal):
                hotel_dict[key] = float(value)
            elif hasattr(value, 'isoformat'):
                hotel_dict[key] = value.isoformat()
        result.append(hotel_dict)
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({
            'hotels': result,
            'count': len(result)
        })
    }