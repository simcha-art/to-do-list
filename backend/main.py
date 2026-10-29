from flask import Flask, request
import os
from flask_cors import CORS
from .routes import missions_router, users_router
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env")

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000", "http://localhost:5173"],
    supports_credentials=True,
)

@app.before_request
def logger():
    print(f"{request.method}/{request.url}")
    print(f"query: {request.args}, body: {request.get_json()}")

    
app.register_blueprint(missions_router.router, url_prefix="/missions")
app.register_blueprint(users_router.router, url_prefix="/users")


app.run(port=int(os.getenv("PORT", 3000)))
