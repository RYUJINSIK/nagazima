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

with open('data/contents.csv', 'r', encoding='utf-8-sig') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    
    for line in rd:
        
        
        id = line[1]
        title = line[2]
        type = line[3]
        open_year = line[4]
        rate = line[5]
        running_time = line[6]
        genre_1 = line[7]
        genre_2 = line[8]
        genre_3 = line[9]
        summary = line[12]

        sql = '''INSERT INTO movies(id,title, type, open_year, rate, running_time, genre_1, genre_2, genre_3, summary) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
        cur.execute(sql, (id,title, type, open_year, rate, running_time, genre_1, genre_2, genre_3, summary))

    conn.commit()
    conn.close()        




    

