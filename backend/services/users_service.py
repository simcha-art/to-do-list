from pydantic import BaseModel, EmailStr
from db.connection import session
from db.repository import UserRepository

class NewUserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class UpdateUserSchema(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None

class LoginSchema(BaseModel):
    email: EmailStr
    password: str



class UsersService:
    def __init__(self, repo: type[UserRepository]):
        self.session = session
        self.repo = repo

    def login(self, body):
        valid_data = LoginSchema(**body).model_dump()
        email = valid_data["email"]
        password = valid_data["password"]
        with self.session() as current_session:
            user = self.repo(current_session).get_by_email_and_password(email, password)
            if user:
                user = user.to_dict()
        return user

    def register(self, body):
        valid_data = NewUserSchema(**body).model_dump()
        with self.session() as current_session:
            return self.repo(current_session).create(valid_data).to_dict()

    def update(self, id, body):
        valid_data = UpdateUserSchema(**body).model_dump(exclude_none=True)
        with self.session() as current_session:
            origin_user = self.repo(current_session).get_by_id(id)
            if not origin_user:
                return None
            return self.repo(current_session).update(origin_user, valid_data).to_dict()



user_service = UsersService(UserRepository)