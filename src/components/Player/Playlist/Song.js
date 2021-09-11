import { useRef } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Song.module.css"

const Song = (props) => {
   const nodeRef = useRef()
   const { index, song } = props
   const currentIndex = useSelector((state) => state.appFeatures.currentIndex)
   const active = currentIndex === index

   if (active && nodeRef.current) {
      nodeRef.current.scrollIntoView({
         behavior: "smooth",
         block: "end",
      })
   }

   return (
      <CSSTransition
         in={active}
         nodeRef={nodeRef}
         timeout={{ enter: 1000, exit: 0 }}
         classNames={{
            enterActive: styles.activating,
            enterDone: styles.active,
         }}>
         <div
            ref={nodeRef}
            className={`${styles.song} shadow-sm`}
            data-index={index}
            onClick={props.onClick}>
            <div className={styles.thumb} style={{ backgroundImage: `url(${song.thumbnail})` }} />
            <div className={styles.body}>
               <h3 className={styles.title}>{song.name}</h3>
               <p className={styles.author}>{song.singer}</p>
            </div>
            <div className={styles.option}>
               <FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
            </div>
         </div>
      </CSSTransition>
   )
}

export default Song
