from typing import Optional
from pydantic import BaseModel
from majors_data import majors_data
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


class MajorQuery(BaseModel):
    showMajors: Optional[bool] = False

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/majors_data")
def get_majors_data():
    return majors_data


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True, workers=3)
