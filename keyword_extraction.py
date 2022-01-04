import re
from konlpy.tag import Mecab
from hanspell import spell_checker
import warnings
warnings.filterwarnings(action='ignore')

class Preprocessing:
    def __init__(self, corpus) -> None:
        self.corpus = corpus

    def extract_kor(self, doc):
        pattern = re.compile('[^ㄱ-ㅣ가-힣]') # 한글만 추출
        kor_doc = pattern.sub('', doc)
        result = spell_checker.check(kor_doc).checked
        return result


    def tokenizing(self, doc):
        stop_words = ['액션', '코미디', '다큐멘터리', '판타지', '공포', '음악', '로맨스', '스포츠', '서부', 'Made in Europe', '애니메이션', '범죄', '드라마', '역사', '가족', '스릴러', 'SF', '전쟁', 'Reality TV']
        stop_words.append('영화')
    
        FEATURE_POS = ['VA+ETM', 'VV+EF']

        tokenizer = Mecab()
        text_pos = [pair for pair in tokenizer.pos(doc) if pair[0] not in stop_words and len(pair[0]) > 1]
        words = []
        print(text_pos)
        
        for word, pos in text_pos:
            if pos in FEATURE_POS:
                words.append(word)

        return words
    
    def run(self):
        kor_corpus = self.extract_kor(self.corpus)
        kor_tokens = self.tokenizing(kor_corpus)
        return kor_tokens


if __name__ == "__main__":
    sample_sent = "영화가 웃겨요 ㅋㅋㅋㅋ"
    
    prep_obj = Preprocessing(sample_sent)
    result = prep_obj.run()
    print(result)

    