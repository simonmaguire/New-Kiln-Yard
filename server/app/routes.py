from app import app, models, db
import sqlalchemy as sa
from app.models import Pot, PotSchema


@app.route('/')
@app.route('/index')
def index():
    return 'Well Done'


@app.route('/pots')
def pots():
    data=[]
    query = sa.select(Pot)
    pots = db.session.scalars(query).all()
    pots_schema = PotSchema(many=True)

    pots_result = pots_schema.dump(pots)


    return pots_result