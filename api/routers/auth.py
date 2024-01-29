import os

from fastapi import APIRouter, Depends, HTTPException

from jose import jwt, JWTError

from passlib.context import CryptContext

from sql_app.crud import create_user, check_email
from sql_app.dependencies.security import create_access_token
from sql_app.dependencies.session import get_db
from sql_app.schemas import CreateUserRequest, Token,UserLogin

from sqlalchemy.orm import Session

from starlette import status


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY: str = f"{os.environ.get('SECRET_KEY')}"
ALGORITHM: str = "HS256"

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)

@router.post("/register/", status_code=status.HTTP_201_CREATED)
async def user_register(
    user_info: CreateUserRequest,
    db_session: Session = Depends(get_db)
):
    user = create_user(db=db_session, data=CreateUserRequest(first_name = user_info.first_name,
                                                             last_name = user_info.last_name,
                                                             birthday= user_info.birthday,
                                                             email= user_info.email,
                                                             password= bcrypt_context.hash(user_info.password)
                                                             ))

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail="Email already registered"
        )
    
    return {"message: User created successfully"}

@router.post("/login/", status_code=status.HTTP_200_OK, response_model=Token)
async def user_login(
    user_login: UserLogin,
    db_session: Session = Depends(get_db)
):
    
    db_user = check_email(db=db_session, data=user_login)

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not registered"
        )
    
    check_password = verify_password(plain_password=user_login.password,
                                     hashed_password=db_user.password)
    
    if not check_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wrong Password"
        )

    access_token = create_access_token(data={"sub": str(db_user.id_user)})


    return {
        "access_token": access_token,
        "token_type": "bearer"}