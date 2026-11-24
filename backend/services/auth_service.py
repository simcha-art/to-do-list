import jwt
from flask import request, abort
import os

from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

def generate_token(user):
    payload = {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"]
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def auth_decorator(func):
    def wrapper(*args, **kwargs):
        try:
            token = request.headers.get("Authorization", "1 1").split(" ")[1]
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            request.user = payload
            return func(*args, **kwargs)
        except jwt.exceptions.PyJWTError as e:
            print(e)
            abort(401, "You are unauthorized")
    return wrapper



        