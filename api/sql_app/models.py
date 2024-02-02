from .database import Base
from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, String, Time, func
from sqlalchemy.orm import relationship

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

    reservations = relationship("Reservations", back_populates="user")


class Courts(Base):
    __tablename__ = "courts"

    id_court = Column(Integer, primary_key=True, index=True)
    reservations = relationship("Reservations", back_populates="court")


class Reservations(Base):
    __tablename__ = "reservations"

    id_reservation = Column(Integer, primary_key=True, index=True)
    id_court = Column(Integer, ForeignKey("courts.id_court"), nullable=False)
    id_user = Column(Integer, ForeignKey("users.id_user"), nullable=False)
    reservation_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    court = relationship("Courts", back_populates="reservations")
    user = relationship("Users", back_populates="reservations")