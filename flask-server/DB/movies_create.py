import pymysql

conn = pymysql.connect(host='127.0.0.1',
                       port=3307,
                       user='root',
                       password='93990',
                       db='nagagima',
                       charset='utf8')

sql = '''CREATE TABLE movies (
        id int(11) NOT NULL PRIMARY KEY,
        title varchar(300) NOT NULL,
        type varchar(10) NOT NULL,
        open_year int(11) NOT NULL,
        rate float(2,1) NOT NULL,
        running_time varchar(10) NOT NULL,
        genre1 varchar(10) NOT NULL,
        genre2 varchar(10),
        genre3 varchar(10),
        summary text NOT NULL
    ) 
    '''

with conn:
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()