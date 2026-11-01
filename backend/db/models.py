from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import ForeignKey, func
from connection import engine
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
    missions: Mapped[List["Mission"]] = relationship(back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"User(id={self.id}, name={self.name}, email={self.email}, password=****)"

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


Base.metadata.create_all(bind=engine)
