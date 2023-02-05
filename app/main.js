const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater")
const log = require("electron-log")
let win = null;

//Logging for Auto Updates
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

function showMessage(){
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'CloudBridge',
        message:
          'Update Downloaded, Quit app to Install',
      },response=>{
        if(response == 0){
            autoUpdater.quitAndInstall();
        }
      });
}

//Check for updates
autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    log.info('Update available.');
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'CloudBridge',
        message:
          'Qyrus CloudBridge App Update Available!',
      })
})
autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.');
})
autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater. ' + err);
})
autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded '+info);
    showMessage();
});

function createWindow() {
    //Launch the Desktop App with dimensions
    win = new BrowserWindow({
        width: 1000,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: true,
            webSecurity: false,
            preload: path.join(__dirname, "preload.js"),
        },
    })
}


function firstPage() {
    win.loadURL('file://' + path.join(__dirname, 'index.html'));
}

//Call the dashboard event
ipcMain.on('call-dashboard', () => {
    console.log("callDashboard-main.js")
    win.loadURL('file://' + path.join(__dirname, 'cards', 'layout.html'));
})

ipcMain.on("user:logout", (e, data) => {
    firstPage();
})

app.whenReady().then(() => {
    createWindow();
    firstPage();
    console.log("App launched")
})

app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})

app.on('closed', () => {
    app.quit();
    console.log("done");
});