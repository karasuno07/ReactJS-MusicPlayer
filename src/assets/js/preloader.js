window.addEventListener('load', function () {
    'use strict'

    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    /* Preloader */
    const greetings = {
        morning: 'assets/sound/ohayo.mp3',
        afternoon: 'assets/sound/konnichiwa.mp3',
        evening: 'assets/sound/konbanwa.mp3',
        night: 'assets/sound/oyasumi.mp3'
    }

    const getGreetingsByRealtime = () => {
        const currentTime = new Date().getHours()
        return currentTime >= 22 || currentTime <= 6 ?
            greetings.night :
            currentTime > 6 && currentTime <= 12 ?
                greetings.morning :
                currentTime > 12 & currentTime <= 18 ?
                    greetings.afternoon : greetings.evening
    }

    const sounds = [
        'assets/sound/ayaka-preload-sound.mp3',
        'assets/sound/ayaka-preload-sound-2.mp3',
        getGreetingsByRealtime()
    ]

    const randomGreetingSong = () => {
        const index = Math.floor(Math.random() * sounds.length)
        return sounds[index]
    }

    const preloader = $('.preloader')
    const preloaderSound = new Audio(randomGreetingSong())
    const waves = [...$$('.preloader .wave')]
    let delays = 0

    waves.forEach(elem => {
        elem.animate([{
            transform: 'scale(0)',
            transform: 'scale(1)',
            transform: 'scale(0)',
            transform: 'scale(1)',
            transform: 'scale(0)'
        }], {
            duration: 1000,
            iterations: 3,
            delay: delays,
            direction: 'alternate',
            fill: 'both',
            easing: 'linear'
        })
        delays += 100
    })

    preloaderSound.volume = 0.25
    preloaderSound.play()
    this.setTimeout(() => preloader.classList.add('hide'), 4000)
})