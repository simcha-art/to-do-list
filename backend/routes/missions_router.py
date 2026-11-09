from flask import Blueprint, request, jsonify, abort
from db.connection import session
from db.repository import MissionRepository
from services.missions_service import valid_create_mission, valid_update_mission

router = Blueprint("missions", __name__)


@router.get("")
def get_missions_with_filters():
    filters = request.args.to_dict()
    with session() as current_session:
        missions = list(mission.to_dict() for mission in MissionRepository(current_session).get(**filters))

    return jsonify({"success": True, "data": missions}), 200

@router.get("/<string:id>")
def get_mission_by_id(id):
    with session() as current_session:
        mission = MissionRepository(current_session).get_by_id(id).to_dict()
        if not mission:
            abort(404, f"mission {id} not found")
    return jsonify({"success": True, "data": mission})


@router.post("")
def create_mission():
    body = valid_create_mission(request.get_json())
    with session() as current_session:
        new_mission = MissionRepository(current_session).create(body).to_dict()
        
    return jsonify({"success": True, "data": new_mission}), 201

    

@router.put("/<string:id>")
def update_mission_details(id):
    body = valid_update_mission(request.get_json())
    with session() as current_session:
        repo = MissionRepository(current_session)
        origin_mission = repo.get_by_id(id)
        print({"origin": origin_mission})
        updated_mission = repo.update(origin_mission, body)
        print({"updated": updated_mission})
        if not updated_mission:
            abort(404,  f"mission {id} not found")
        updated_mission = updated_mission.to_dict()

    return jsonify({"success": True, "data": updated_mission}), 200

    
