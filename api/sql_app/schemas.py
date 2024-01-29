from pydantic import BaseModel
from datetime import datetime

class CreateUserRequest(BaseModel):
    first_name: str
    last_name: str
    birthday: datetime
    email: str
    password: str
    

class User(CreateUserRequest):
    email_validated: bool
    date_insert: datetime

class UserLogin(BaseModel):
    email : str
    password: str

class UserInfos(BaseModel):
    first_name: str
    last_name: str
    birthday: datetime
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str