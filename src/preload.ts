import { ipcRenderer, contextBridge } from 'electron';

export type ContextBridgeApi = {
    bunda: () => string;
  start_playlist: (playlist: string[]) => Promise<any>;
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const exposedApi: ContextBridgeApi = {
    bunda: () => {
        return "suja";
    },
    start_playlist: async (playlist: string[]) => {
        console.log("DELTEME: START PLAYLIST API");
        const shoot = await ipcRenderer.invoke("start_playlist", {playlist});
        console.log(shoot);
        return shoot;
    }
}
contextBridge.exposeInMainWorld(
    "api", exposedApi,
);