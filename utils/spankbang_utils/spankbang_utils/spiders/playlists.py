import scrapy
import logging
import pprint


class PlaylistsSpider(scrapy.Spider):
    name = 'playlists'
    allowed_domains = ['spankbang.com']
    # start_urls = ['https://spankbang.com/620q7/playlist/pmv+edm/']
    start_urls = ['https://spankbang.com/620q7-fldy9z/playlist/pmv+edm']

    def parse(self, response):
        """
        response.css('div.video-item-active a::attr(href)').get()
        response.css('div.video-item-active div.inf::text').get()
        response.css('div#playlist_holder div.video-item a::attr(href)').getall()[1]
        """

        playlist_id, video_id = response.css('div.video-item-active a::attr(href)').get().split('/')[1].split('-')
        yield {
            'video_title': response.css('div.video-item-active div.inf::text').get().strip(),
            'video_url': f"https://spankbang.com/{video_id}/video/",
            'video_id': video_id,
            'playlist_title': response.css('h3.playlist_video_header a::text').get(),
            'playlist_url': "https://spankbang.com"+response.css('h3.playlist_video_header a::attr(href)').get(),
            'playlist_id': playlist_id,
            'uploader_name': response.css('li.us a::text').get(),
            'uploader_url': response.css('li.us a::attr(href)').get(),
            'categories': response.css('div.cat span.t:contains("Category") ~ div.ent a::text').getall(),
            'pornstar': response.css('div.cat span.t:contains("Pornstar") ~ div.ent a::text').getall(),
            'tags': response.css('div.cat span.t:contains("Tags") ~ div.ent a::text').getall(),
        }
        next_page = response.css('div.video-item-active + div.video-item a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)

    # def parse(self, response):
    #     """
    #     item = response.css('div.results  div.video-item')
    #     item.css('a.thumb').get()
    #     title = item.css('a.n::text').get()

    #     url item.css('a.n::attr(href)').get()
    #     """
    #     for video in response.css('div.results div.video-item'):
    #         pprint.pprint(video.css('a.n::text').get())
    #         pprint.pprint(video.css('a.n::attr(href)').get())
    #         if title := video.css('a.n::text').get():
    #             yield {
    #                 'title': title,
    #                 'url': f"https://spankbang.com/{video.css('a.n::attr(href)').get().split('/')[1].split('-')[1]}/video/",
    #             }
    #         else:
    #             pprint.pprint(video.get())