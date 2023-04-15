from flask import Flask, jsonify
import sqlite3


app = Flask(__name__)


@app.route('/api/data')
def api_data():

    # create connection to database
    conn = sqlite3.connect('resources/heart_db.db')

    # create cursor object
    cur = conn.cursor()

    # execute query
    cur.execute("SELECT * FROM heart_data")

    # get column names
    cols = [description[0] for description in cur.description]

    # retrieve data
    results = cur.fetchall()

    # close connection
    conn.close()

    # zip column names and data into list of dictionary objects
    data = []
    for row in results:
        data.append(dict(zip(cols, row)))

    # return json data to api call
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
