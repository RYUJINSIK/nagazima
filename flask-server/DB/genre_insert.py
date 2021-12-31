import pymysql
import csv

conn = pymysql.connect(host='127.0.0.1',
                       port=3307,
                       user='root',
                       password='93990',
                       db='nagagima',
                       charset='utf8')

cur = conn.cursor()
conn.commit()
#파일 실행 위치 확인 후 위치 변경해야 할 수 도 있음
with open('data/genre.csv', 'r', encoding='utf-8') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    
    for line in rd:

        genre = line[1]

        sql = '''INSERT INTO genre(genre) VALUES(%s)'''
        cur.execute(sql, (genre))

    conn.commit()
    conn.close()        




    
