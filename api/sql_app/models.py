from .database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func

class Users(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    first_name =Column(String(64), nullable=False)
    last_name =Column(String(64), nullable=False)
    birthday = Column(DateTime, nullable=False)
    email = Column(String(64), nullable=False)
    password = Column(String(64), nullable=False)
    email_validated = Column(Boolean, default=False,nullable=False)
    date_insert = Column(DateTime, default=func.now(), nullable=False)