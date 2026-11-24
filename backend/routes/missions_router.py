from flask import Blueprint, request, jsonify, abort
from services.missions_service import mission_service

router = Blueprint("missions", __name__)


@router.get("")
def get_missions_with_filters():
    filters = request.args.to_dict()
    missions = mission_service.get_missions_by_filters(filters)
    return jsonify({"success": True, "data": missions}), 200

@router.get("/<string:id>")
def get_mission_by_id(id):
    mission = mission_service.get_by_id(id)
    if not mission:
        abort(404, f"mission {id} not found")
    return jsonify({"success": True, "data": mission})


@router.post("")
def create_mission():
    body = request.get_json()
    new_mission = mission_service.create(body)
    return jsonify({"success": True, "data": new_mission}), 201

    

@router.put("/<string:id>")
def update_mission_details(id):
    body = request.get_json()
    updated_mission = mission_service.update(id, body)
    if not updated_mission:
        abort(404, f"mission {id} not found")

    return jsonify({"success": True, "data": updated_mission}), 200

    
