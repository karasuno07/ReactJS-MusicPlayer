import { useDispatch, useSelector } from "react-redux"
import { AppActions } from "store/app-features/app-features-slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../UI/Button"
import styles from "./VolumeBar.module.css"

const VolumeBar = (props) => {
   const dispatch = useDispatch()
   const volume = useSelector((state) => state.appFeatures.configs.volume)
   const isMuted = useSelector((state) => state.appFeatures.configs.isMuted)

   const onToggleMutedHandle = () => dispatch(AppActions.toggleMuted())

   const onClickVolumeBarHandle = (event) => {
      event.stopPropagation()
      let value = event.nativeEvent.offsetX
      if (value === 1) value = 0
      else if (value === 99) value = 100
      dispatch(AppActions.setVolume(value))
   }

   return (
      <Button className={styles["btn-volume"]} onClick={onToggleMutedHandle}>
         {volume > 60 && <FontAwesomeIcon className={styles.icon} icon={["fas", "volume-up"]} />}
         {volume > 25 && volume <= 60 && (
            <FontAwesomeIcon className={styles.icon} icon={["fas", "volume-down"]} />
         )}
         {volume > 0 && volume <= 25 && (
            <FontAwesomeIcon className={styles.icon} icon={["fas", "volume-off"]} />
         )}
         {(volume === 0 || isMuted) && (
            <FontAwesomeIcon className={styles.icon} icon={["fas", "volume-mute"]} />
         )}
         <input type="range" />
         <div onClick={onClickVolumeBarHandle} className={styles["bar-hoverbox"]}>
            <div className={styles.bar}>
               <div className={styles["bar-fill"]} style={{ width: `${volume}%` }}></div>
            </div>
         </div>
      </Button>
   )
}

export default VolumeBar
