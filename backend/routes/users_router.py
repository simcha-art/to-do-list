from flask import Blueprint, jsonify, request
from werkzeug.exceptions import abort
from services.users_service import user_service
from services.auth_service import generate_token, auth_decorator


router = Blueprint("users", __name__)

@router.post("/login")
def get_user():
    body = request.get_json()
    user = user_service.login(body)
    if not user:
        abort(401, "email address or password are incorrect")
    token = generate_token(user)
    return jsonify({"success": True, "data": {"user": user, "token": token}}), 200

@router.post("")
def create_user():
    body = request.get_json()
    new_user = user_service.register(body)
    token = generate_token(new_user)
    return jsonify({"success": True, "data": {"user": new_user, "token": token}}), 201


@router.put("/<string:id>")
@auth_decorator
def update_user_details(id):
    body = request.get_json()
    updated_user = user_service.update(id, body)
    if not updated_user:
        abort(404, f"user {id} not found")
    token = generate_token(updated_user)
    return jsonify({"success": True, "data": {"user": updated_user, "token": token}}), 200

