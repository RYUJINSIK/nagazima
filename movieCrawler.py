from selenium import webdriver
import pandas as pd
import time
import urllib.request
import datetime

def doScrollDown(whileSeconds):
    start = datetime.datetime.now()
    end = start + datetime.timedelta(seconds=whileSeconds)
    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(1)
        if datetime.datetime.now() > end:
            break

columns = ["title", "type", "open_year", "rate", "running_time", "genre1", "genre2", "genre3", "actor", "director", "summary"]

# options = webdriver.ChromeOptions()
# options.add_argument('headless')

driver = webdriver.Chrome("./chromedriver")


movie_datas = []


# url = "https://www.justwatch.com/kr/%EB%8F%99%EC%98%81%EC%83%81%EC%84%9C%EB%B9%84%EC%8A%A4/netflix?content_type=movie"      # 영화
# stream_type = "Movie"

url = "https://www.justwatch.com/kr/%EB%8F%99%EC%98%81%EC%83%81%EC%84%9C%EB%B9%84%EC%8A%A4/netflix?content_type=show"     # TV
stream_type = "TV Show"

driver.get(url)

num = driver.find_element_by_css_selector(".total-titles").text
num = int(num.split(' ')[0].replace(",", ""))

doScrollDown(60)

for i in range(num):
    try:
        imgUrl = driver.find_elements_by_css_selector(".picture-comp__img")[i].get_attribute("src")
        
        element = driver.find_elements_by_css_selector(".title-poster")[i]
        driver.execute_script("arguments[0].click();", element)
        
        time.sleep(2)
        
        movie_data = []
        actors = []
        
        title = driver.find_element_by_xpath('//*[@id="base"]/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/h1').text
        
        open_year = driver.find_element_by_css_selector(".text-muted").text
        open_year = open_year.strip().replace("(","").replace(")","")
        
        rate = driver.find_element_by_css_selector(".jw-scoring-listing__rating").text
        rate = int(rate.replace("%","")) / 10
        
        running_time = driver.find_elements_by_css_selector(".detail-infos__value")[2].text
        
        genre = driver.find_elements_by_css_selector(".detail-infos__value")[1].text
        genres = genre.replace(" ","").split(",")
        genre1, genre2, genre3 = "", "", ""
        
        try:
            genre1 = genres[0]
            genre2 = genres[1]
            genre3 = genres[2]
        except:
            pass

        for j in range(2, 8):
            actor = driver.find_elements_by_css_selector(".title-credit-name")[j].text
            actors.append(actor)
        actors = ', '.join(actors)
        
        director = driver.find_elements_by_css_selector(".title-credit-name")[0].text
        try:
            summary = driver.find_element_by_xpath('//*[@id="base"]/div[2]/div/div[2]/div[2]/div[6]/div[1]/div[4]/p/span').text
        except:
            summary = driver.find_element_by_xpath('//*[@id="base"]/div[2]/div/div[2]/div[2]/div[5]/div[1]/div[4]/p/span').text
        
        movie_data.append(title)
        movie_data.append(stream_type)
        movie_data.append(open_year)
        movie_data.append(rate)
        movie_data.append(running_time)
        movie_data.append(genre1)
        movie_data.append(genre2)
        movie_data.append(genre3)
        movie_data.append(actors)
        movie_data.append(director)
        movie_data.append(summary)
        
        movie_datas.append(movie_data)
        
        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(imgUrl, "./posters/" + title + ".jpg")
        
        df = pd.DataFrame(movie_datas, columns=columns)
        df.to_csv('tv_data.csv', encoding='utf-8')
        
        driver.back()
    
    except:
        driver.back()
        
driver.close()


