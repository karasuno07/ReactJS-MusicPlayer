import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppActions } from "store/app-features/app-features-slice"
import { TransitionGroup } from "react-transition-group"
import Song from "./Song"
import styles from "./Playlist.module.css"

const Playlist = (props) => {
   const dispatch = useDispatch()
   const songs = useSelector((state) => state.appFeatures.songs)
   const currentIndex = useSelector((state) => state.appFeatures.currentIndex)

   const handleSongClick = (index) => {
      if (currentIndex === index) return
      dispatch(AppActions.loadCurrentSong(index))
      dispatch(AppActions.play())
   }

   // let content = <></>
   const content = songs.map((song, index) => (
      <Song key={index} index={index} song={song} onClick={handleSongClick.bind(null, index)} />
   ))

   return (
      <TransitionGroup
         component="div"
         className={`${styles.playlist} ${props.expand ? styles.expand : ""}`}>
         {content}
      </TransitionGroup>
   )
}

export default React.memo(Playlist)
