import os

from fastapi import APIRouter, Depends, HTTPException

from jose import jwt, JWTError

from passlib.context import CryptContext

from sql_app.crud import create_reservation
from sql_app.dependencies.security import decode_jwt
from sql_app.dependencies.session import get_db
from sql_app.schemas import NewReservation

from sqlalchemy.orm import Session

from starlette import status

router = APIRouter(
    prefix='/reservation',
    tags=['reservation']
)

@router.post("/new_reservation/")
async def get_user(access_token: str,
                   new_reservation: NewReservation,
                   db_session: Session = Depends(get_db)):
    
    user_id = decode_jwt(access_token)
    request_reservation = create_reservation(db=db_session,
                                             user_id=user_id,
                                             reservation=new_reservation)
    if request_reservation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Error"
        )
    
    if request_reservation is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No court available"
        )

    return {"Reservation booked successfully"}