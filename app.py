from flask import Flask, render_template
# import pandas as pd
# import sqlite3


app = Flask(__name__)

# # Read sqlite query results into a pandas DataFrame
# conn = sqlite3.connect("resources/heart.db")
# df = pd.read_sql_query("SELECT * FROM heart_db", conn)
#
# # Close connection
# conn.close()


@app.route('/')
def index():

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
