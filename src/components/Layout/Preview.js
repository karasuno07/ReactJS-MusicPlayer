import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppActions } from "../../store/app-features/app-features-slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../UI/Button"

import { CSSTransition } from "react-transition-group"
import styles from "./Preview.module.css"

const Preview = (props) => {
   const nodeRef = useRef(null)
   const dispatch = useDispatch()
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)
   const currentSong = useSelector((state) => state.appFeatures.currentSong)

   const handleTogglePlay = () => {
      if (isPlaying) {
         dispatch(AppActions.pause())
      } else {
         dispatch(AppActions.play())
      }
   }

   return (
      <div className={`${styles.preview} ${!props.show ? styles.hide : ""}`}>
         <div className={styles.content}>
            <Button onClick={props.onShowSidebar}>
               <FontAwesomeIcon className={styles.icon} icon={["fas", "compact-disc"]} />
               <span className={styles["btn-txt"]}>Open Player</span>
            </Button>
            <div className={styles.info}>
               <h3 className={styles.title}>{currentSong ? currentSong.name : "Song Name"}</h3>
               <span className={styles.author}>{currentSong ? currentSong.singer : "Singer"}</span>
            </div>
         </div>
         <CSSTransition
            nodeRef={nodeRef}
            in={isPlaying}
            timeout={0}
            classNames={{
               enterDone: styles.playing,
            }}>
            <div ref={nodeRef} onClick={handleTogglePlay} className={styles.thumbnail}>
               <div
                  className={styles["cd-thumbnail"]}
                  style={{ backgroundImage: `url(${currentSong ? currentSong.thumbnail : ""})` }}
               />
            </div>
         </CSSTransition>
      </div>
   )
}

export default Preview
