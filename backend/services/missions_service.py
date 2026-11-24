from pydantic import BaseModel
from datetime import date as type_date
from db.connection import session
from db.repository import MissionRepository

class NewMissionSchema(BaseModel):
    title: str
    desc: str
    date: type_date
    is_finished: bool
    user_id: int

class UpdateMissionSchema(BaseModel):
    title: str | None = None
    desc: str | None = None
    date: type_date | None = None
    is_finished: bool | None = None



def valid_create_mission(body: dict):
    return NewMissionSchema(**body).model_dump()

def valid_update_mission(body: dict):
    return UpdateMissionSchema(**body).model_dump(exclude_none=True)


class MissionsService:
    def __init__(self, repo: type[MissionRepository]):
        self.session = session
        self.repo = repo

    def get_missions_by_filters(self, filters: dict):
        with self.session() as current_session:
            return list(mission.to_dict() for mission in self.repo(current_session).get(**filters))

    def get_by_id(self, id):
        with self.session() as current_session:
            mission = self.repo(current_session).get_by_id(id)
            if mission:
                mission = mission.to_dict()
            return mission

    def create(self, body):
        valid_data = valid_create_mission(body)
        with self.session() as current_session:
            new_mission = self.repo(current_session).create(valid_data)
        if new_mission:
            new_mission = new_mission.to_dict()
        return new_mission

    def update(self, id, body):
        valid_data = valid_update_mission(body)
        with self.session() as current_session:
            repo = self.repo(current_session)
            origin_mission = repo.get_by_id(id)
            if not origin_mission:
                return None
            updated_mission = repo.update(origin_mission, valid_data).to_dict()
            return updated_mission






mission_service = MissionsService(MissionRepository)