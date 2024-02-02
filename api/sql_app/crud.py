from datetime import time

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

## Check if court is available
def check_availability(db: Session, reservation: schemas.NewReservation):
    courts = range(1,5)
    reservations_all_day = db.query(models.Reservations).filter(models.Reservations.reservation_date == reservation.reservation_date ).all()

    def is_overlapping(existing_start, existing_end, new_start, new_end):
        new_start = time.fromisoformat(new_start)
        new_end = time.fromisoformat(new_end)

        return (
            (existing_start <= new_start < existing_end)
            or (existing_start < new_end <= existing_end)
            or (new_start <= existing_start and new_end >= existing_end)
        )

    # Check availability for each court
    for court_id in courts:
        is_available = True
        for existing_reservation in reservations_all_day:
            if existing_reservation.id_court == court_id:
                if is_overlapping(
                    existing_reservation.start_time,
                    existing_reservation.end_time,
                    reservation.start_time,
                    reservation.end_time,
                ):
                    is_available = False
                    break

        if is_available:
            return court_id  # The court is available

    return None

def create_reservation(db: Session, user_id: str, reservation: schemas.NewReservation, id_court: int):
    db_reservation = models.Reservations(id_court = id_court,
                                         id_user = user_id,
                                         reservation_date = reservation.reservation_date,
                                         start_time = reservation.start_time,
                                         end_time = reservation.end_time)
    add_commit(db=db,
               row=db_reservation)
    return True

def get_reservation(db: Session, user_id: str):
    reservation = db.query(models.Reservations).filter(models.Reservations.id_user == user_id).all()
    return reservation