import pprint
import qbittorrentapi
import sqlite3
# from tinydb import TinyDB, Query, where
def update(data) -> None:
    con = sqlite3.connect('E:\MEGA\\torrent.db')
    cur = con.cursor()

    res = cur.execute(f"SELECT progress FROM torrents WHERE name=:name", {"name": data['name']})
    progress = res.fetchone()
    if progress is None or float(progress[0]) != float(data['progress']):
        pprint.pprint(f"Updating {data['name']}")
        cur.execute(f"""
            INSERT INTO torrents VALUES (
                "{data['content_path']}",    
                "{data['magnet_uri']}",    
                "{data['name']}",    
                "{data['save_path']}",    
                "{data['progress']}"    
            )
        """)
    con.commit()
    con.close()


def load_from_qbittorrent():
    # db = TinyDB('./db.json')
    # videos = db.table('videos')
    qbt_client = qbittorrentapi.Client(host='localhost', port=8080)# ,
#            username='admin', password='B00nd@666')



    # The client will automatically acquire/maintain a logged in state in line with any request.
    # Therefore, this is not necessary; however, you many want to test the provided login credentials.
    qbt_client.auth_log_in()



    # Store all torrents in a local var
    all_torrents = qbt_client.torrents_info()
    for torrent in all_torrents:
        torrent_data = {
            'content_path': torrent.content_path,
            'magnet_uri': torrent.magnet_uri,
            'name': torrent.name,
            'save_path': torrent.save_path,
            'completion_on': torrent.completion_on,
            'progress': torrent.progress,
        }
        update(torrent_data)
        # if not torrent.save_path.startswith('E:\\'):
        #     # pprint.pprint(torrent.name + ' - ' + str(torrent.progress))
        #     pprint.pprint(torrent_data)

if __name__ == '__main__':
    load_from_qbittorrent()