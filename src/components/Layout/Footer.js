import { useRef } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import WaveProgress from "components/Player/Visualizer/WaveProgress"
import styles from "./Footer.module.css"

const Footer = () => {
   const footerRef = useRef(null)
   const copyrightRef = useRef(null)
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)
   const showSideBar = useSelector((state) => state.ui.isShowSideBar)

   return (
      <CSSTransition
         nodeRef={footerRef}
         in={showSideBar}
         appear={true}
         timeout={500}
         classNames={{
            enterActive: styles.hide,
            enterDone: styles.hide,
            exitActive: styles.show,
            exitDone: styles.show,
         }}>
         <div ref={footerRef} className={styles.footer}>
            <CSSTransition
               nodeRef={copyrightRef}
               in={!isPlaying}
               timeout={750}
               classNames={{
                  enterActive: styles.show,
                  enterDone: styles.show,
                  exitActive: styles.hide,
                  exitDone: styles.hide,
               }}>
               <div ref={copyrightRef} id={styles.copyright}>
                  <span>
                     Copyrights & copy; 2021 - <a href=" "> Chien Kieu </a>, All Rights Reserved.
                  </span>
               </div>
            </CSSTransition>
            <WaveProgress />
         </div>
      </CSSTransition>
   )
}

export default Footer
