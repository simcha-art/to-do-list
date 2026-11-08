from pydantic import BaseModel
from datetime import date as type_date

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