import { useRef } from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"
import styles from "./DrawerBackdrop.module.css"

const DrawerBackdrop = (props) => {
   const backdropRef = useRef(null)

   return ReactDOM.createPortal(
      <CSSTransition
         nodeRef={backdropRef}
         in={props.show}
         timeout={{
            enter: 1000,
            exit: 1000,
         }}
         mountOnEnter
         unmountOnExit
         classNames={{
            enterActive: styles.fadeIn,
            enterDone: styles.fadeIn,
            exitActive: styles.fadeOut,
         }}>
         <div ref={backdropRef} onClick={props.onHide} className={styles.backdrop}></div>
      </CSSTransition>,
      document.getElementById("overlays")
   )
}

export default DrawerBackdrop
