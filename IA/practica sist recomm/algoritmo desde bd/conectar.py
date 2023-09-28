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

result = [[entry[2], entry[3], entry[7], entry[8]] for entry in version]

#print(result)

import csv

csv_file_path = 'user.csv'

# Write the extracted information to a CSV file
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['nombre', 'apellido', 'numero de telefono', 'direccion'])  # Write header
    writer.writerows(result)

import pandas as pd
user = pd.read_csv("user.csv")
print(user)

print(user.shape)

import ast
def convert(obj): 
    L = []           
    for i in ast.literal_eval(obj): 
        L.append(i['name']) 
    return L
user.info()