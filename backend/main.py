from flask import Flask, request, jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, DataError
from pydantic import ValidationError
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


@app.errorhandler(IntegrityError)
def handle_sql_duplicate_error(err: IntegrityError):
    print(err)
    if err.orig.pgcode == "23505":
        return jsonify({"error": "Duplicate error: this email is aleady in the system"}), 409
    return jsonify({"error": f"there is no user with this user_id"}), 409

@app.errorhandler(DataError)
def handle_sql_data_error(err: DataError):
    print(err)
    return jsonify({"error": "Invalid data"}), 400

@app.errorhandler(ValidationError)
def handle_pydantic_errors(err: ValidationError):
    print(err.errors())
    return jsonify({"error": "invalid data"}), 400

@app.errorhandler(Exception)
def handler_error(e: Exception):
    print(e)
    code = e.code if hasattr(e, "code") else 500
    return jsonify({"error": str(e)}), code



app.run(port=int(os.getenv("PORT", 3000)))
