const path = require('path');
const { BrowserWindow, Tray, Menu, app } = require('electron');
// Electron-positioner - npm package for positioning of the Tray Window. Our Tray Window should appear under the Tray icon.

const Positioner = require('electron-positioner');

class TrayIcon {
  constructor(trayWindow/* , toolTip, func */) {
    // Path to the app icon that will be displayed in the Tray (icon size: 22px)
    let iconPath = path.join(__dirname, '../dist/assets/logo.png')

    this.trayIcon = new Tray(iconPath);
    //this.trayIcon.setToolTip(toolTip); // This tooltip will show up, when user hovers over our tray-icon.
    this.trayIcon.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Notifications', 
        type: 'normal', 
        click: () =>{
          if ( trayWindow.isVisible() ) {
            trayWindow.hide();
          } else {
            /* let positioner = new Positioner(trayWindow);
            positioner.move('trayCenter', bounds); */
            trayWindow.show();
          }
        }
      },
      {
        label: 'exit', 
        type: 'normal',
        click: () => {
          //trayWindow.fromExit = true;
          trayWindow.close();
          //app.on('before-quit', () => willQuitApp = true);
          app.quit();
        }
      }
    ]))

    // By clicking on the icon we have to show TrayWindow and position it in the middle under the tray icon (initialy this window is hidden).

    //this.trayIcon.on('click', func);
  }

  updateTitle(title) {
    console.log(title);
    this.trayIcon.setTitle(title);
  }
}



module.exports = TrayIcon;