from datetime import datetime

from sqlalchemy import and_, cast, func, or_, Time
from sqlalchemy.orm import Session

from . import models, schemas

def add_commit(db: Session, row):
    db.add(row)
    db.commit()

def create_user(db: Session, data: schemas.CreateUserRequest):
    check_email = db.query(models.Users).filter(models.Users.email == data.email).first()
    if check_email is None:
        db_user = models.Users(first_name = data.first_name,
                               last_name = data.last_name,
                               birthday = data.birthday,
                               email = data.email,
                               password = data.password)
        add_commit(db=db,
                   row=db_user)
        return True
    else:
        return None

def check_email(db: Session, data: schemas.UserLogin):
    return db.query(models.Users).filter(models.Users.email == data.email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.Users).filter(models.Users.id_user == user_id).first()

def change_user_infos(db: Session, user_info: schemas.UserInfos, user_id: int):
    user = db.query(models.Users).filter(models.Users.id_user == user_id).first()
    if user == None:
        return None
    user.first_name = user_info.first_name
    user.last_name = user_info.last_name
    if user.email != user_info.email:
        user.email = user_info.email
        user.email_validated = False
    user.birthday = user_info.birthday
    add_commit(db=db,
               row=user)
    return True

def change_password(db: Session, user_id: str, new_password: str):
    user = db.query(models.Users).filter(models.Users.id_user == user_id).first()
    if user == None:
        return None
    user.password = new_password
    add_commit(db=db,
               row=user)
    return True


def create_reservation(db: Session, user_id: str, reservation: schemas.NewReservation):
    check_court = 1
    
    if check_court == False:
        return False

    db_reservation = models.Reservations(id_court = check_court,
                                         id_user = user_id,
                                         reservation_date = reservation.reservation_date,
                                         start_time = reservation.start_time,
                                         end_time = reservation.end_time)
    add_commit(db=db,
               row=db_reservation)
    return True