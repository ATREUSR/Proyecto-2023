#import pandas as pd
#import sqlite3
#import psycopg2

#con_sqlite = sqlite3.connect(DATABASE_URL='mysql://jj1j7erszbp1hxkgk2ot:pscale_pw_UIUpWr5B9Ph3IvBIZToAMCOMCLNLvVqqd94rWStk8Ot@aws.connect.psdb.cloud/outller?sslaccept=strict')





import mysql.connector

conexion = mysql.connector.connect(user = 'u70yokvfncmgbx40aqk7', password = 'pscale_pw_gejJapzORKA05XTJoeEmVvh2ZVq70MaNO0XOTRMuLAK',
                                   host = 'aws.connect.psdb.cloud',
                                   database = ''
                                   port = '')