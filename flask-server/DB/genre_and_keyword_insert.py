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
with open('data/genre_and_keyword.csv', 'r', encoding='utf-8') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    
    for line in rd:
        genre_id = line[0]
        keyword = line[1]

        sql = '''INSERT INTO genre_and_keyword(genre_id, keyword) VALUES(%s, %s)'''
        cur.execute(sql, (genre_id, keyword))

    conn.commit()
    conn.close()        




    

