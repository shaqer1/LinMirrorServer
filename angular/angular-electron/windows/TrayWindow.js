const path = require('path');
const { BrowserWindow } = require('electron');
let fromExit = false;



class TrayWindow {
  constructor() {
    //this.fromExit = false;
    // Link to the HTML file that will render app window.
    let htmlPath = 'file://' + path.join(__dirname, '..') + '/dist/index.html'

    // Creation of the new window.
    this.window = new BrowserWindow({
      show: true, // Initially, we should hide it, in such way we will remove blink-effect. 
      height: 500,
      width: 500,
      skipTaskbar: true,
      frame: false,  // This option will remove frame buttons. By default window has standart chrome header buttons (close, hide, minimize). We should change this option because we want to display our window like Tray Window not like common chrome-like window.
      backgroundColor: '#ffffff',
      icon: `file://${__dirname}/../dist/assets/logo.png`,
      resizable: true
    });

    this.window.loadURL(htmlPath);

    // Object BrowserWindow has a lot of standart events/
    // We will hide Tray Window on blur. To emulate standart behavior of the tray-like apps.
    this.window.on('blur', () => {
      this.window.hide();
    });
    /* this.window.on('appQuit', () => {
      fromExit = true;
      this.window.close();
    })
    this.window.on('close', (event) => {
      console.log(fromExit);
      if(!fromExit){
        event.preventDefault();
        this.window.minimize();
      }else{
        this.window.close();
        fromExit = false;
      }
    }) */

    /* this.window.on('closed', () => {
      this.window.hide();
    }); */
  }
}

module.exports = TrayWindow;