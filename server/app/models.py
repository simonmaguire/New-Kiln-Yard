from datetime import datetime, date, timezone
from optparse import Option
from typing import Optional, List
import sqlalchemy as sa
from sqlalchemy.orm import mapped_column, relationship, Mapped
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from sqlalchemy.dialects.postgresql import UUID
from app import db
import uuid

class Pot(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(sa.ForeignKey('profile.id'), index=True)
    user: Mapped["Profile"] = relationship(back_populates="pots")
    description: Mapped[Optional[str]] = mapped_column(sa.String(120))
    clay: Mapped[Optional[str]] = mapped_column(sa.String(60))
    stage: Mapped[Optional[str]] = mapped_column(sa.String(60))
    category: Mapped[Optional[str]] = mapped_column(sa.String(60))
    throw_date: Mapped[Optional[datetime]] = mapped_column()
    clay_weight: Mapped[Optional[float]] = mapped_column()
    thrown_height: Mapped[Optional[float]] = mapped_column()
    thrown_width: Mapped[Optional[float]] = mapped_column()
    thrown_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    trim_date: Mapped[Optional[datetime]] = mapped_column()
    green_decor: Mapped[Optional[str]] = mapped_column(sa.String(120))
    trim_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    glazes: Mapped[List["Glaze"]] = relationship(back_populates='pot')
    glaze_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    finished_date: Mapped[Optional[datetime]] = mapped_column()
    finished_width: Mapped[Optional[float]] = mapped_column()
    finished_height: Mapped[Optional[float]] = mapped_column()
    finished_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(sa.DateTime, onupdate=datetime.now(timezone.utc))

    def __repr__(self):
        return '<Pot {}>'.format(self.id)

    def to_dict(self):
        data={
            'id': self.id,
            'clay': self.clay,
            'stage': self.stage,
            'category': self.category,
            'throw_date': self.throw_date,
            'clay_weight': self.clay_weight,
            'thrown_height': self.thrown_height,
            'thrown_width': self.thrown_width,
            'thrown_notes': self.thrown_notes,
            'trim_date': self.trim_date,
            'trim_notes': self.trim_notes,
            'glazes': self.glazes,
            'glaze_notes': self.glaze_notes,
            'finished_width': self.finished_width,
            'finished_height': self.finished_height,
            'finished_notes': self.finished_notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
        return data

class Glaze(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[int] = mapped_column(index=True)
    pot_id: Mapped[int] = mapped_column(sa.ForeignKey(Pot.id),
                                               index=True)

    pot: Mapped['Pot'] = relationship(back_populates='glazes')

    def __repr__(self):
        return '<Glaze {}>'.format(self.id)

class Profile(db.Model):
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name: Mapped[Optional[str]] = mapped_column(sa.String(100))
    last_name: Mapped[Optional[str]] = mapped_column(sa.String(100))
    pots: Mapped[List["Pot"]] = relationship(back_populates="user")

    def __repr__(self):
        return '<Profile {}>'.format(self.id)


class PotSchema(SQLAlchemySchema):
    class Meta:
        model = Pot
        load_instance=True
    
    id = auto_field()
    clay = auto_field()
    stage = auto_field()
    category = auto_field()
    throw_date = auto_field()
    clay_weight = auto_field()
    thrown_height = auto_field()
    thrown_width = auto_field()
    thrown_notes = auto_field()
    trim_date = auto_field()
    trim_notes = auto_field()
    glazes = auto_field()
    glaze_notes = auto_field()
    finished_date = auto_field()
    finished_width = auto_field()
    finished_height = auto_field()
    finished_notes = auto_field()
    created_at = auto_field()
    updated_at = auto_field()