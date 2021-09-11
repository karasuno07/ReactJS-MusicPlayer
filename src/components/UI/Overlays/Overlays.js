import React from "react"
import ReactDOM from "react-dom"
import DarkenOverlay from "./DarkenOverlay"
import CircleOverlay from "./CircleOverlay"
import Character from "./Character"
import Vision from "./Vision"

const portal = document.getElementById("overlays")

const Overlays = (props) => {
   return (
      <>
         {ReactDOM.createPortal(<DarkenOverlay active={props.active} />, portal)}
         {ReactDOM.createPortal(<CircleOverlay active={props.active} />, portal)}
         {ReactDOM.createPortal(<Character />, portal)}
         {ReactDOM.createPortal(<Vision active={props.active} />, portal)}
      </>
   )
}

export default React.memo(Overlays)
