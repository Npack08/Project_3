from flask import Flask, jsonify
import pandas as pd
import sqlite3


conn = sqlite3.connect('resources/heart_db.db')
heart_data = pd.read_sql_query("SELECT * FROM heart_data", conn)
conn.close()

app = Flask(__name__)


@app.route('/api/data')
def api_data():

    df = heart_data
    df_dict = df.to_dict('records')
    return jsonify(df_dict)


@app.route('/api/male_cholesterol')
def male_chol_data():

    df = heart_data
    male_df = df.loc[df['sex'] == "M"].groupby('ageGroup').mean().round(2)
    df_dict = male_df.to_dict('index')

    return jsonify(df_dict)


@app.route('/api/female_cholesterol')
def female_chol_data():

    df = heart_data
    female_df = df.loc[df['sex'] == "F"].groupby('ageGroup').mean().round(2)
    df_dict = female_df.to_dict('index')

    return jsonify(df_dict)


@app.route('/api/all_sex_cholesterol')
def all_sex_chol_data():

    df = heart_data
    all_sex_df = df.groupby(['ageGroup', 'sex']).mean().round(2)
    df_dict = all_sex_df.to_dict('index')
    new_dict = []
    for key, value in df_dict.items():
        value.update({"group": key[0], "gender": key[1]})
        new_dict.append(value)

    return jsonify(new_dict)


if __name__ == '__main__':
    app.run(debug=True)
