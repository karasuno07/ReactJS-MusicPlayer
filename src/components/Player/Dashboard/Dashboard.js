import Header from "./Header"
import VolumeBar from "../Controls/VolumeBar"
import ResizeButton from "../Controls/ResizeButton"
import CD from "./CD"
import Controls from "../Controls/Controls"
import styles from "./Dashboard.module.css"
import ProgressBar from "../Controls/ProgressBar"

const Dashboard = (props) => {
   return (
      <div className={styles.dashboard}>
         <VolumeBar />
         <Header songName={props.currentSong && props.currentSong.name} />
         <ResizeButton />
         <CD
            show={props.isShowCDThumb}
            thumbnail={props.currentSong && props.currentSong.thumbnail}
         />
         <Controls />
         <ProgressBar />
      </div>
   )
}

export default Dashboard
