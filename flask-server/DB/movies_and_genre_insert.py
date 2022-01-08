import pymysql
import csv

conn = pymysql.connect(host='localhost',
                       port=3306,
                       user='root',
                       password='93990',
                       db='nagagima',
                       charset='utf8')

cur = conn.cursor()
conn.commit()
#파일 실행 위치 확인 후 위치 변경해야 할 수 도 있음
with open('data/movie_genre.csv', 'r', encoding='utf-8') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    
    for line in rd:
        movie_id = line[0]
        genre_id = line[1]

        sql = '''INSERT INTO movies_and_genre(movie_id, genre_id) VALUES(%s, %s)'''
        cur.execute(sql, (movie_id, genre_id))

    conn.commit()
    conn.close()        




    

