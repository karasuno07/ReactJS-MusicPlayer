import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { AppActions } from "../../../store/app-features/app-features-slice"
import Audio from "../AudioElement"
import styles from "./ProgressBar.module.css"

const ProgressBar = () => {
   const progressRef = useRef(null)
   const dispatch = useDispatch()
   const [hover, setHover] = useState(false)

   useEffect(() => {
      if (hover) {
         Audio.ontimeupdate = () => {}
      } else {
         Audio.ontimeupdate = () => {
            const percent = Math.floor((Audio.currentTime / Audio.duration) * 100)
            progressRef.current.value = isNaN(percent) ? 0 : percent
         }
      }
      Audio.onended = () => dispatch(AppActions.onNextSong())
   }, [hover, dispatch])

   const onSeekingHandler = () => setHover(true)
   const onSeekedHandler = (event) => {
      const percent = event.target.value
      Audio.currentTime = (Audio.duration / 100) * percent
      setHover(false)
   }

   return (
      <input
         onMouseDown={onSeekingHandler}
         onMouseUp={onSeekedHandler}
         ref={progressRef}
         className={styles.progress}
         type="range"
         defaultValue="0"
         step="1"
         min="0"
         max="100"
      />
   )
}

export default ProgressBar
