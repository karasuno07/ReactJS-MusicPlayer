/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { AppActions } from "../../../store/app-features/app-features-slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../UI/Button"
import styles from "./Controls.module.css"

const Controls = () => {
   const dispatch = useDispatch()
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)
   const isRepeat = useSelector((state) => state.appFeatures.configs.isRepeat)
   const isRandom = useSelector((state) => state.appFeatures.configs.isRandom)

   const handlePrevSong = () => dispatch(AppActions.onPrevSong())
   const handleNextSong = () => dispatch(AppActions.onNextSong())
   const handleToggleRepeat = () => dispatch(AppActions.toggleRepeat())
   const handleToggleRandom = () => dispatch(AppActions.toggleRandom())
   const handleTogglePlay = () => {
      if (isPlaying) {
         dispatch(AppActions.pause())
      } else {
         dispatch(AppActions.play())
      }
   }

   return (
      <div className={styles.control}>
         <Button className={`${isRepeat ? styles.active : ""}`} onClick={handleToggleRepeat}>
            <FontAwesomeIcon icon={["fas", "redo"]} />
         </Button>
         <Button onClick={handlePrevSong}>
            <FontAwesomeIcon icon={["fas", "step-backward"]} />
         </Button>
         <Button className={styles["btn-toggle-play"]} onClick={handleTogglePlay}>
            {isPlaying && <FontAwesomeIcon icon={["fas", "pause"]} />}
            {!isPlaying && <FontAwesomeIcon icon={["fas", "play"]} />}
         </Button>
         <Button onClick={handleNextSong}>
            <FontAwesomeIcon icon={["fas", "step-forward"]} />
         </Button>
         <Button className={`${isRandom ? styles.active : ""}`} onClick={handleToggleRandom}>
            <FontAwesomeIcon icon={["fas", "random"]} />
         </Button>
      </div>
   )
}

export default Controls
