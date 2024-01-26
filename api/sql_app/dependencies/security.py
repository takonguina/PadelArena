import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from typing import Optional

http_bearer =  HTTPBearer()

credentials_exception = HTTPException(
	status_code=status.HTTP_401_UNAUTHORIZED,
	detail="Could not validate credentials",
	headers={"WWW-Authenticate": "Bearer"},
)


def create_access_token(data: dict, expires_delta: Optional[int] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + timedelta(minutes=expires_delta)
        to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, f"{os.environ.get('SECRET_KEY')}", algorithm="HS256")
    return encoded_jwt


def decode_jwt(jwt_in: str) -> int:
    try:
        payload = jwt.decode(
            jwt_in,
            key=f"{os.environ.get('SECRET_KEY')}",
            algorithms="HS256"
        )
        sub: str = payload.get("sub")

    except JWTError as error:
        raise credentials_exception
    
    return int(sub)