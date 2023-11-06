from dotenv import load_dotenv
load_dotenv()
import os
import mysql.connector as sql

db_host= os.getenv("DB_HOST")
db_user=os.getenv("DB_USERNAME")
db_passwd= os.getenv("DB_PASSWORD")
db_name= os.getenv("DB_NAME")

#conn = sql.connect(host = db_host,
#                   user = db_user,
#                   password = db_passwd,
#                   db = db_name)
#cursor = conn.cursor()
#cursor.execute("SELECT * FROM Liked")
#version = cursor.fetchall()


#if version:
#    print(version)
#else:
#    print('Not connected.')
    
#def recommend_posts(quantity):
#    conn = sql.connect(host = db_host,
#                   user = db_user,
#                   password = db_passwd,
#                   db = db_name)
#    cursor = conn.cursor()
#    cursor.execute("SELECT count(user_id) as likes, post_id FROM Liked order by likes desc")
#    version = cursor.fetchall()
    
def recommend_posts(user_id):
    conn = sql.connect(host = db_host,
                       user = db_user,
                       password = db_passwd,
                       db = db_name)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT count(user_id) as likes, post_id 
        FROM Liked 
        WHERE user_id IN (
            SELECT user_id 
            FROM Liked 
            WHERE post_id IN (
                SELECT post_id 
                FROM Liked 
                WHERE user_id = %s
            ) 
            AND user_id != %s
        GROUP BY post_id ORDER BY likes DESC, post_id ASC""", (user_id, user_id)
    )
    version = cursor.fetchall()
    if version:
        print(version)
    else:
        print('Not connected.')











#result = [[entry[1], entry[2], entry[3], entry[4], entry[6], entry[5], entry[7]] for entry in version]

#print(result)

# import csv

# csv_file_path = 'post.csv'

# # Write the extracted information to a CSV file
# with open(csv_file_path, mode='w', newline='') as file:
#     writer = csv.writer(file)
#     writer.writerow(['id', 'title', 'defectos', 'description', 'Price'])  # Write header
#     writer.writerows(version)

# import pandas as pd
# post = pd.read_csv("post.csv")
# post = post.dropna()
# print(post)
# user = pd.read-csv("user.csv")
# user = user.dropna()
# print(user)
# from sklearn.feature_extraction.text import TfidfVectorizer

# # Vectorización de descripciones de productos
# tfidf_vectorizer = TfidfVectorizer()
# producto_descripciones = tfidf_vectorizer.fit_transform(post['description'])

# from sklearn.preprocessing import LabelEncoder

# label_encoder = LabelEncoder()
# #user['UsuarioID'] = label_encoder.fit_transform(user['UsuarioID'])



# # print(user.shape)

# # cursor.execute("SELECT * FROM Review")
# # version2 = cursor.fetchall()
# # if version2:
# #     print(version2)
# # else:
# #     print('Not connected.')

# # result2 = [[entry[0], entry[1], entry[2], entry[3], entry[4]] for entry in version2]

# # csv_file_path = 'Review.csv'

# # # Write the extracted information to a CSV file
# # with open(csv_file_path, mode='w', newline='') as file:
# #     writer = csv.writer(file)
# #     writer.writerow(['0', '1', '2', '3', '4'])  # Write header
# #     writer.writerows(result2)

# # Review = pd.read_csv("Review.csv")
# # print(Review)

# # descripcion_columna = Review['4']

# # # Imprimir los primeros 5 valores de la columna 'descripcion'
# # print(descripcion_columna.head())

