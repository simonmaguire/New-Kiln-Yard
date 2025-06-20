from datetime import date
from typing import Optional, List
import sqlalchemy as sa
from sqlalchemy.orm import mapped_column, relationship, Mapped
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from app import db

class Pot(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    clay: Mapped[Optional[str]] = mapped_column(sa.String(60))
    stage: Mapped[Optional[str]] = mapped_column(sa.String(60))
    category: Mapped[Optional[str]] = mapped_column(sa.String(60))
    throw_date: Mapped[Optional[date]] = mapped_column()
    clay_weight: Mapped[Optional[float]] = mapped_column()
    thrown_height: Mapped[Optional[float]] = mapped_column()
    thrown_width: Mapped[Optional[float]] = mapped_column()
    thrown_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    trim_date: Mapped[Optional[date]] = mapped_column()
    trim_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    glazes: Mapped[List["Glaze"]] = relationship(back_populates='pot')
    glaze_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))
    finished_width: Mapped[Optional[float]] = mapped_column()
    finished_height: Mapped[Optional[float]] = mapped_column()
    finished_notes: Mapped[Optional[str]] = mapped_column(sa.String(255))

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
    finished_width = auto_field()
    finished_height = auto_field()
    finished_notes = auto_field()