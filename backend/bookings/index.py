import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import random
import string

def handler(event, context):
    '''
    Business: Create and retrieve user bookings
    Args: event with httpMethod, body (for POST), queryStringParameters (user_id)
    Returns: HTTP response with booking data
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
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        user_id = params.get('user_id')
        
        if not user_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'User ID required'})
            }
        
        cursor.execute(
            """
            SELECT b.*, 
                   f.flight_number, f.airline, f.departure_time, f.arrival_time,
                   a1.city as from_city, a1.code as from_code,
                   a2.city as to_city, a2.code as to_code,
                   h.name as hotel_name, h.city as hotel_city
            FROM bookings b
            LEFT JOIN flights f ON b.flight_id = f.id
            LEFT JOIN airports a1 ON f.from_airport_id = a1.id
            LEFT JOIN airports a2 ON f.to_airport_id = a2.id
            LEFT JOIN hotels h ON b.hotel_id = h.id
            WHERE b.user_id = %s
            ORDER BY b.created_at DESC
            """,
            (user_id,)
        )
        bookings = cursor.fetchall()
        conn.close()
        
        result = []
        for booking in bookings:
            booking_dict = dict(booking)
            for key, value in booking_dict.items():
                if hasattr(value, 'isoformat'):
                    booking_dict[key] = value.isoformat()
            result.append(booking_dict)
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'bookings': result})
        }
    
    elif method == 'POST':
        body = json.loads(event.get('body', '{}'))
        
        user_id = body.get('user_id')
        booking_type = body.get('booking_type')
        flight_id = body.get('flight_id')
        hotel_id = body.get('hotel_id')
        passenger_first_name = body.get('passenger_first_name')
        passenger_last_name = body.get('passenger_last_name')
        passenger_passport = body.get('passenger_passport')
        travel_date = body.get('travel_date')
        seat_number = body.get('seat_number')
        total_price = body.get('total_price')
        
        if not user_id or not booking_type or not total_price:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Required fields missing'})
            }
        
        booking_reference = 'DUKE-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        cursor.execute(
            """
            INSERT INTO bookings 
            (user_id, booking_type, booking_reference, flight_id, hotel_id, 
             passenger_first_name, passenger_last_name, passenger_passport, 
             travel_date, seat_number, total_price)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (user_id, booking_type, booking_reference, flight_id, hotel_id,
             passenger_first_name, passenger_last_name, passenger_passport,
             travel_date, seat_number, total_price)
        )
        conn.commit()
        booking = cursor.fetchone()
        conn.close()
        
        booking_dict = dict(booking)
        for key, value in booking_dict.items():
            if hasattr(value, 'isoformat'):
                booking_dict[key] = value.isoformat()
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'booking': booking_dict
            })
        }
    
    else:
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }