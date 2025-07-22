from app import app, models, db
import sqlalchemy as sa
from app.models import Pot, PotSchema
from flask import request
from sqlalchemy.orm import Session


@app.route('/')
@app.route('/index')
def index():
    return 'Well Done'


@app.route('/pots')
def pots():
    user_id = request.args.get('user_id')
    if user_id is None:
        return 'user_id parameter is required', 400

    query = sa.select(Pot).where(Pot.user_id == user_id)
    pots = db.session.scalars(query).all()
    pots_schema = PotSchema(many=True)

    pots_result = pots_schema.dump(pots)

    return pots_result

@app.route('/pot/<int:pot_id>')
def pot(pot_id):
    query = sa.select(Pot).where(Pot.id == pot_id)
    pot = db.session.scalars(query).one()
    pots_schema = PotSchema(many=False)

    pot_result = pots_schema.dump(pot)

    return pot_result

@app.route('/create-pot', methods=['POST'])
def create_pot():
    engine = sa.create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    with Session(engine) as session:
        newPot = Pot(
            description = request.json.get('description') or None,
            user_id = request.json.get('user_id') or None,
            clay = request.json.get('clay') or None,
            category = request.json.get('category') or None,
            stage = request.json.get('stage') or None,
            clay_weight = request.json.get('clayWeight') or None,
            throw_date = request.json.get('throwDate') or None,
            thrown_height = request.json.get('throwHeight') or None,
            thrown_width = request.json.get('throwWidth') or None,
            thrown_notes = request.json.get('throwNotes') or None,
            green_decor = request.json.get('greenDecor') or None,
            trim_date = request.json.get('trimDate') or None,
            trim_notes = request.json.get('trimNotes') or None,
            # glazes = request.json.get('glazes'),
            glaze_notes = request.json.get('glazeNotes') or None,
            finished_date = request.json.get('finishedDate') or None,
            finished_height = request.json.get('finishedHeight') or None,
            finished_width = request.json.get('finishedWidth') or None,
            finished_notes = request.json.get('finishedNotes') or None,

            )
        session.add(newPot)
        session.commit()

        return({'id' : newPot.id})

@app.route('/update-pot/<int:pot_id>', methods=['PUT'])
def update_pot(pot_id):
    engine = sa.create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

    with Session(engine) as session:
        new_values = {
            'description': request.json.get('description') or None,
            'clay': request.json.get('clay') or None,
            'category' : request.json.get('category') or None,
            'stage' : request.json.get('stage') or None,
            'clay_weight' : request.json.get('clayWeight') or None,
            "throw_date" : request.json.get('throwDate') or None,
            'thrown_height' : request.json.get('throwHeight') or None,
            'thrown_width' : request.json.get('throwWidth') or None,
            'thrown_notes' : request.json.get('throwNotes') or None,
            "trim_date" : request.json.get('trimDate') or None,
            'green_decor' : request.json.get('greenDecor') or None,
            'trim_notes' : request.json.get('trimNotes') or None,
            # glazes = request.json.get('glazes'),
            'glaze_notes' : request.json.get('glazeNotes') or None,
            'finished_date' : request.json.get('finishedDate') or None,
            'finished_height' : request.json.get('finishedHeight') or None,
            'finished_width' : request.json.get('finishedWidth') or None,
            'finished_notes' : request.json.get('finishedNotes') or None,
        }
        session.query(Pot).where(Pot.id == pot_id).update(new_values)
        session.commit()

        return('Success')

