import csv
import sqlite3

conn = sqlite3.connect('resources/heart_db.db')
cursor = conn.cursor()

create_table = '''
CREATE TABLE heart_data (
    age INTEGER,
    sex TEXT,
    chestPainType TEXT,
    restingBP INTEGER,
    cholesterol INTEGER,
    fastingBS INTEGER,
    restingECG TEXT,
    maxHR INTEGER,
    exerciseAngina TEXT,
    oldPeak REAL,
    stSlope TEXT,
    heartDisease INTEGER,
    ageGroup TEXT
);
'''

cursor.execute(create_table)

file = open("resources/heart.csv")

contents = csv.reader(file)
next(contents, None)

insert_records = """
INSERT INTO heart_data (
    age,
    sex,
    chestPainType,
    restingBP,
    cholesterol,
    fastingBS,
    restingECG,
    maxHR,
    exerciseAngina,
    oldPeak,
    stSlope,
    heartDisease,
    ageGroup
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
"""

cursor.executemany(insert_records, contents)

conn.commit()
conn.close()
