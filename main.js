const MAX_FILE_NUMBER = 999
const filename = window.location.pathname.split('/').pop()
const fileNumber = Number(filename.slice(0, 2))
const header = document.getElementById('header') || ({})
const video = document.getElementById('video') || ({})

const loadFile = n => {
  if (n >= 0 && n <= MAX_FILE_NUMBER) {
    const newFilename = String(n).padStart(2, '0') + filename.slice(2)
    window.open(newFilename, '_self')
  }
}

const generateHeader = () => {
  return `${String(header.innerText)} (${fileNumber}/${MAX_FILE_NUMBER})`
}

(() => {
  document.title = filename
  header.innerText = generateHeader()
  video.muted = video.loop = true
})()

addEventListener('keydown', event => {
  switch (event.code) {
    case 'Space': // Fall-through
    case 'ArrowRight':
      loadFile(fileNumber + 1)
      break
    case 'ArrowLeft':
      loadFile(fileNumber - 1)
      break
    case 'KeyX': // Toggle playback
      if (video instanceof HTMLMediaElement) {
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      }
      break
    case 'KeyZ': // Rewind
      if (video instanceof HTMLMediaElement) {
        video.currentTime = 0
      }
      break
    case 'KeyF': // Fullscreen
      if (video instanceof HTMLMediaElement) {
        video.requestFullscreen()
      }
      break
  }
})