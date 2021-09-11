import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { UiActions } from "../../store/ui/ui-slice"
import Player from "../Player/Player"
import Preview from "./Preview"
import Drawer from "../UI/Drawer/Drawer"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
   const dispatch = useDispatch()
   const showSideBar = useSelector((state) => state.ui.isShowSideBar)
   const showPreview = useSelector((state) => state.ui.isShowPreview)

   useEffect(() => {
      setTimeout(() => dispatch(UiActions.togglePreview()), 2500)
   }, [dispatch])

   const handleToggleSideBar = () => {
      dispatch(UiActions.togglePreview())
      dispatch(UiActions.toggleSideBar())
   }

   return (
      <>
         <Preview show={showPreview} onShowSidebar={handleToggleSideBar} />
         <Drawer show={showSideBar} classes={styles.sidebar} onHide={handleToggleSideBar}>
            <Player />
         </Drawer>
      </>
   )
}

export default React.memo(Sidebar)
