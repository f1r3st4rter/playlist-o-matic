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
    console.log("DELETEME: COCO");
    waitForElm('.vjs-icon-placeholder').then(async () => { 
        console.log("DELETEME: COCO 2 ");
        (document.getElementsByClassName('vjs-icon-placeholder')[0] as HTMLElement ).click(); 
        const videoEl = document.getElementById('embed_video_player_html5_api');
        videoEl.addEventListener('ended',async () => {
            console.log('DELETEME: VIDEO PLAYBACK ENDED');
            const responseText = await ipcRenderer.invoke("video_event", {event: 'ended'});
        }, false);
        // videoEl.requestFullscreen();
    });
    console.log('DELETEME: PQP');
})