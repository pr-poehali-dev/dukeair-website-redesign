CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    airline VARCHAR(100) NOT NULL,
    from_airport_id INTEGER REFERENCES airports(id),
    to_airport_id INTEGER REFERENCES airports(id),
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    duration VARCHAR(20),
    price_economy INTEGER NOT NULL,
    price_comfort INTEGER NOT NULL,
    price_business INTEGER NOT NULL,
    available_seats INTEGER DEFAULT 100
);

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    stars INTEGER CHECK (stars >= 1 AND stars <= 5),
    price_per_night INTEGER NOT NULL,
    description TEXT,
    amenities TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    booking_type VARCHAR(50) NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    flight_id INTEGER REFERENCES flights(id),
    hotel_id INTEGER REFERENCES hotels(id),
    passenger_first_name VARCHAR(100),
    passenger_last_name VARCHAR(100),
    passenger_passport VARCHAR(50),
    travel_date DATE,
    seat_number VARCHAR(10),
    total_price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_airports_city ON airports(city);
CREATE INDEX idx_flights_from_to ON flights(from_airport_id, to_airport_id);
CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_bookings_user ON bookings(user_id);