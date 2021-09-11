import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { analyser } from "../AudioElement"
import styles from "./Visualizer.module.css"

const Visualizer = () => {
   const canvasRef = useRef()
   const canvas = canvasRef.current
   const isShowSideBar = useSelector((state) => state.ui.isShowSideBar)

   useEffect(() => {
      let requestId

      if (canvas) {
         const bufferLength = analyser.frequencyBinCount
         const data = new Uint8Array(bufferLength)
         canvas.window = window.innerWidth
         canvas.height = window.innerHeight - 50
         const ctx = canvas.getContext("2d")
         const WIDTH = canvas.window
         const HEIGHT = canvas.height
         const barWidth = (WIDTH / bufferLength) * 2.5
         const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0)
         gradient.addColorStop(1, "#349eeb95")
         gradient.addColorStop(0.4, "#f0e24d95")
         gradient.addColorStop(0, "#f0916595")
         ;(function renderFrame() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT)
            analyser.getByteFrequencyData(data)

            data.forEach((data, index) => {
               const barHeight = data

               ctx.fillStyle = gradient
               // WIDTH - barWidth * i => Right To Left
               ctx.fillRect(WIDTH - barWidth * index, HEIGHT - barHeight, barWidth, barHeight)
            })

            requestId = requestAnimationFrame(renderFrame)
         })()
      }

      return () => cancelAnimationFrame(requestId)
   }, [canvas])

   return (
      <CSSTransition
         nodeRef={canvasRef}
         in={isShowSideBar}
         timeout={750}
         classNames={{
            enterActive: styles.collapse,
            enterDone: styles.collapse,
            exitActive: styles.show,
            exitDone: styles.show,
         }}>
         <canvas
            ref={canvasRef}
            width={`${window.innerWidth}`}
            height={`${window.innerHeight - 50}`}
            id={styles.visualizer}
         />
      </CSSTransition>
   )
}

export default Visualizer
