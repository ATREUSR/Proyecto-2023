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

result = [[entry[2], entry[3], entry[7], entry[1], entry[8]] for entry in version]

#print(result)

import csv

csv_file_path = 'user.csv'

# Write the extracted information to a CSV file
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['nombre', 'apellido', 'numero de telefono', 'DNI', 'direccion'])  # Write header
    writer.writerows(result)

import pandas as pd
user = pd.read_csv("user.csv")
print(user)
print(user.shape)

cursor.execute("SELECT * FROM Post")
version2 = cursor.fetchall()
if version2:
    print(version2)
else:
    print('Not connected.')

result2 = [[entry[1], entry[2], entry[4], entry[5], entry[6]] for entry in version2]

csv_file_path = 'post.csv'

# Write the extracted information to a CSV file
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'titulo', 'descripcion', 'defectos', 'precio'])  # Write header
    writer.writerows(result2)

post = pd.read_csv("post.csv")
print(post)

descripcion_columna = post['precio']

# Imprimir los primeros 5 valores de la columna 'descripcion'
print(descripcion_columna.head())
