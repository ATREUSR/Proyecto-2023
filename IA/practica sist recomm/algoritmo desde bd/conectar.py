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

import csv

data = [
    (3, 47871184, 'Ulises', 'Wolfzun', 'wolfzunulises@gmail.com', '$2b$10$yC7WleIt5JdGgGMkVVRqneQ9ZEGLCx9AhLRoIwwlF5R5YTFQnCIk2', 0, '+54 911 64632684', "O' Higgins 3861"),
    (4, 47394146, 'Agustin', 'Colinas', 'Agustincolinas6@gmail.com', '$2b$10$rVIe8ZsePjrbyCLEi7zymOfUv80WU7plCe6ju0GG7SgX5QHz/a69q', 0, '+54 911 64632684', "O' Higgins 3861"),
    (7, 473146, 'Agustin', 'Colinas', 'Agustinconas6@gmail.com', '$2b$10$wvQkV1f/z8RE6kx4NIlKTeM/W6wtv3.fJXKje/Sq3AVzUwCqkfrCG', 0, '+54 911 64632684', "O' Higgins 3861")
]

# Nombre del archivo CSV
csv_filename = "datos_user.csv"

# Crear y escribir en el archivo CSV
with open(csv_filename, 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    
    # Escribir el encabezado del CSV
    csv_writer.writerow(["Nombre", "Apellido", "Dirección", "Número de Teléfono", "DNI"])
    
    # Escribir los datos de la lista en el CSV
    for row in data:
        csv_writer.writerow([row[2], row[3], row[8], row[7], row[1]])

print(f"Los datos se han guardado en '{csv_filename}' como un archivo CSV.")


import pandas as pd

user_df = pd.read_csv("datos_user.csv", encoding="latin1")

print(user_df)