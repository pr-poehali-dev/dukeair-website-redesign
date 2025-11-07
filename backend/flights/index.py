import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event, context):
    '''
    Business: Search flights between cities
    Args: event with httpMethod, queryStringParameters (from, to)
    Returns: HTTP response with list of available flights
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
    from_city = params.get('from', '')
    to_city = params.get('to', '')
    
    if not from_city or not to_city:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'From and to cities required'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    query = """
        SELECT 
            f.id, f.flight_number, f.airline,
            f.departure_time, f.arrival_time, f.duration,
            f.price_economy, f.price_comfort, f.price_business,
            f.available_seats,
            a1.code as from_code, a1.name as from_name, a1.city as from_city,
            a2.code as to_code, a2.name as to_name, a2.city as to_city
        FROM flights f
        JOIN airports a1 ON f.from_airport_id = a1.id
        JOIN airports a2 ON f.to_airport_id = a2.id
        WHERE LOWER(a1.city) = LOWER(%s) AND LOWER(a2.city) = LOWER(%s)
        ORDER BY f.departure_time
    """
    
    cursor.execute(query, (from_city, to_city))
    flights = cursor.fetchall()
    conn.close()
    
    result = []
    for flight in flights:
        flight_dict = dict(flight)
        for key, value in flight_dict.items():
            if hasattr(value, 'isoformat'):
                flight_dict[key] = value.isoformat()
        result.append(flight_dict)
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({
            'flights': result,
            'count': len(result)
        })
    }