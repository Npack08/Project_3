from flask import Flask, jsonify
import pandas as pd
import numpy as np
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

    table = heart_data[heart_data.sex == 'M'].pivot_table(
        values=['cholesterol'],
        index=['ageGroup'],
        columns=['heartDisease'],
        aggfunc=np.mean,
        fill_value=0
    ).round(2)

    df_dict = table.to_dict('index')
    list_dicts = []
    for key, value in df_dict.items():
        for key2, value2 in value.items():
            if key2[1] == 0:
                hd = "No"
            else:
                hd = "Yes"
            list_dicts.append({"ageGroup": key, key2[0]: value2, "heartDisease": hd})

    return jsonify(list_dicts)


@app.route('/api/female_cholesterol')
def female_chol_data():

    table = heart_data[heart_data.sex == 'F'].pivot_table(
        values=['cholesterol'],
        index=['ageGroup'],
        columns=['heartDisease'],
        aggfunc=np.mean,
        fill_value=0
    ).round(2)

    df_dict = table.to_dict('index')
    list_dicts = []
    for key, value in df_dict.items():
        for key2, value2 in value.items():
            if key2[1] == 0:
                hd = "No"
            else:
                hd = "Yes"
            list_dicts.append({"ageGroup": key, key2[0]: value2, "heartDisease": hd})

    return jsonify(list_dicts)


@app.route('/api/all_sex_cholesterol')
def all_sex_chol_data():

    table = pd.pivot_table(
        heart_data,
        values=['cholesterol'],
        index=['ageGroup'],
        columns=['heartDisease'],
        aggfunc=np.mean,
        fill_value=0
    ).round(2)

    df_dict = table.to_dict('index')
    list_dicts = []
    for key, value in df_dict.items():
        for key2, value2 in value.items():
            if key2[1] == 0:
                hd = "No"
            else:
                hd = "Yes"
            list_dicts.append({"ageGroup": key, key2[0]: value2, "heartDisease": hd})

    return jsonify(list_dicts)


if __name__ == '__main__':
    app.run(debug=True)
