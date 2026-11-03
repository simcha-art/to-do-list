from flask import Blueprint, jsonify, request
from werkzeug.exceptions import abort
from db.connection import session
from db.repository import UserRepository
from services.users_service import valid_new_user, valid_update_user


router = Blueprint("users", __name__)

@router.get("")
def get_user():
    body = request.get_json(silent=True)
    email = body["email"]
    password = body["password"]
    with session() as current_session:
        user = UserRepository(current_session).get_by_email_and_password(email, password)
        if not user:
            abort(404, "email address or password are incorrect")
        user = user.to_dict()
    return jsonify({"success": True, "data": user}), 200

@router.post("")
def create_user():
    body = request.get_json()
    valid_data = valid_new_user(body)
    with session() as current_session:
        new_user = UserRepository(current_session).create(valid_data).to_dict()

    return jsonify({"success": True, "data": new_user}), 201

@router.put("/<string:id>")
def update_user_details(id):
    body = request.get_json()
    valid_data = valid_update_user(body)
    with session() as current_session:
        origin_user = UserRepository(current_session).get_by_id(id)
        if not origin_user:
            abort(404, "user not found")
        updated_user = UserRepository(current_session).update(origin_user, valid_data).to_dict()
    return jsonify({"success": True, "data": updated_user})

