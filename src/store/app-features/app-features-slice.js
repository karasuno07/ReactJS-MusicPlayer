import { createSlice } from "@reduxjs/toolkit"
import Audio, { context } from "components/Player/AudioElement"
import { wavesurfer } from "components/Player/Visualizer/WaveProgress"

const defaultConfigs = {
   isRandom: false,
   isRepeat: false,
   isMuted: false,
   volume: 75,
   currentTime: Audio.currentTime || 0,
}

const AppFeatures = createSlice({
   name: "App Features",
   initialState: {
      isPlaying: false,
      isShowCDThumb: true,
      songs: [],
      playedSongs: [],
      currentIndex: 0,
      currentSong: null,
      configs: defaultConfigs,
   },
   reducers: {
      // load configs from local storage
      loadConfigs(state, action) {
         const configs = action.payload || {}
         state.configs = Object.assign(state.configs, configs)
      },
      resetConfigs(state) {
         state.configs = defaultConfigs
      },
      // load songs data from server
      loadSongs(state, action) {
         state.songs = action.payload
         AppFeatures.caseReducers.loadCurrentSong(state, 0)
      },
      // toggle random feature
      toggleRandom(state) {
         state.configs.isRandom = !state.configs.isRandom
      },
      // toggle repeat feature
      toggleRepeat(state) {
         state.configs.isRepeat = !state.configs.isRepeat
      },
      // toggle muted/unmute audio sound
      toggleMuted(state) {
         if (state.configs.isMuted) {
            AppFeatures.caseReducers.setVolume(state, null, 60)
         } else {
            AppFeatures.caseReducers.setVolume(state, null, 0)
         }
      },
      // toggle expanding cd thumb
      toggleExpanding(state) {
         state.isShowCDThumb = !state.isShowCDThumb
      },
      // play audio
      play(state) {
         context.resume()
         state.isPlaying = true
         Audio.play()
      },
      // pause audio
      pause(state) {
         state.isPlaying = false
         Audio.pause()
      },
      // load current song url to audio source
      loadCurrentSong(state, action) {
         if (action) state.currentIndex = action.payload
         state.currentSong = state.songs[state.currentIndex]
         Audio.src = state.currentSong.url
         wavesurfer.load(Audio)
      },
      // load random song
      loadRandomSong(state) {
         if (state.playedSongs.length === state.songs.length) {
            state.playedSongs = []
         }

         let randomIndex
         do {
            randomIndex = Math.floor(Math.random() * state.songs.length)
         } while (randomIndex === state.currentIndex || state.playedSongs.includes(randomIndex))

         state.playedSongs.push(randomIndex)
         state.currentIndex = randomIndex
         AppFeatures.caseReducers.loadCurrentSong(state)
      },
      // handle click on previous song button
      onPrevSong(state) {
         if (state.configs.isRepeat) {
            AppFeatures.caseReducers.loadCurrentSong(state)
         } else if (state.configs.isRandom) {
            AppFeatures.caseReducers.loadRandomSong(state)
         } else {
            if (--state.currentIndex < 0) state.currentIndex = state.songs.length - 1
            AppFeatures.caseReducers.loadCurrentSong(state)
         }

         AppFeatures.caseReducers.play(state)
      },
      // handle click on next song button
      onNextSong(state) {
         if (state.configs.isRepeat) {
            AppFeatures.caseReducers.loadCurrentSong(state)
         } else if (state.configs.isRandom) {
            AppFeatures.caseReducers.loadRandomSong(state)
         } else {
            if (++state.currentIndex === state.songs.length) state.currentIndex = 0
            AppFeatures.caseReducers.loadCurrentSong(state)
         }

         AppFeatures.caseReducers.play(state)
      },
      setVolume(state, action, plainValue = 60) {
         const value = action ? action.payload : plainValue
         if (value === 0) {
            state.configs.isMuted = true
         } else {
            state.configs.isMuted = false
         }
         state.configs.volume = value
         Audio.volume = value / 100
      },
   },
})

export const AppActions = AppFeatures.actions
export default AppFeatures
