import os

from fastapi import APIRouter, Depends, HTTPException

from jose import jwt, JWTError

from passlib.context import CryptContext

from sql_app.crud import get_user_by_id, change_password, change_user_infos
from sql_app.dependencies.security import decode_jwt
from sql_app.dependencies.session import get_db
from sql_app.schemas import UserInfos

from sqlalchemy.orm import Session

from starlette import status


router = APIRouter(
    prefix='/users',
    tags=['users']
)

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)

@router.post("/user/")
async def get_user(token: str,
                   db_session: Session = Depends(get_db)):
    
    check_token = decode_jwt(token)
    user = get_user_by_id(db=db_session, user_id=check_token)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wrong token"
        )

    return {user}

@router.post("/change_infos/", status_code=status.HTTP_200_OK)
async def new_infos(
    access_token: str,
    user_info: UserInfos,
    db_session: Session = Depends(get_db)
):
    
    user_id = decode_jwt(access_token)
    new_infos =  change_user_infos(db=db_session,
                                   user_info=user_info,
                                   user_id=user_id)


    if new_infos is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wrong token"
        )

    return {"message: Informations changed"}

@router.post("/change_password/", status_code=status.HTTP_200_OK)
async def new_infos(
    access_token: str,
    new_password: str,
    db_session: Session = Depends(get_db)
):
    
    user_id = decode_jwt(access_token)
    password_change =  change_password(db=db_session,
                                   new_password=bcrypt_context.hash(new_password),
                                   user_id=user_id)


    if password_change is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wrong token"
        )

    return {"message: Password changed"}