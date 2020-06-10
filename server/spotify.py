from flask import Flask, jsonify
from flask_cors import CORS
import requests
import base64
import os

app = Flask(__name__)
CORS(app)

# Get and set environment variables
with open("../.env") as f:
    os.environ.update(
        line.strip().split("=", 1) for line in f if "PYTHON_" in line
    )

# Return currently playing spotify track
@app.route("/api/spotify", methods=["GET"])
def get_auth():
    # First get our access token using a previously generated refresh token
    refresh_token = os.environ["PYTHON_SPOTIFY_REFRESH_TOKEN"]
    client_id = os.environ["PYTHON_SPOTIFY_CLIENT_ID"]
    client_secret = os.environ["PYTHON_SPOTIFY_CLIENT_SECRET"]
    auth_str = "{}:{}".format(client_id, client_secret)
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()
    url = "https://accounts.spotify.com/api/token"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "Basic {}".format(b64_auth_str)
    }
    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    }
    auth_data = requests.post(url, headers = headers, data = data).json()
    access_token = auth_data["access_token"]

    # Next, get the currently playing song's data
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    headers = {
        "Authorization": "Bearer {}".format(access_token)
    }
    song_data_resp = requests.get(url, headers = headers)

    # If a song is playing, it will return 200 and data
    # If not / a private session, it will return a 204
    if song_data_resp.status_code != 200:
        return {}

    response_data = song_data_resp.json()

    # Finally, return the song title, artist, and art url
    song_name = response_data["item"]["name"]
    song_artist_list = [artist["name"] for artist in response_data["item"]["artists"]]
    song_artist = ", ".join(song_artist_list)
    song_art = response_data["item"]["album"]["images"][0]["url"]

    song_data = {
        "name": song_name,
        "artist": song_artist,
        "art": song_art,
    }
    return jsonify(song_data)