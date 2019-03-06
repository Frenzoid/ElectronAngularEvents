
import * as url from 'url';
import * as path from 'path';
import { BrowserWindow, app, ipcMain, MenuItemConstructorOptions, Menu, OpenDialogOptions, dialog, MenuItem } from 'electron';
import {menuNoAuth, menuDefault } from './menu';
let win: BrowserWindow = null;
let menu: Menu = null;

app.on('ready', () => {
  win = new BrowserWindow();
  win.setContentSize(800, 600);
  win.loadURL(
    url.format({
      pathname: path.join(app.getAppPath(), 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();
  // Opens the chromium console.

  menu = Menu.buildFromTemplate(menuNoAuth);
  win.setMenu(menu);

  win.on('closed', () => {
    // When the app is closed set win to null.
    win = null;
  });

});


ipcMain.on('openFolderDialog', (args) => {
  openDialog(['openDirectory'], null, args[0]);
});

ipcMain.on('openFileDialog', (args) => {
  openDialog(['openFile'], args[0], args[1]);
});

const openDialog = (type: OpenDialogOptions["properties"],
  filters: OpenDialogOptions["filters"],
  eventCallback: string) => {

  const options: OpenDialogOptions = {
    title: 'Select a file',
    defaultPath: app.getAppPath(),
    properties: type
  };

  if (filters != null) {
    options.filters = filters;
  }

  dialog.showOpenDialog(win, options, files => {
    if (files.length !== 0) {
      win.webContents.send(eventCallback, files);
    }
  });
};

ipcMain.on("setLoginMenu", (event) => {
  win.setMenu(null);
  win.setMenu(Menu.buildFromTemplate(menuDefault));
});

ipcMain.on("setNormalMenu", (event) => {
  win.setMenu(null);
  win.setMenu(Menu.buildFromTemplate(menuDefault));
});
