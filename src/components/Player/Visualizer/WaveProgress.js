import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Wavesurfer from "wavesurfer.js"
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor"
import { CSSTransition } from "react-transition-group"
import styles from "./WaveProgress.module.css"

export let wavesurfer

const WaveProgress = () => {
   const wavesurferRef = useRef()
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)

   useEffect(() => {
      wavesurfer = Wavesurfer.create({
         container: wavesurferRef.current,
         responsive: true,
         backend: "MediaElement",
         pixelRatio: 1,
         height: "50",
         barWidth: 2,
         waveColor: "#5e93c475",
         progressColor: "#4c06d685",
         cursorColor: "#0f6799",
         cursorWidth: 3,
         plugins: [
            CursorPlugin.create({
               showTime: true,
               opacity: 1,
               customShowTimeStyle: {
                  "background-color": "transparent",
                  color: "#fff",
                  padding: "8px",
                  "font-size": "12px",
                  "font-weight": 600,
               },
            }),
         ],
      })
   }, [])

   return (
      <CSSTransition
         nodeRef={wavesurferRef}
         in={isPlaying}
         timeout={500}
         classNames={{
            enterActive: styles.show,
            enterDone: styles.show,
            exitActive: styles.hide,
            exitDone: styles.hide,
         }}>
         <div ref={wavesurferRef} id={styles.waveform} />
      </CSSTransition>
   )
}

export default WaveProgress
