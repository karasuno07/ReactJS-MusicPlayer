import React from "react"
import { useSelector } from "react-redux"
import Preloader from "./components/UI/Preloader"
import Background from "./components/Layout/Background"
import Overlays from "./components/UI/Overlays/Overlays"
import Footer from "./components/Layout/Footer"
import Sidebar from "./components/Layout/Sidebar"
import "./App.css"
import Visualizer from "components/Player/Visualizer/Visualizer"

function App() {
   const isLoading = useSelector((state) => state.ui.isLoading)
   const isPlaying = useSelector((state) => state.appFeatures.isPlaying)

   return (
      <React.Fragment>
         <Preloader show={isLoading} />
         <Overlays active={isPlaying} />
         <Background />
         <Visualizer />
         <Sidebar />
         <Footer />
      </React.Fragment>
   )
}

export default App
