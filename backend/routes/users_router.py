from flask import Blueprint, jsonify

router = Blueprint("users", __name__)

@router.get("")
def get_user():
    return jsonify({"message": "not implemented"}), 200

@router.post("")
def create_user():
    return "not implemented", 200

@router.put("/<string:id>")
def update_user_details(id):
    return "not implemented", 200
