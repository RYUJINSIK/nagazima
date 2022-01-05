import pymysql

#host, port, user, password 확인 
conn = pymysql.connect(host='localhost',
                       port=3306,
                       user='root',
                       password='password!@',
                       charset='utf8')


with conn:
    with conn.cursor() as cur:
        cur.execute('CREATE DATABASE nagagima')
        conn.commit()