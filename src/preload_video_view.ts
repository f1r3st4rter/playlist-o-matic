import { ipcRenderer } from "electron";

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
const waitForElm = (selector: string)  => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    console.log('DELETEME: LOCATION ', window.location.href);
    const url = window.location.href;
    if (url.includes('xvideos.com')) {
        waitForElm('.play').then(async () => { 
            (document.getElementsByClassName('play')[0] as HTMLElement).click() 
            document.getElementsByTagName('video')[0].addEventListener('ended', async () => {
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            });
        });

    } else if (url.includes('spankbang.com')) {
        waitForElm('.vjs-icon-placeholder').then(async () => { 
            (document.getElementsByClassName('vjs-icon-placeholder')[0] as HTMLElement ).click(); 
            const videoEl = document.getElementById('embed_video_player_html5_api');
            videoEl.addEventListener('ended',async () => {
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            }, false);
            // videoEl.requestFullscreen();
        });

    } else if (url.includes('pornhub.com')) {
        // document.getElementsByTagName('video')[4].requestFullscreen()

        // window.loadThePlayer()
        // window.setTimeout(async() => {
            waitForElm('.mgp_videoWrapper video').then(async () => { 
                // (document.getElementsByClassName('mgp_eventCatcher')[0] as HTMLElement ).click()
                const videoEl = document.querySelector('.mgp_videoWrapper video')
                console.log('DELETEME : Got video ??? ', videoEl);
                // const x = await videoEl.requestFullscreen()
                videoEl.addEventListener('ended', async () => {
                    const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
                });
            });
        // }, 5000);
    } else if (url.includes('xhamster.com')) {
        (document.getElementsByClassName('xplayer-start-button')[0] as HTMLElement).click()

        waitForElm('#xplayer__video').then(async () => { 
            document.getElementById('xplayer__video').addEventListener('ended', async () => {
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            });

        });

    } else if (url.includes('eporner.com')) {
        waitForElm('.vjs-icon-placeholder').then(async () => { 
            (document.getElementsByClassName('vjs-icon-placeholder')[0] as HTMLElement ).click(); 
            const videoEl = document.getElementById('EPvideo_html5_api');
            videoEl.addEventListener('ended',async () => {
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            }, false);
            // videoEl.requestFullscreen();
        });

    } else if (url.includes('tnaflix.com')) {
        waitForElm('.vidPlay').then(async () => { 
            (document.getElementsByClassName('vidPlay')[0] as HTMLElement ).click(); 
            const videoEl = document.getElementById('flixPlayerVideo');
            videoEl.addEventListener('ended',async () => {
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            }, false);
            // videoEl.requestFullscreen();
        });
    } else if (url.includes('hitbdsm.com')) {
        waitForElm('#video_fluid_initial_play_button').then(async () => { 
            document.getElementById('video_fluid_initial_play_button').click()
            const videoEl = document.getElementsByTagName('video')[0];
            console.log('DELETEME: HTD');
            videoEl.addEventListener('ended',async () => {
                console.log('DELETEME: HTD ended');
                const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
            }, false);
        });
    }
    

})