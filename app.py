import pandas as pd
import sqlite3

# Read sqlite query results into a pandas DataFrame
conn = sqlite3.connect("heart.db")
df = pd.read_sql_query("SELECT * FROM heart_db", conn)

# Verify that result of SQL query is stored in the dataframe
print(df)

conn.close()
