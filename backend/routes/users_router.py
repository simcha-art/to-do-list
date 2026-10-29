from flask import Blueprint

router = Blueprint("users", __name__)

@router.get("/")
def get_user():
    return "not implemented"

@router.post("/")
def create_user():
    return "not implemented"

@router.put("/<string: id>")
def update_user_details(id):
    return "not implemented"
