import React, { useRef } from "react"
import DrawerBackdrop from "./DrawerBackdrop"
import { CSSTransition } from "react-transition-group"
import styles from "./Drawer.module.css"

const Drawer = (props) => {
   const drawerRef = useRef(null)

   const classNames = [
      styles.drawer,
      Array.isArray(props.classes) ? [...props.classes] : props.classes,
   ].join(" ")

   return (
      <>
         <CSSTransition
            nodeRef={drawerRef}
            in={props.show}
            timeout={500}
            classNames={{
               enterActive: styles.show,
               enterDone: styles.show,
               exitActive: styles.hide,
            }}>
            <div ref={drawerRef} className={classNames}>
               {props.children}
            </div>
         </CSSTransition>
         <DrawerBackdrop show={props.show} onHide={props.onHide} />
      </>
   )
}

export default Drawer
