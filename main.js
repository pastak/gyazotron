'use strict'
const app = require('electron').app
const BrowserWindow = require('electron').BrowserWindow

require('electron').crashReporter.start()

let mainWindow = null

app.on('windowAllClosed', function () {
  app.quit()
})

app.on('ready', function () {
  const Screen = require('screen')

  const size = Screen.getPrimaryDisplay().size

  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    transparent: true,
    resizable: false,
    'always-on-top': true
  })

  mainWindow.maximize()

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
