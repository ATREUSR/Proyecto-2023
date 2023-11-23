# from dotenv import load_dotenv
# load_dotenv()
# import os
# import mysql.connector as sql
# import random

# db_host= os.getenv("DB_HOST")
# db_user=os.getenv("DB_USERNAME")
# db_passwd= os.getenv("DB_PASSWORD")
# db_name= os.getenv("DB_NAME")

# conn = sql.connect(host = db_host, 
#                    user = db_user,
#                    password = db_passwd,
#                    db = db_name)
# cursor = conn.cursor()
# cursor.execute("SELECT count(user_id) as likes, post_id FROM Liked group by post_id order by likes desc")
# version = cursor.fetchall()


# if version:
#     print(version)
# else:
#     print('Not connected.')
# for i in range(100):
#     post_id = random.randint(500, 525)
#     user_id = random.randint(10, 99)
#     print(f"({user_id}, {post_id}),")
    
# def recommend_posts(quantity):
#     conn = sql.connect(host = db_host,
#                    user = db_user,
#                    password = db_passwd,
#                    db = db_name)
#     cursor = conn.cursor()
#     cursor.execute("SELECT count(user_id) as likes, post_id FROM Liked order by likes desc")
#     version = cursor.fetchall()
    
# def recommend_posts(user_id):
#     conn = sql.connect(host = db_host,
#                        user = db_user,
#                        password = db_passwd,
#                        db = db_name)
#     cursor = conn.cursor()
#     cursor.execute("""
#         SELECT count(user_id) as likes, post_id 
#         FROM Liked 
#         WHERE user_id IN (
#             SELECT user_id 
#             FROM Liked 
#             WHERE post_id IN (
#                 SELECT post_id 
#                 FROM Liked 
#                 WHERE user_id = %s
#             ) 
#             AND user_id != %s)
#         GROUP BY post_id ORDER BY likes DESC, post_id ASC""", (user_id, user_id)
#     )
#     recommended_posts = cursor.fetchall()
#     post_ids = []
#     for likes, post_id in recommended_posts:
#         post_ids.append(post_id)
#     return post_ids

# print(recommend_posts(49))

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import os
import mysql.connector as sql
import random

app = FastAPI()

# Load environment variables
load_dotenv()
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USERNAME")
db_passwd = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")

# Function to establish a database connection
def get_db_connection():
    return sql.connect(host=db_host, user=db_user, password=db_passwd, db=db_name)

# Endpoint to get the initial data
@app.get("/get_initial_data")
async def get_initial_data():
    try:
        # Establish a connection to the database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Execute the SQL query to get initial data
        cursor.execute("SELECT count(user_id) as likes, post_id FROM Liked GROUP BY post_id ORDER BY likes DESC")
        version = cursor.fetchall()

        return {"version": version}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to generate and print random data
def generate_random_data():
    for i in range(100):
        post_id = random.randint(500, 525)
        user_id = random.randint(10, 99)
        print(f"({user_id}, {post_id}),")
    return user_id, post_id

# Endpoint to recommend posts for a given user_id
@app.get("/recommend_posts/{user_id}")
async def recommend_posts(user_id: int):
    try:
        # Establish a connection to the database
        user_id, posts_id = generate_random_data()
        conn = get_db_connection()
        cursor = conn.cursor()

        # Execute the SQL query to recommend posts
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
                AND user_id != %s)
            GROUP BY post_id ORDER BY likes DESC, post_id ASC""", (user_id, user_id)
        )
        recommended_posts = cursor.fetchall()
        return {"user_id": user_id, "recommended_posts": posts_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))