import pymysql

conn = pymysql.connect(host='127.0.0.1',
                       port=3307,
                       user='root',
                       password='93990',
                       db='nagagima',
                       charset='utf8')

sql = '''CREATE TABLE keyword_and_movie (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        movie_id int(11) NOT NULL,
        keyword_id int(11) NOT NULL
    ) 
    '''

with conn:
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()