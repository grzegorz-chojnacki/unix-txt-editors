const slides = [
  'title',
  'agenda',
  'why-care-history',
  'why-care-history-vid',
  'why-care-paradigm',
  'why-care-kbd',
  'why-care-cli',
  'why-care-unix',
  'unix-intro',
  'unix-oses',
  'editor-intro',
  'timeline',
  'ed-intro',
  'ed-options',
  'ed-noob',
  'ed-example',
  'sed-intro',
  'sed-example',
  'ex-intro',
  'ex-example',
  'vi-intro',
  'vi-example',
  'vim-intro',
  'vim-improvements',
  'vim-example',
  'summary',
  'questions',
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

  const slideNumber = `<sub>${slides.length - 1}</sub>`
  const currentSlideNumber = `<sup>${fileNumber}</sup>`
  const counter = `<span class="off">${currentSlideNumber}/${slideNumber}</span>`
  header.innerHTML = `${String(header.innerHTML)} ${counter}`

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
      case 'Home':
        loadFile(0)
        break
      case 'End':
        loadFile(slides.length - 1)
        break
      case 'KeyX': // Fall-through
      case 'KeyZ': // Fall-through
      case 'KeyF': // Handle media bindings
        mediaElementKeydownHandler(event.code)
        break
    }
  })
})()

const colorize = () => {
  const helper = (str, c, color) => {
    return str.replace(`${c}`, `<span style="color: var(${color})">${c}</span>`)
  }

  ([...document.getElementById('timeline').children]).forEach(n => {
    let text = n.innerHTML
    text = helper(text, '*', '--red')
    text = helper(text, '|', '--orange')
    text = helper(text, '~', '--orange')
    n.innerHTML = text
  })
}

const timer = () => {
  const unixTime = document.getElementById('unixTime')
  const action = () => unixTime.innerText = Number(Math.floor(new Date() / 1000))
  action()
  setInterval(action, 1000)
}

const questions = cb => {
  const str = "Questions?"
  let i = 0
  const span = document.getElementById('questions')
  const action = () => {
    if (span.innerText !== str) {
      span.innerText = span.innerText + str[i++]
      setTimeout(action, 100 + Math.random() * 400)
    } else {
      cb()
    }
  }
  setTimeout(action, 1000)
}

const cursor = () => {
  const span = document.getElementById('cursor')
  const action = () => span.innerHTML = (span.innerText == '???') ? '&nbsp;' : '???'
  action()
  setInterval(action, 1000)
}
