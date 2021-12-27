import requests
from selenium import webdriver
import pandas as pd
import time
import urllib.request


df = pd.read_csv('netflix_titles.csv')

# is_korean = df['country'] == "South Korea"
korean_titles = df['title']

driver = webdriver.Chrome("./chromedriver")

for keyword in korean_titles:
    
    try:
        url = "https://flixpatrol.com/search/" + keyword + "/"
        # url = url.lower()
        # url = url.replace(" - ", "-").replace(": ", '-').replace(" & ", "-").replace(" ", '-')
        
        driver.get(url)
        driver.find_elements_by_css_selector(".flex.group")[0].click()
        time.sleep(1)
        
        imgUrl = driver.find_element_by_css_selector(".absolute.w-full.h-full.object-cover").get_attribute("src")
        if imgUrl == "https://flixpatrol.com/static/img/bg-img-opt.png":
            raise
        
        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(imgUrl, "./posters/" + keyword + ".jpg")
        
    except:
        url = "https://www.google.com/search?q=" + keyword + " poster" + "&newwindow=1&rlz=1C1CAFC_enKR908KR909&sxsrf=ALeKk01k_BlEDFe_0Pv51JmAEBgk0mT4SA:1600412339309&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj07OnHkPLrAhUiyosBHZvSBIUQ_AUoAXoECA4QAw&biw=1536&bih=754"
        
        driver.get(url)
        driver.find_elements_by_css_selector(".rg_i.Q4LuWd")[0].click()
        time.sleep(1)
        
        imgUrl = driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")
        
        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(imgUrl, "./posters/" + keyword + ".jpg")

driver.close()
