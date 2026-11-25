from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
POSGRESS_URL = os.getenv("POSGRESS_URL")


engine = create_engine(POSGRESS_URL)
session = sessionmaker(bind=engine)