import React, { useEffect } from "react"
import { UiActions } from "store/ui/ui-slice"
import { loadAudioData } from "store/app-features/custom-actions"
import { useDispatch, useSelector } from "react-redux"
import Dashboard from "./Dashboard/Dashboard"
import Playlist from "./Playlist/Playlist"
import styles from "./Player.module.css"

const Player = () => {
   const dispatch = useDispatch()
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)
   const isShowCDThumb = useSelector((state) => state.appFeatures.isShowCDThumb)
   const currentSong = useSelector((state) => state.appFeatures.currentSong)

   useEffect(() => {
      dispatch(UiActions.setLoadingState(true))
      dispatch(loadAudioData())

      setTimeout(() => dispatch(UiActions.setLoadingState(false)), 3000)
   }, [dispatch])

   return (
      <div className={styles["music-player"]}>
         <Dashboard currentSong={currentSong} isShowCDThumb={isShowCDThumb} isPlaying={isPlaying} />
         <Playlist expand={!isShowCDThumb} />
      </div>
   )
}

export default React.memo(Player)
