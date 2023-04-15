import json
from flask import Flask
import sqlalchemy as db


app = Flask(__name__)


@app.route('/api/data')
def api_data():
    # Create engine connection and table information
    engine = db.create_engine('sqlite:///resources/heart_db.db')
    conn = engine.connect()
    metadata = db.MetaData()

    # Load table structure and query data
    heart_data = db.Table('heart_data', metadata, autoload=True, autoload_with=engine)
    query = db.select([heart_data])
    results = conn.execute(query)
    data = results.fetchall()

    return json.dumps([dict(row) for row in data])


if __name__ == '__main__':
    app.run(debug=True)
