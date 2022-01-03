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

with open('data/movies.csv', 'r', encoding='utf-8-sig') as data:

    rd = csv.reader(data)
    next(rd) #첫행 넘기기
    i = 0
    
    for line in rd:
        # print(line)
        # print(line[0])
        
        id = line[0]
        title = line[1]
        type = line[2]
        open_year = line[3]
        rate = line[4]
        running_time = line[5]
        genre1 = line[6]
        genre2 = line[7]
        genre3 = line[8]
        summary = line[11]

        sql = '''INSERT INTO movies(id,title, type, open_year, rate, running_time, genre1, genre2, genre3, summary) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
        cur.execute(sql, (id,title, type, open_year, rate, running_time, genre1, genre2, genre3, summary))

    conn.commit()
    conn.close()        




    

