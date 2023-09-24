"""
    Hosting the nearest neighbours' functionality in a Flask API
"""
from flask import Flask, request, jsonify
from redis_lib import create_redis_client, add_geospatial_point, find_geospatial_points_within_radius
from flask_cors import CORS, cross_origin
import os

# Create the Redis client
r = create_redis_client(
    host_url = env.host_url,
    host_password = env.host_password
)

# Get number of nearest neighbours functionality
def get_number_risk_points(latitude, longitude):
    latitude = float(latitude)
    longitude = float(longitude)

    points = find_geospatial_points_within_radius(r, latitude, longitude, radius = 1000, collection_name="geoparky")
    return len(points)

# Set up flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Base route
@app.route('/')
def hello_world():
    return 'Hello from REDIS API!'

# Nearest points' route
@app.route('/nearby', methods = ['POST'])
@cross_origin()
def nearby_points():
    global r

    input_json = request.get_json()
    latitude = str(input_json["latitude"])
    longitude = str(input_json["longitude"])

    num_points = get_number_risk_points(latitude, longitude)
    response = jsonify({
        "latitude" : latitude,
        "longitude" : longitude,
        "points" : num_points
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    app.run()