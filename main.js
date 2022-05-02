const slides = [
  'title',
  'agenda',
  'why-care',
  'why-care-unix',
  'why-care-tools',
  'why-care-history',
  'why-care-paradigm',
  'why-care-kbd',
  'unix-intro',
  'unix-oses',
  'editor-intro',
]
const filename = window.location.pathname.split('/').pop().split('.')[0]
const fileNumber = slides.findIndex(s => s === filename)

const header = document.getElementById('header') || ({})
const video = document.getElementById('video') || ({})

const loadFile = n => {
  if (n >= 0 && n < slides.length) {
    window.open(`${slides[n]}.html`, '_self')
  }
}

(() => {
  document.title = filename
  header.innerText = `${String(header.innerText)} (${fileNumber}/${slides.length - 1})`
  video.muted = video.loop = true

  const mediaElementKeydownHandler = code => {
    if (!(video instanceof HTMLMediaElement)) return

    switch (code) {
     case 'KeyX': // Toggle playback
          if (video.paused) {
            video.play()
          } else {
            video.pause()
          }
        break
      case 'KeyZ': // Rewind
          video.currentTime = 0
        break
      case 'KeyF': // Fullscreen
          video.requestFullscreen()
        break
    }
  }

  addEventListener('keydown', event => {
    switch (event.code) {
      case 'Space': // Fall-through
      case 'ArrowRight':
        loadFile(fileNumber + 1)
        break
      case 'ArrowLeft':
        loadFile(fileNumber - 1)
        break
      case 'KeyX': // Fall-through
      case 'KeyZ': // Fall-through
      case 'KeyF': // Handle media bindings
        mediaElementKeydownHandler(event.code)
        break
    }
  })
})()
