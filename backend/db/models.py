from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import ForeignKey, func
from typing import List
from datetime import datetime, date


class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] 
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] 
    role: Mapped[str] = mapped_column(server_default="user")

    group_id: Mapped[int | None] = mapped_column(ForeignKey("groups.id"), nullable=True, server_default=None )
    
    managed_group: Mapped["Group"] = relationship(
        back_populates="admin", 
        foreign_keys="groups.admin_id",
        uselist=False
        )
    missions: Mapped[List["Mission"]] = relationship(back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"User(id={self.id}, name={self.name}, email={self.email}, role={self.role}, password=****)"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "role": self.role,
            "managed_group": self.managed_group.to_dict() if self.managed_group else None,
            "missions": [mission.to_dict() for mission in self.missions]
        }

    


class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] 
    desc: Mapped[str] 
    date: Mapped[date] 
    is_finished: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="missions")

    def __repr__(self):
        return f"Mission(id={self.id}, title={self.title}, desc={self.desc}, date={self.date}, is_finished={self.is_finished}, created_at={self.created_at}, user_id={self.user_id})"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "desc": self.desc,
            "date": self.date,
            "is_finished": self.is_finished,
            "created_at": self.created_at,
            "user_id": self.user_id,
        }


class Group(Base):
    __tablename__ = "groups"
    id: Mapped[int] = mapped_column(primary_key=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str]

    admin: Mapped["User"] = relationship(
        back_populates="groups",
        foreign_keys=[admin_id]
        )
    users: Mapped[List["User"]] = relationship(
        foreign_keys="User.group_id"
    )


    def __repr__(self):
        return f"Group(id={self.id} admin_id={self.admin_id} admin_name={self.admin.name} group_name={self.name})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "admin": {
                "id": self.admin.id,
                "name": self.admin.name,
                "email": self.admin.email
            },
            "users": [
                user.to_dict() for user in self.users
            ]
        }
    

