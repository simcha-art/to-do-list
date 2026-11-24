from flask import Blueprint, jsonify, request
from werkzeug.exceptions import abort
from services.users_service import user_service


router = Blueprint("users", __name__)

@router.post("/login")
def get_user():
    body = request.get_json()
    user = user_service.login(body)
    if not user:
        abort(401, "email address or password are incorrect")
    return jsonify({"success": True, "data": user}), 200

@router.post("")
def create_user():
    body = request.get_json()
    new_user = user_service.register(body)
    return jsonify({"success": True, "data": new_user}), 201


@router.put("/<string:id>")
def update_user_details(id):
    body = request.get_json()
    updated_user = user_service.update(id, body)
    if not updated_user:
        abort(404, f"user {id} not found")
    return jsonify({"success": True, "data": updated_user})

