from fastapi import FastAPI
import routers.auth as auth
import routers.users as users
import routers.reservation as reservation

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(reservation.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)