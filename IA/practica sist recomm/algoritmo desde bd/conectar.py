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
cursor.execute("SELECT user_id,title,defects,description,price FROM Post")
version = cursor.fetchall()


if version:
    print(version)
else:
    print('Not connected.')

#result = [[entry[1], entry[2], entry[3], entry[4], entry[6], entry[5], entry[7]] for entry in version]

#print(result)

import csv

csv_file_path = 'post.csv'

# Write the extracted information to a CSV file
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'title', 'defectos', 'description', 'Price'])  # Write header
    writer.writerows(version)

import pandas as pd
post = pd.read_csv("post.csv")
print(post)
# print(user.shape)

# cursor.execute("SELECT * FROM Review")
# version2 = cursor.fetchall()
# if version2:
#     print(version2)
# else:
#     print('Not connected.')

# result2 = [[entry[0], entry[1], entry[2], entry[3], entry[4]] for entry in version2]

# csv_file_path = 'Review.csv'

# # Write the extracted information to a CSV file
# with open(csv_file_path, mode='w', newline='') as file:
#     writer = csv.writer(file)
#     writer.writerow(['0', '1', '2', '3', '4'])  # Write header
#     writer.writerows(result2)

# Review = pd.read_csv("Review.csv")
# print(Review)

# descripcion_columna = Review['4']

# # Imprimir los primeros 5 valores de la columna 'descripcion'
# print(descripcion_columna.head())
