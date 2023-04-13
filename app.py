from flask import Flask, jsonify
import json

app = Flask(__name__)


@app.route('/api/data')
def api_data():

    """Add SQLAlchemy to query sqlite db"""

    file = open('resources/heart_db.json')
    data = json.load(file)

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
