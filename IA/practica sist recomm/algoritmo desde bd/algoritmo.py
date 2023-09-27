import sqlalchemy
import pandas as pd
from sqlite3 import connect
conn = connect(':memory:')
df = pd.DataFrame(data=[[0, '10/11/12'], [1, '12/11/10']],
                   columns=['int_column', 'date_column'])
df.to_sql(name='test_data', con=conn)

pd.read_sql('SELECT int_column, date_column FROM test_data', conn)

pd.read_sql('test_data', 'postgres:///db_name')

pd.read_sql('SELECT int_column, date_column FROM test_data',
             conn,
             parse_dates={"date_column": {"format": "%d/%m/%y"}})