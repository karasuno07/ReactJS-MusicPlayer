window.addEventListener("load", function () {
   "use strict"

   const $ = document.querySelector.bind(document)
   const $$ = document.querySelectorAll.bind(document)

   const isTouchable = () => {
      return (
         "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
      )
   }

   /* Music Player Toggle Button / Preview Current Song */
   const preview = $(".current-song")
   const previewCdThumb = $(".current-song .cd-thumbnail")
   const previewInfo = $(".current-song .info")
   const previewTooltip = tippy(previewInfo, {
      theme: "song-info",
      arrow: false,
      animation: "scale",
      delay: [500, 100],
      allowHTML: true,
   })

   /* Music Player */
   const PLAYER_STORAGE_KEY = "KARASU_PLAYER"

   const sidebar = $("#music-player-sidebar")
   const player = $(".music-player")
   const heading = $(".music-player header h2")
   const cd = $(".music-player .cd")
   const cdThumb = $(".music-player .cd-thumb")
   const playlist = $(".music-player .playlist")
   const playBtn = $(".music-player .btn-toggle-play")
   const prevBtn = $(".music-player .btn-prev")
   const nextBtn = $(".music-player .btn-next")
   const randomBtn = $(".music-player .btn-random")
   const repeatBtn = $(".music-player .btn-repeat")
   const resizeBtn = $(".music-player .btn-resize")
   const volumeBtn = $(".music-player .btn-volume")
   const volumeBar = $(".music-player .volume")
   const volumeHoverBox = $(".music-player .btn-volume .bar-hoverbox")
   const progress = $("#progress")
   const headingTooltip = tippy(heading, {
      theme: "song-info",
      arrow: false,
      animation: "scale",
      delay: [1000, 100],
      allowHTML: true,
   })

   const songInfo = (data) => {
      return `
        <div class="info">
            <p>Name: <span class="name">${data.name}</span></p>
            <p>Singer: <span class="singer">${data.singer}</span></p>
        </div>
        `
   }

   /* Audio elements / properties */
   const audio = new Audio()
   const context = new AudioContext()
   context.resume()
   const source = context.createMediaElementSource(audio)
   const analyser = context.createAnalyser()

   /* Canvas Visualizer */
   const audioVisualizer = $("#visualizer")

   /* Wave Surfer */
   const waveformsContainer = $(".wavesurfer-container")
   const waveforms = $("#waveform")
   const wavesurfer = WaveSurfer.create({
      container: waveforms,
      showTime: true,
      responsive: true,
      backend: "MediaElement",
      pixelRatio: 1,
      height: "0",
      barWidth: 2,
      waveColor: "#5e93c475",
      progressColor: "#4c06d685",
      cursorColor: "#0f6799",
      cursorWidth: 3,
      plugins: [
         WaveSurfer.cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
               "background-color": "#000",
               color: "#fff",
               padding: "2px",
               "font-size": "10px",
            },
         }),
      ],
   })

   const Application = {
      currentIndex: 0,
      isExpanding: true,
      isPlaying: false,
      isRandom: false,
      isRepeat: false,
      isMuted: false,
      isHoverOn: false,
      config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
      songs: [
         {
            name: "Natural",
            singer: "Imagine Dragons",
            url: "assets/music/Imagine Dragons - Natural.mp3",
            thumbnail: "assets/music/thumbnail/natural.jpg",
         },
         {
            name: "Believer",
            singer: "Imagine Dragons",
            url: "assets/music/Imagine Dragons - Believer.mp3",
            thumbnail: "assets/music/thumbnail/believer.jpg",
         },
         {
            name: "Stay",
            singer: "The Kid LAROI, Justin Bieber",
            url: "assets/music/The Kid LAROI, Justin Bieber - Stay.mp3",
            thumbnail: "assets/music/thumbnail/stay.jpg",
         },
         {
            name: "Sunflower",
            singer: "Post Malone, Swae Lee",
            url: "assets/music/Post Malone, Swae Lee - Sunflower (Spider-Man Into the Spider-Verse).mp3",
            thumbnail: "assets/music/thumbnail/sunflower.png",
         },
         {
            name: "POPSTARS",
            singer: "K/DA ft. Madison Beer, (G)I-DLE, Jaira Burns",
            url: "assets/music/KDA - POPSTARS (ft. Madison Beer, (G)I-DLE, Jaira Burns) - League of Legends.mp3",
            thumbnail: "assets/music/thumbnail/pop-stars.jpg",
         },
         {
            name: "MORE",
            singer: "K/DA ft. Madison Beer, (G)I-DLE, Lexie Liu, Jaira Burns, Seraphine",
            url: "assets/music/KDA - MORE ft. Madison Beer, (G)I-DLE, Lexie Liu, Jaira Burns, Seraphine.mp3",
            thumbnail: "assets/music/thumbnail/more.jpg",
         },
         {
            name: "Fractures",
            singer: "Illenium ft. Nevve",
            url: "assets/music/Illenium - Fractures (Feat. Nevve).mp3",
            thumbnail: "assets/music/thumbnail/fractures.jpg",
         },
         {
            name: "Walk Thru Fire",
            singer: "Vicetone ft. Meron Ryan",
            url: "assets/music/Vicetone - Walk Thru Fire ft. Meron Ryan.mp3",
            thumbnail: "assets/music/thumbnail/walk-thru-fire.jpg",
         },
         {
            name: "Love The Way You Lie",
            singer: "Eminem ft. Rihanna",
            url: "assets/music/Eminem - Love The Way You Lie ft. Rihanna.mp3",
            thumbnail: "assets/music/thumbnail/love-the-way-you-lie.png",
         },
         {
            name: "Nevada",
            singer: "Vicetone (ft. Cozi Zuehlsdorff)",
            url: "assets/music/Vicetone - Nevada (ft. Cozi Zuehlsdorff).mp3",
            thumbnail: "assets/music/thumbnail/nevada.jpg",
         },
         {
            name: "Summertime (Sunshine)",
            singer: "K-391",
            url: "assets/music/K-391 - Summertime [Sunshine].mp3",
            thumbnail: "assets/music/thumbnail/summertime-k391.jpg",
         },
         {
            name: "Heroes Tonight",
            singer: "Janji (feat. Johnning)",
            url: "assets/music/Janji - Heroes Tonight (feat. Johnning).mp3",
            thumbnail: "assets/music/thumbnail/hero-tonight.jpg",
         },
         {
            name: "Cradles",
            singer: "Sub Urban",
            url: "assets/music/Sub Urban - Cradles.mp3",
            thumbnail: "assets/music/thumbnail/cradles.jpg",
         },
         {
            name: "Waiting For Love",
            singer: "Avicii",
            url: "assets/music/Avicii - Waiting For Love.mp3",
            thumbnail: "assets/music/thumbnail/waiting-for-love.jpg",
         },
         {
            name: "Reality",
            singer: "Lost Frequencies",
            url: "assets/music/Reality - Lost Frequencies.mp3",
            thumbnail: "assets/music/thumbnail/Reality - Lost Frequencies.jpg",
         },
         {
            name: "潮汐 (Thuỷ Triều)",
            singer: "傅梦彤 (Phó Mộng Đồng)",
            url: "assets/music/BGM_01.mp3",
            thumbnail: "assets/music/thumbnail/潮汐.jpg",
         },
         {
            name: "白月光与朱砂痣 (Bạch Nguyệt Quang Và Nốt Chu Sa)",
            singer: "大籽 (Đại Tử)",
            url: "assets/music/BGM_02.mp3",
            thumbnail: "assets/music/thumbnail/白月光与朱砂痣.jpg",
         },
         {
            name: "Người theo đuổi ánh sáng",
            singer: "Từ Vi",
            url: "assets/music/BGM_03.mp3",
            thumbnail: "assets/music/thumbnail/nguoi-theo-duoi-anh-sang.jpg",
         },
         {
            name: "Probably",
            singer: "YOASOBI",
            url: "assets/music/YOASOBIたふん.mp3",
            thumbnail: "assets/music/thumbnail/Probably.jpg",
         },
         {
            name: "Tracing That Dream",
            singer: "YOASOBI",
            url: "assets/music/YOASOBIあの夢をなぞって.mp3",
            thumbnail: "assets/music/thumbnail/YOASOBI-Tracing-That-Dream.jpg",
         },
         {
            name: "Encore",
            singer: "YOASOBI",
            url: "assets/music/YOASOBIアンコール.mp3",
            thumbnail: "assets/music/thumbnail/encore-yoasobi.jpg",
         },
         {
            name: "Racing into The Night",
            singer: "YOASOBI",
            url: "assets/music/YOASOBI「夜に駆ける」.mp3",
            thumbnail: "assets/music/thumbnail/racing-into-the-night.jpg",
         },
         {
            name: "Wedding Dress",
            singer: "Taeyang (BIGBANG)",
            url: "assets/music/Taeyang - Wedding Dress.mp3",
            thumbnail: "assets/music/thumbnail/wedding-dress.jpg",
         },
         {
            name: "Haru Haru",
            singer: "BIGBANG",
            url: "assets/music/Big Bang - Haru Haru.mp3",
            thumbnail: "assets/music/thumbnail/haru-haru.jpg",
         },
      ],
      playedSongs: [],
      userPlaylists: {},
      loadConfig: function () {
         this.isRandom = this.config.isRandom || false
         this.isRepeat = this.config.isRepeat || false
         randomBtn.classList.toggle("active", this.isRandom)
         repeatBtn.classList.toggle("active", this.isRepeat)
         this.setVolume(75)

         if (this.isRandom) this.currentIndex = Math.floor(Math.random() * this.songs.length)
      },
      setConfig: function (key, value) {
         this.config[key] = value
         localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
      },
      render: function () {
         const htmls = this.songs.map((song, index) => {
            // render songs for playlist
            return `
                        <div class="song shadow-sm" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.thumbnail}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        `
         })
         playlist.innerHTML = htmls.join("")

         $$(".song").forEach((song) => {
            const body = song.querySelector(".body")
            const option = song.querySelector(".option")
            const index = song.dataset.index
            const data = this.songs[index]
            const fileName = data.url.substring(data.url.lastIndexOf("/") + 1)

            tippy(body, {
               // render tooltip for song details
               theme: "song-info",
               arrow: false,
               allowHTML: true,
               animation: "scale",
               delay: [2500, 0],
               duration: [200, 50],
               placement: "top",
               touch: ["hold", 500],
               content: songInfo(data),
            })

            tippy(option, {
               // render context menu (option) for each song
               theme: "option-context-menu",
               allowHTML: true,
               interactive: true,
               arrow: false,
               delay: [75, 0],
               offset: [0, -50],
               placement: "left",
               animation: "scale",
               trigger: isTouchable() ? "mouseenter focus" : "click",
               onShown(option) {
                  if (isTouchable()) return
                  option.setProps({ trigger: "mouseenter focus" })
               },
               onHide(option) {
                  if (isTouchable()) return
                  option.setProps({ trigger: "click" })
               },
               content: `<div class="option-context-menu" data-index=${index}>
                        <button class="option-item add-to">
                            <i class="fas fa-plus"></i>
                            <span class="option-text">Add to...</span>
                        </button>
                        <button class="option-item remove">
                            <i class="fas fa-trash"></i>
                            <span class="option-text">Remove</span>
                        </button>
                        <button class="option-item download">
                            <a href="${data.url}" download="${fileName}.mp3">
                                <i class="fas fa-download"></i>
                                <span class="option-text">Download</span>
                            </a>
                        </button>
                    </div>`,
            })
         })
      },
      renderInfoPreview: function () {
         const html = `
                    <h3 class="title">${this.currentSong.name}</h3>
                    <span class="author">${this.currentSong.singer}</span>
                `
         const info = $(".current-song .info")
         info.innerHTML = html

         previewTooltip.setContent(songInfo(this.currentSong))
      },
      defineProperties: function () {
         Object.defineProperty(this, "currentSong", {
            get: function () {
               return this.songs[this.currentIndex]
            },
         })
      },
      handleEvents: function () {
         const cdWidth = cd.offsetWidth
         const rect = $(".rect")
         const circle = $(".circle")
         const vision = $(".vision")
         const copyright = $("#copyright")
         const options = $$(".option-context-menu")
         const addSongDialog = $("#addsong-dialog")

         /* PAGE EVENT */
         // because z-index of circle is lower than character & vision that we need to handle manually
         vision.onmouseenter = () => {
            circle.classList.add("hover")
            vision.classList.add("fully")
         }

         vision.onmouseleave = () => {
            circle.classList.remove("hover")
            vision.classList.remove("fully")
         }

         /* MUSIC PLAYER EVENT */
         // override bootstrap offcanvas event
         sidebar.addEventListener("hide.bs.offcanvas", function () {
            preview.classList.remove("hide")
            waveformsContainer.classList.remove("hide")
            audioVisualizer.classList.remove("collapse")
         })
         // override bootstrap offcanvas event
         sidebar.addEventListener("show.bs.offcanvas", function () {
            preview.classList.add("hide")
            waveformsContainer.classList.add("hide")
            audioVisualizer.classList.add("collapse")
         })

         const cdThumbAnimate = cdThumb.animate(
            [
               {
                  // animation for CD thumb on player
                  transform: "rotate(360deg)",
               },
            ],
            {
               duration: 10000,
               iterations: Infinity,
            }
         )
         cdThumbAnimate.pause()

         const previewCbThumbAnimate = previewCdThumb.animate(
            [
               {
                  // animation for CD thumb on preview
                  transform: "rotate(360deg)",
               },
            ],
            {
               duration: 10000,
               iterations: Infinity,
            }
         )
         previewCbThumbAnimate.pause()

         volumeBtn.onclick = (e) => {
            // event on volume icon
            if (e.target.nodeName === "I") {
               // only trigger when click on icon
               this.isMuted = !this.isMuted
               this.setVolume(this.isMuted ? 1 : 75)
            }
         }

         volumeHoverBox.onclick = (e) => {
            // event on volume bar
            e.stopPropagation()
            let value = e.offsetX
            this.setVolume(value)
         }

         volumeHoverBox.onwheel = (e) => {
            // event on volume bar
            let value = +volumeBar.value + e.deltaY * 0.1
            this.setVolume(value)
         }

         volumeHoverBox.ontouchmove = (e) => {
            // event on volume bar in touchable device
            let value = e.offsetX <= 100 ? e.offsetX : 100
            this.setVolume(value)
         }

         resizeBtn.onclick = () => {
            // event on button resize music player dashboard
            this.isExpanding = !this.isExpanding
            player.classList.toggle("shrinking", !this.isExpanding)

            cd.style.width = this.isExpanding ? cdWidth + "px" : 0
            playlist.style.marginTop = this.isExpanding ? 360 + "px" : 160 + "px"
         }

         playBtn.onclick = () => {
            // event on click play button
            if (this.isPlaying) {
               audio.pause()
            } else {
               audio.play()
            }
         }

         previewCdThumb.onclick = () => playBtn.click() // event on click cd thumb on preview

         playlist.onclick = (e) => {
            // event on click a song on playlist
            const notCurrentSong = e.target.closest(".song:not(.active)")
            const option = e.target.closest(".option")
            const tippyInstance = e.target.closest(".song").querySelector(".option")._tippy
            const optionMenu = e.target.closest(".option-context-menu")
            const addTo = e.target.closest(".add-to")
            const remove = e.target.closest(".remove")
            const download = e.target.closest(".download")

            if (notCurrentSong && !option && !optionMenu) {
               // handle when click on not active song
               this.currentIndex = notCurrentSong.dataset.index
               this.loadCurrentSong()
               audio.play()
            }

            if (optionMenu) {
               const index = optionMenu.dataset.index
               if (addTo) {
                  // handle when click 'add to' button on options menu
                  addSongDialog.classList.toggle("shown")
               }
               if (remove) {
               }
               if (download) {
               }
            }

            if (!isTouchable()) tippyInstance.hide()
         }

         progress.onmousedown = () => {
            // event on progressbar to prevent progressbar continue update when hover
            this.isHoverOn = true
         }

         progress.onmouseup = () => {
            // event on progressbar to continue update
            this.isHoverOn = false
         }

         progress.onchange = (e) => {
            // event on progressbar to change current time of song base on progressbar value
            const percent = e.target.value
            audio.currentTime = (audio.duration / 100) * percent
         }

         prevBtn.onclick = () => {
            // event on prev button
            if (this.isRandom) {
               this.randomSong()
            } else {
               this.prevSong()
            }
            audio.play()
         }

         nextBtn.onclick = () => {
            // event on next button
            if (this.isRandom) {
               this.randomSong()
            } else {
               this.nextSong()
            }
            audio.play()
         }

         randomBtn.onclick = () => {
            // event on random button
            this.isRandom = !this.isRandom
            this.setConfig("isRandom", this.isRandom)
            randomBtn.classList.toggle("active", this.isRandom)

            if (!this.isRandom) this.playedSongs = []
         }

         repeatBtn.onclick = () => {
            // event on repeat button
            this.isRepeat = !this.isRepeat
            this.setConfig("isRepeat", this.isRepeat)
            repeatBtn.classList.toggle("active", this.isRepeat)
         }

         document.onkeydown = (event) => {
            // key event on music player controls
            if (event.code == "ArrowLeft") {
               prevBtn.click()
            } else if (event.code == "ArrowRight") {
               nextBtn.click()
            } else if (event.code == "Space") {
               event.preventDefault()
               playBtn.click()
            } else if (event.code == "ArrowUp") {
               if (audio.volume <= 0.9) {
                  this.setVolume((audio.volume += 0.1) * 100)
               } else {
                  this.setVolume(100)
               }
            } else if (event.code == "ArrowDown") {
               if (audio.volume >= 0.1) {
                  this.setVolume((audio.volume -= 0.1) * 100)
               } else {
                  this.setVolume(1)
               }
            }
         }

         audio.onplay = () => {
            this.isPlaying = true
            player.classList.add("playing")
            cdThumbAnimate.play()
            previewCbThumbAnimate.play()
            wavesurfer.setHeight(50)

            rect.classList.add("active")
            circle.classList.add("active")
            vision.classList.add("active")
            copyright.classList.add("hide")
         }

         audio.onpause = () => {
            this.isPlaying = false
            player.classList.remove("playing")
            cdThumbAnimate.pause()
            previewCbThumbAnimate.pause()
            wavesurfer.setHeight(0)

            rect.classList.remove("active")
            circle.classList.remove("active")
            vision.classList.remove("active")
            copyright.classList.remove("hide")
         }

         audio.ontimeupdate = () => {
            if (audio.duration && !this.isHoverOn) {
               const percent = Math.floor((audio.currentTime / audio.duration) * 100)
               progress.value = percent
            }
         }

         audio.onended = () => {
            if (this.isRepeat) {
               audio.play()
            } else {
               nextBtn.click()
            }
         }
      },
      loadCurrentSong: function () {
         audio.src = this.currentSong.url
         audio.currentTime = 0
         wavesurfer.load(audio) // load waveforms accompany with audio

         heading.textContent = this.currentSong.name
         headingTooltip.setContent(songInfo(this.currentSong))

         cdThumb.style.backgroundImage = `url('${this.currentSong.thumbnail}')`
         previewCdThumb.style.backgroundImage = `url('${this.currentSong.thumbnail}')`

         this.activeCurrentSong()
         this.renderInfoPreview()
      },
      setVolume: function (value) {
         const fill = $(".btn-volume .bar .bar-fill")

         if (!value || value > 100) {
            value = 100
         } else if (value < 1) {
            value = 1
         }

         fill.style.width = value + "%"
         audio.volume = value != 1 ? value / 100 : 0
         volumeBar.value = value

         if (volumeBar.value == 1 && !this.isMuted) this.isMuted = true

         volumeBtn.classList.toggle("up", volumeBar.value > 60)
         volumeBtn.classList.toggle("down", volumeBar.value <= 60 && volumeBar.value > 20)
         volumeBtn.classList.toggle("off", volumeBar.value <= 20 && volumeBar.value > 1)
         volumeBtn.classList.toggle("muted", volumeBar.value == 1)
      },
      prevSong: function () {
         this.currentIndex--
         if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
         }
         this.loadCurrentSong()
      },
      nextSong: function () {
         this.currentIndex++
         if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
         }
         this.loadCurrentSong()
      },
      randomSong: function () {
         // clear playedSongs when its length equals total songs
         if (this.playedSongs.length === this.songs.length) {
            this.playedSongs = []
         }

         let randomIndex
         do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
         } while (randomIndex === this.currentIndex || this.playedSongs.includes(randomIndex))

         this.playedSongs.push(randomIndex)

         this.currentIndex = randomIndex
         this.loadCurrentSong()
      },
      activeCurrentSong: function () {
         const songs = $$(".song")
         // remove active class
         for (const song of songs) {
            song.classList.remove("active")
         }
         // add active class to current song
         songs[this.currentIndex].classList.add("active")

         // scroll current song to view
         setTimeout(() => {
            songs[this.currentIndex].scrollIntoView({
               behavior: "smooth",
               block: "end",
            })
         }, 250)
      },
      initVisualizer: function () {
         const canvas = $("#visualizer")
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight - 50
         const ctx = canvas.getContext("2d")

         source.connect(analyser)
         analyser.connect(context.destination)
         analyser.fftSize = 4096

         let bufferLength = analyser.frequencyBinCount
         let dataArray = new Uint8Array(bufferLength) // always equals fftSize / 2

         const WIDTH = canvas.width,
            HEIGHT = canvas.height,
            barWidth = (WIDTH / bufferLength) * 2.5

         let gradient = ctx.createLinearGradient(0, 0, WIDTH, 0)
         gradient.addColorStop(1, "#349eeb95")
         gradient.addColorStop(0.4, "#f0e24d95")
         gradient.addColorStop(0, "#f0916595")

         function renderFrame() {
            analyser.getByteFrequencyData(dataArray)

            ctx.clearRect(0, 0, WIDTH, HEIGHT)

            for (let i = 0; i < dataArray.length; i++) {
               const barHeight = dataArray[i]

               ctx.fillStyle = gradient
               // WIDTH - barWidth * i => Right To Left
               ctx.fillRect(WIDTH - barWidth * i, HEIGHT - barHeight, barWidth, barHeight)
            }

            requestAnimationFrame(renderFrame)
         }

         renderFrame.call()
      },
      preload: function () {
         this.loadConfig()

         this.defineProperties()

         this.render()
      },
      visible: function () {
         preview.classList.remove("hide")
      },
      start: function () {
         this.handleEvents()

         this.loadCurrentSong()

         this.initVisualizer()

         this.visible()
      },
   }

   Application.preload() // preload data for Application

   this.setTimeout(() => {
      Application.start()
   }, 2000) // display Application after preloading animation end
})
