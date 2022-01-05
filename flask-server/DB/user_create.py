import pymysql

conn = pymysql.connect(host='localhost',
                       port=3306,
                       user='root',
                       password='passwor',
                       db='nagagima',
                       charset='utf8')

sql = '''CREATE TABLE user (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_id varchar(50) NOT NULL UNIQUE,
        user_pw varchar(100) NOT NULL,
        name varchar(15) NOT NULL,
        img_path varchar(100)
    ) 
    '''

with conn:
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()