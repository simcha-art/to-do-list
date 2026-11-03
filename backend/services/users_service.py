from pydantic import BaseModel, EmailStr

class NewUserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class UpdateUserSchema(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None

def valid_new_user(body: dict):
    return NewUserSchema(**body).model_dump()

def valid_update_user(body: dict):
    return UpdateUserSchema(**body).model_dump(exclude_none=True)