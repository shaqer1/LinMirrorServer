//const { app, BrowserWindow } = require('electron')

const electron = require('electron');
const {ipcMain, app} = electron;
const TrayWindow  = require('./windows/TrayWindow');
const TrayIcon = require('./js/TrayIcon');
let win;

function createWindow () {
  // Create the browser window.
  tray = new TrayWindow();
  trayIcon = new TrayIcon(tray.window);
 /*  win = new BrowserWindow({
    width: 600, 
    height: 600,
    frame: 'false',
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`) */

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  /* win.on('closed', function () {
    win = null
  }) */
}

// Create window on electron intialization
app.on('ready', createWindow)

ipcMain.on('quit-app', function() {
  tray.window.close(); // Standart Event of the BrowserWindow object.
  app.quit(); // Standart event of the app - that will close our app.
});
ipcMain.on('update-title-tray-window-event', function(event, title) {
  
  trayIcon.updateTitle(title);
});


/* // Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) */

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})