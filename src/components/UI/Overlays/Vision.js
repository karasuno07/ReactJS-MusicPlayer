import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { UiActions } from "../../../store/ui/ui-slice"
import { CSSTransition } from "react-transition-group"
import styles from "./Vision.module.css"

const Vision = (props) => {
   const nodeRef = useRef(null)
   const dispatch = useDispatch()
   const [classes, setClasses] = useState(styles.vision)

   const onMouseOverHandler = () => {
      setClasses((classes) => classes.concat(` ${styles.fully}`))
      dispatch(UiActions.onHover(true))
   }

   const onMouseOutHandler = () => {
      setClasses((classes) => classes.replace(` ${styles.fully}`, ""))
      dispatch(UiActions.onHover(false))
   }

   const onActiveClass = () => {
      setClasses((classes) => classes.concat(` ${styles.active}`))
   }

   const onDeactiveClass = () => {
      setClasses((classes) => classes.replace(` ${styles.active}`, ""))
   }

   return (
      <CSSTransition
         nodeRef={nodeRef}
         in={props.active}
         timeout={1500}
         onEntering={onActiveClass}
         onExiting={onDeactiveClass}
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
         <div
            ref={nodeRef}
            className={classes}
            onMouseOver={onMouseOverHandler}
            onMouseOut={onMouseOutHandler}
         />
      </CSSTransition>
   )
}

export default Vision
