from flask import Blueprint

router = Blueprint("missions", __name__)

@router.get("/")
def get_mission():
    return "not implemented"

@router.post("/")
def create_mission():
    return "not implemented"

@router.put("/<string: id>")
def update_mission_details(id):
    return "not implemented"
