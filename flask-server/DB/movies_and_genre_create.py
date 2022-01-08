import pymysql

conn = pymysql.connect(host='localhost',
                       port=3306,
                       user='root',
                       password='93990',
                       db='nagagima',
                       charset='utf8')

sql = '''CREATE TABLE movies_and_genre (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        movie_id int(11) NOT NULL,
        genre_id int(11) NOT NULL
    ) 
    '''

with conn:
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()