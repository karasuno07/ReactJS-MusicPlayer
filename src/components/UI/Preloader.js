import React from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"
import styles from "./Preloader.module.css"

const Preloader = (props) => {
   const nodeRef = React.useRef(null)

   const waves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wave) => (
      <div key={wave} className={`${styles.wave} ${styles["wave-" + wave]}`} />
   ))

   return ReactDOM.createPortal(
      <CSSTransition
         nodeRef={nodeRef}
         in={props.show}
         timeout={{
            enter: 250,
            exit: 500,
         }}
         mountOnEnter
         unmountOnExit
         classNames={{
            enter: "",
            enterActive: styles.show,
            exit: "",
            exitActive: styles.hide,
         }}>
         <div ref={nodeRef} className={styles.preloader}>
            {waves}
         </div>
      </CSSTransition>,
      document.getElementById("overlays")
   )
}

export default Preloader
