import scrapy
import logging
import pprint


class PlaylistsSpider(scrapy.Spider):
    name = 'playlists'
    allowed_domains = ['spankbang.com']
    start_urls = ['https://spankbang.com/620q7/playlist/pmv+edm/']

    def parse(self, response):
        """
        item = response.css('div.results  div.video-item')
        item.css('a.thumb').get()
        title = item.css('a.n::text').get()

        url item.css('a.n::attr(href)').get()
        """
        for video in response.css('div.results div.video-item'):
            pprint.pprint(video.css('a.n::text').get())
            pprint.pprint(video.css('a.n::attr(href)').get())
            if title := video.css('a.n::text').get():
                yield {
                    'title': title,
                    'url': f"https://spankbang.com/{video.css('a.n::attr(href)').get().split('/')[1].split('-')[1]}/video/",
                }
            else:
                pprint.pprint(video.get())