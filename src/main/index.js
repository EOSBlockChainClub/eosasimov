import { app, BrowserWindow } from 'electron'
const ipc = require('electron').ipcMain
import PN532 from 'pn532-spi'
let bytesToHex = function(arr) {
  return arr.reduce(function(a, b) {
    let result = b.toString(16)
    if (result.length == 1) result = '0' + result
    return a + result
  }, '0x')
}

let pn532 = new PN532({
  clock:  23, // SCLK (GPIO 25)
  mosi:   19, // MOSI (GPIO 23)
  miso:   21, // MISO (GPIO 24)
  client: 24, // SSEL (GPIO 18)
})
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
var intervalo = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`



function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 480,
    useContentSize: true,
    width: 720,
    resizable: false
  })

  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null)
  mainWindow.setFullScreen(true)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('start-nfc', function (event, arg) {
  console.log('Me mandaron llamar???')
  pn532.begin()
 
  let version = pn532.getFirmwareVersion()
  console.log('PN532 Firmware version: ', version[1] + '.' + version[2])

  // Configure PN532 for Mifare cards
  pn532.samConfiguration()

  // Poll until we get a response and print the UID
  intervalo = setInterval(function(){
    console.log('Waiting for scan...')
    let uid = pn532.readPassiveTarget()
    if (uid != null)
      console.log('Found UID: ', bytesToHex(uid))
      ipc.send('lectura')
    }, 300);

})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
