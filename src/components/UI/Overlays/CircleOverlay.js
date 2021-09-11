import { useState, useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"
import styles from "./CircleOverlay.module.css"

const CircleOverlay = (props) => {
   const nodeRef = useRef(null)
   const { active } = props

   const isHoverOn = useSelector((state) => state.ui.isHoverOn)
   const [classes, setClasses] = useState(styles.circle)

   useEffect(() => {
      if (isHoverOn) {
         setClasses((classes) => classes.concat(` ${styles.hover}`))
      } else {
         setClasses((classes) => classes.replace(` ${styles.hover}`, ""))
      }
   }, [isHoverOn, active])

   return (
      <CSSTransition
         nodeRef={nodeRef}
         in={active}
         timeout={{
            enter: 1500,
            exit: 1250,
         }}
         onEntering={() => setClasses((classes) => classes.concat(` ${styles.active}`))}
         onExiting={() => setClasses((classes) => classes.replace(` ${styles.active}`, ""))}
         mountOnEnter
         unmountOnExit
         classNames={{
            enter: "",
            enterActive: "",
            enterDone: "",
            exit: "",
            exitActive: "",
            exitDone: "",
         }}>
         <div ref={nodeRef} className={classes} />
      </CSSTransition>
   )
}

export default CircleOverlay
