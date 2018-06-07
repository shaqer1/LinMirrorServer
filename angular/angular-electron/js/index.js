'use strict';

const electron = require('electron');


const {ipcMain, app} = electron;
const TrayWindow  = require('../windows/TrayWindow');
const TrayIcon = require('./TrayIcon');

var mainWindow = null;

let tray = null;
let trayIcon = null;
//app.dock.hide();

function createWindow () {
    /* mainWindow = new BrowserWindow({
        frame: false,
        height: 600,
        width: 800
    });
    console.log('file://' + __dirname + '/index.html');
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', () => {
        mainWindow = null
    }); */
    tray = new TrayWindow();
    trayIcon = new TrayIcon(tray.window);
}
app.on('ready', createWindow);
/* app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
}); */

/* app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (win === null) {
    createWindow()
}
}) */

ipcMain.on('quit-app', function() {
    tray.window.close(); // Standart Event of the BrowserWindow object.
    app.quit(); // Standart event of the app - that will close our app.
});
ipcMain.on('update-title-tray-window-event', function(event, title) {
    
    trayIcon.updateTitle(title);
});


//Firebase start
const admin = require('firebase');
/*var currentUser;

admin.initializeApp({
    apiKey: "AIzaSyBH_bhUqNwxTsWHu202ecy7zkPD5SFVmtE",
    authDomain: "linmirror-bd427.firebaseapp.com",
    databaseURL: "https://linmirror-bd427.firebaseio.com",
    projectId: "linmirror-bd427",
    storageBucket: "linmirror-bd427.appspot.com",
    messagingSenderId: "554603673774"
});
const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

admin.auth().signInWithEmailAndPassword('shafayhaq123@hotmail.com', 'Shahmir1234')
.catch(function(err) {
    console.log(err, 'auth error');
});

currentUser = admin.auth().currentUser;

 admin.auth().onAuthStateChanged(function(user) {
  currentUser = user; 
  if(currentUser != null){
    console.log('user authenticated');
    var ref = admin.database().ref('/' + 
        user.uid + '/userNotifications/notifications');
    var now = Date.now();
    var cutoff = now - 2 * 60 * 60 * 1000;
    var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
    var listener = old.on('child_added', function(snapshot) {
        snapshot.ref.remove();
    });
    var query = db.collection('/' + 
        user.uid + '/userNotifications/notifications').where('timestamp', '>=', new Date(new Date().getTime()-10000))
                  .orderBy('timestamp', 'desc');

    var title = 'null';
    var observer = query.onSnapshot(function(querySnapshot) {
      var doc = querySnapshot.docs[0];
        if(doc != null){
          /* console.log(doc.data().packageName + ':\\ ' + doc.data().title + ' ' + doc.data().tickerText + ':\\ ' + doc.data().text);
          exec('notify-send '
          + doc.data().packageName + ':\\ ' + doc.data().title + ' ' + doc.data().tickerText + ':\\ ' + doc.data().text
          , function(err, stdout, stderr){
            console.log(stdout);
          }); *//*
        }

    }, err => {
      console.log(err);
    });
  }
 }); */
//Firebase end