from .models import User, Mission
from sqlalchemy.orm import Session
from sqlalchemy import select
import bcrypt



class BaseRepository:

    def __init__(self, session: Session, cls: User | Mission):
        self.session = session
        self.cls = cls

    def create(self, data: dict):
        new_obj = self.cls(**data)
        self.session.add(new_obj)
        self.session.commit()
        self.session.refresh(new_obj)
        return new_obj

    def update(self, obj: User | Mission, data: dict):
        for key, val in data.items():
            setattr(obj, key, val)

        self.session.commit()
        self.session.refresh(obj)
        return obj

    def get_by_id(self, id):
        return self.session.get(self.cls, id)

class UserRepository(BaseRepository):
    def __init__(self, session):
        super().__init__(session, User)

    def create(self, data):
        data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        return super().create(data)

    def update(self, obj, data):
        if hasattr(data, "password"):
            data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        return super().update(obj, data)

    def get_by_email_and_password(self, email, password:str):
        query = select(User).where(User.email == email)
        user = self.session.scalars(query).first()
        if not user:
            return None

        is_correct_pwd = bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8"))
        if is_correct_pwd:
            return user
        return None

class MissionRepository(BaseRepository):
    def __init__(self, session):
        super().__init__(session, Mission)


