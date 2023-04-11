import csv
import sqlite3

conn = sqlite3.connect('heart.db')
cursor = conn.cursor()

create_table = '''
CREATE TABLE heart_db(
    age INTEGER,
    sex TEXT,
    chestPainType TEXT,
    restingBP INTEGER,
    cholesterol INTEGER,
    fastingBS INTEGER,
    restingECG TEXT,
    maxHR INTEGER,
    exerciseAngina TEXT,
    oldpeak REAL,
    st_slope TEXT,
    heartDisease INTEGER
);
'''

cursor.execute(create_table)

file = open("heart.csv")

contents = csv.reader(file)
next(contents, None)

insert_records = """
INSERT INTO heart_db (
    age,
    sex,
    chestPainType,
    restingBP,
    cholesterol,
    fastingBS,
    restingECG,
    maxHR,
    exerciseAngina,
    oldpeak,
    st_slope,
    heartDisease
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
"""

cursor.executemany(insert_records, contents)

conn.commit()
conn.close()
