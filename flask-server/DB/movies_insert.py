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

with open('data/contents.csv', 'r', encoding='utf-8-sig') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    
    for line in rd:
        
        id = line[0]
        title = line[1]
        type = line[2]
        open_year = line[3]
        rate = line[4]
        running_time = line[5]
        genre_1 = line[6]
        genre_2 = line[7]
        genre_3 = line[8]
        summary = line[11]

        sql = '''INSERT INTO movies(id,title, type, open_year, rate, running_time, genre_1, genre_2, genre_3, summary) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
        cur.execute(sql, (id,title, type, open_year, rate, running_time, genre_1, genre_2, genre_3, summary))

    conn.commit()
    conn.close()        




    

