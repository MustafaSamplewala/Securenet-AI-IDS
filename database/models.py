from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class User(UserMixin,db.Model):

    __tablename__="users"

    id=db.Column(
        db.Integer,
        primary_key=True
    )

    name=db.Column(
        db.String(100),
        nullable=False
    )

    email=db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    password=db.Column(
        db.String(300),
        nullable=False
    )


from datetime import datetime

class Prediction(db.Model):

    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)

    protocol = db.Column(db.String(50))

    service = db.Column(db.String(100))

    flag = db.Column(db.String(20))

    result = db.Column(db.String(20))

    confidence = db.Column(db.Float)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )