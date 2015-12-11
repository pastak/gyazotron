'use strict'

const desktopCapturer = require('electron').desktopCapturer

const video = document.querySelector('#video')

function uploadGyazo (dataUrl) {
  // TODO
}

function getImage (callback) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  callback(canvas.toDataURL())
}
function GyazoDesktop () {
  desktopCapturer.getSources({types: ['screen']}, function(error, sources) {
    if (error) throw error
    for (var i = 0; i < sources.length; ++i) {
      if (sources[i].name == "Entire screen") {
        navigator.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }, gotStream, getUserMediaError)
        return
      }
    }
  })
}
function gotStream(stream) {
  video.onloadeddata = function() {
    getImage(function (url) {
      const img = document.createElement('img')
      img.src = url
      img.id = 'preview'
      document.body.appendChild(img)
      uploadGyazo(url)
      window.setTimeout(function(){img.remove()}, 5000)
    })
  }
  video.src = URL.createObjectURL(stream)
}

function getUserMediaError(e) {
  console.log('getUserMediaError')
}

module.exports = GyazoDesktop
