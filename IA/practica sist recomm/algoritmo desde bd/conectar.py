from dotenv import load_dotenv
load_dotenv()
import os
import mysql.connector as sql

db_host= os.getenv("DB_HOST")
db_user=os.getenv("DB_USERNAME")
db_passwd= os.getenv("DB_PASSWORD")
db_name= os.getenv("DB_NAME")

conn = sql.connect(host = db_host,
                   user = db_user,
                   password = db_passwd,
                   db = db_name)
cursor = conn.cursor()
cursor.execute("SELECT * FROM User")
version = cursor.fetchall()


if version:
    print(version)
else:
    print('Not connected.')