from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql+psycopg2://simcha:simcha@localhost:5432/to-dos")
session = sessionmaker(bind=engine)