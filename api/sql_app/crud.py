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