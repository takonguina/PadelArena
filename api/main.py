from fastapi import FastAPI
import routers.auth as auth

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)