import pandas as pd
import numpy as np
from itertools import count

playlist_df = pd.read_csv("playlist_2010to2022.csv")

pd.set_option("display.max_rows",None)
pd.set_option("display.max_columns",None)

playlist_df.head()
playlist_df = playlist_df[['artist_name','album','artist_genres','time_signature','playlist_url']]
playlist_df.head()

playlist_df.shape

playlist_df.info()
playlist_df.isnull().sum()
playlist_df.duplicated().sum()
playlist_df.head()

playlist_df.iloc[0].artist_genres

import ast
def convert(obj): 
    L = []           
    for i in ast.literal_eval(obj): 
        L.append(i['name']) 
    return L

playlist_df['artist_name']

playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã©", "e")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("*", "")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Camâ€™ron", "Cam'ron")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã³", "ó")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã˜", "o")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("$", "S")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã¡", "á")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã", "í")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã¥", "a")
playlist_df['artist_name'] = playlist_df['artist_name'].str.replace("Ã‰", "e")

playlist_df['artist_name']

playlist_df['artist_name'] = playlist_df['artist_name'].apply(convert)
playlist_df['album'] = playlist_df['album'].apply(convert)