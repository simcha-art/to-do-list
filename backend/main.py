from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from routes.users_router import router as users_router
from routes.missions_router import router as missions_router
from dotenv import load_dotenv
from werkzeug.exceptions import HTTPException

load_dotenv()

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000", "http://localhost:5173"],
    supports_credentials=True,
)

@app.before_request
def logger():
    print(f"{request.method}/{request.url}")
    print(f"query: {request.args.__dict__}, body: {request.get_json(silent=True)}")

@app.route("/health")
def health():
    return jsonify({"health": "server is on"}), 200

app.register_blueprint(missions_router, url_prefix="/missions")
app.register_blueprint(users_router, url_prefix="/users")


@app.errorhandler(HTTPException)
def handle_http_errors(e: HTTPException):
    message = e.description
    code = e.code
    print(f"{code}: {message}")
    return jsonify({"error": message}), code

@app.errorhandler(Exception)
def handler_error(e: Exception):
    print(e)
    code = e.code | 500
    return jsonify({"error": str(e)}), code



app.run(port=int(os.getenv("PORT", 3000)))
