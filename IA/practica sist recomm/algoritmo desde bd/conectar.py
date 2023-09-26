import os
import MySQLdb # import the MySQLdb module
from dotenv import load_dotenv
load_dotenv()

# Create the connection object
connection = MySQLdb.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USERNAME"),
    passwd=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    ssl_mode="VERIFY_IDENTITY",
    ssl={
        'ca': os.getenv("SSL_CERT")
    }
)

# Create cursor and use it to execute SQL command
cursor = connection.cursor()
cursor.execute("select @@version")
version = cursor.fetchone()

if version:
    print('Running version: ', version)
else:
    print('Not connected.')