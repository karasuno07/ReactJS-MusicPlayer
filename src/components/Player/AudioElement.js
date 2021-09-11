const AudioContext = window.AudioContext || window.webkitAudioContext
export const context = new AudioContext()
const AudioElement = new Audio()
AudioElement.crossOrigin = "anonymous"
export const analyser = context.createAnalyser()
export const source = context.createMediaElementSource(AudioElement)
source.connect(analyser)
analyser.connect(context.destination)
analyser.fftSize = 2048

export default AudioElement
