import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL_SESSION_POOLER')