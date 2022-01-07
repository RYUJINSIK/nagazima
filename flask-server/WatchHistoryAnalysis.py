import numpy as np 
import pandas as pd 
from datetime import datetime
from dateutil.relativedelta import relativedelta
from collections import Counter
# from googletrans import Translator

def trans_df(input_data):
    csv_name = list(input_data.keys())[0]
    return pd.DataFrame(input_data['{}'.format(csv_name)][1:], columns=input_data['{}'.format(csv_name)][0])


def prep_df(data):
    data['Date'] = pd.to_datetime(data['Date'], format='%y. %m. %d.')

    title = []
    series = []
    subtitle = []

    for i in range(data.shape[0]):
        split_list = data['Title'].iloc[i].split(':')
        if len(split_list) == 1:
            title.append(split_list[0])
            series.append(np.nan)
            subtitle.append(np.nan)
        elif len(split_list) == 2:
            title.append(split_list[0])
            series.append(split_list[1])
            subtitle.append(np.nan)
        else:
            title.append(split_list[0])
            series.append(split_list[1])
            subtitle.append(split_list[2])

    data['Title'] = title
    data['SubTitle'] = subtitle
    data['Series'] = series

    return data

# 날짜 별 시청 내역
def count_by_date(data):
    # 최근 1년 간 ? 월 별? 일일?
    today = datetime.today().date()
    before_one_year = pd.to_datetime(today - relativedelta(years=1))

    recent_year_data = data[data['Date']<= before_one_year]
    recent_year_grp = recent_year_data.groupby(['Date'])['Title'].count()

    date_list = []
    for d in list(recent_year_grp.index):
        date_list.append(d.strftime('%Y-%m-%d'))

    return date_list, list(map(int, recent_year_grp.values))


def count_by_genre(merge_df):
    grp = merge_df.groupby('genre1').size()

    return list(grp.index), list(map(int, grp.values))

def count_by_actor(merge_df):
    actor_list = []
    for i in range(merge_df.shape[0]):
        try:
            actor_list += merge_df.actor[i].split(', ')
        except:
            continue
    
    top10_actor = Counter(actor_list).most_common(10)

    return top10_actor

def count_by_type(merge_df):
    grp = merge_df.groupby('type').size()
    movie_rate = round(grp[0]/(grp[0]+grp[1]), 2) * 100
    TV_Show_rate = round(grp[1]/(grp[0]+grp[1]), 2) * 100
    return [int(movie_rate), int(TV_Show_rate)]

# if __name__ == "__main__":
#     data = pd.read_csv("raw_data/NetflixViewingHistory.csv")

#     try:
#         # data = trans_df(data))
#         prep_data = prep_df(data)
#         contents = pd.read_csv("data/content_no_Korean.csv")
#         merge_df = pd.merge(contents, prep_data, left_on='title', right_on='Title', how='inner')

#         # 최근 1년 간 일일 시청 횟수
#         date, viewing_cnt = count_by_date(prep_data)
#         print(date, viewing_cnt)

#         # 장르별 시청 횟수
#         genre, genre_cnt = count_by_genre(merge_df)
#         print(genre, genre_cnt)
#         # 시청 배우 top 10
#         actor_cnt = count_by_actor(merge_df)
#         print(actor_cnt)

#         # Movie vs Tv 비중
#         movie_rate, TV_Show_rate = count_by_type(data)
#         print(movie_rate, TV_Show_rate)
#     except:
#         print("에러 메세지입니다. 넷플릭스 시청기록을 넣어주세요.")
    