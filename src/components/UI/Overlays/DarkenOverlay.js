import React from "react"
import { CSSTransition } from "react-transition-group"
import styles from "./DarkenOverlay.module.css"

const DarkenOverlay = (props) => {
   const nodeRef = React.useRef(null)
   return (
      <CSSTransition
         nodeRef={nodeRef}
         in={props.active}
         timeout={{
            enter: 750,
            exit: 1500,
         }}
         mountOnEnter
         unmountOnExit
         classNames={{
            enterDone: `${styles.active}`,
            exitActive: `${styles.hiding}`,
         }}>
         <div ref={nodeRef} className={styles["darken-overlay"]} />
      </CSSTransition>
   )
}

export default DarkenOverlay
