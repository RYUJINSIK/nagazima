import pymysql
import csv



f = open('data/movies.csv', 'r', encoding='utf-8-sig')

rd = csv.reader(f)
next(rd) #첫행 넘기기
i = 0
for line in rd:
    print(line)
    i += 1
    if i == 3:
        break

f.close()