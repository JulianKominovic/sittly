// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  globalShortcut,
  Tray,
  Menu,
} from "electron";
import { release } from "os";
import { join } from "path";
import path from "path";
import { exec } from "child_process";

const SHOW_APP_SHORCUT = "Ctrl+Alt+K";
const EMOJI_SHORCUT = "Super+Ctrl+.";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let isQuitting;
let tray;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    icon: join(process.env.PUBLIC as string, "favicon.svg"),
    // BEGIN - ACTIVATE ON PROD
    alwaysOnTop: false,
    vibrancy: "dark",

    //END - ACTIVATE ON PROD
    transparent: true,
    frame: false,
    maxHeight: 400,
    height: 400,
    resizable: false,
    center: true,
    roundedCorners: true,
    hasShadow: true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.on("close", function (event) {
    if (!isQuitting) {
      event.preventDefault();
      win?.hide();
      event.returnValue = false;
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url as string);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);
app.whenReady().then(() => {
  const toRegister = [
    {
      keys: EMOJI_SHORCUT,
      callback: () => {
        win?.webContents.send("location-change", "/Emojis");
        win?.show();
        win?.focus();
      },
    },
    {
      keys: SHOW_APP_SHORCUT,
      callback: () => {
        win?.show();
        win?.focus();
      },
    },
  ];

  toRegister.forEach(({ callback, keys }) => {
    let registered = globalShortcut.register(keys, callback);
    if (!registered) {
      console.log("Registration failed.");
    }
    console.log(globalShortcut.isRegistered(SHOW_APP_SHORCUT));
  });
});

app.on("before-quit", function () {
  isQuitting = true;
});

app.on("ready", () => {
  tray = new Tray(path.join(__dirname, "../../../public/electron.png"));

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show App",
        click: function () {
          win?.show();
        },
      },
      {
        label: "Quit",
        click: function () {
          isQuitting = true;
          app.quit();
        },
      },
    ])
  );
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregister(SHOW_APP_SHORCUT);

  globalShortcut.unregisterAll();
});

ipcMain.on("hide-window", (evt, arg) => {
  win?.hide();
});
ipcMain.on("close-app", (evt, arg) => {
  app.exit(0);
});
ipcMain.on("run-command", (evt, arg) => {
  exec(`gnome-terminal --command="bash -c '${arg}; $SHELL'"`);
});
ipcMain.on("run-command-exec", (evt, arg) => {
  exec(`${arg}`);
});
