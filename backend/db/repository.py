from .models import User, Mission
from sqlalchemy.orm import Session
from sqlalchemy import select
import bcrypt



class BaseRepository:

    def __init__(self, session: Session, cls: type[User] | type[Mission]):
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

    def get(self, **filters):
        query = select(self.cls)
        for key, val in filters.items():
            query = query.where(getattr(self.cls, key) == val)
        return self.session.scalars(query).all()

class UserRepository(BaseRepository):
    def __init__(self, session):
        super().__init__(session, User)


    def get_by_email(self, email):
        query = select(User).where(User.email == email)
        return self.session.scalars(query).first()

class MissionRepository(BaseRepository):
    def __init__(self, session):
        super().__init__(session, Mission)



