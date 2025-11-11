import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Future IPC methods will be added here
  // Example:
  // openFile: () => ipcRenderer.invoke('dialog:openFile'),
});

export {};
