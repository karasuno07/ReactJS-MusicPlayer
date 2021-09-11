import { useRef } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import styles from "./CD.module.css"

const CD = (props) => {
   const nodeRef = useRef(null)
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)

   return (
      <div className={`${styles.cd} ${!props.show ? styles.hide : ""}`}>
         <CSSTransition
            nodeRef={nodeRef}
            in={isPlaying}
            timeout={0}
            classNames={{
               enterDone: styles.playing,
            }}>
            <div
               ref={nodeRef}
               className={styles["cd-thumb"]}
               style={{ backgroundImage: `url(${props.thumbnail})` }}
            />
         </CSSTransition>
      </div>
   )
}

export default CD
