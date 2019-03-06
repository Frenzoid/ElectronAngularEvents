import { MenuItemConstructorOptions, ipcMain, remote, ipcRenderer } from "electron";

export const menuDefault: MenuItemConstructorOptions[] = [
  {
    label: "File",
    type: "submenu",
    submenu: [
      {
        label: "Load events",
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send("loadEvents");
        }
      },
      { type: "separator" },
      {
        label: "Create backup",
        click: (menuItem, browserWindow, event) => {
          ipcMain.emit("openFolderDialog", ["createBackUp"]);
        }
      },
      {
        label: "Load backup",
        click: (menuItem, browserWindow, event) => {
          ipcMain.emit("openFileDialog",
            [{ name: "Event Backup File (.bkp)", extensions: ["bkp"] }, "loadBackUp"]);
        }
      },
      { type: "separator" },
      { role: "quit" }
    ]
  }
];

export const menuNoAuth: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        role: "quit"
      }
    ]
  }
];
