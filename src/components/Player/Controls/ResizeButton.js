import { useDispatch, useSelector } from "react-redux"
import { AppActions } from "../../../store/app-features/app-features-slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../UI/Button"
import styles from "./ResizeButton.module.css"

const ResizeButton = () => {
   const dispatch = useDispatch()
   const isExpanded = useSelector((state) => state.appFeatures.isShowCDThumb)

   const handleToggleExpanding = () => dispatch(AppActions.toggleExpanding())

   return (
      <Button className={styles["btn-resize"]} onClick={handleToggleExpanding}>
         {!isExpanded && <FontAwesomeIcon icon={["fas", "angle-up"]} size="2x" />}
         {isExpanded && <FontAwesomeIcon icon={["fas", "angle-down"]} size="2x" />}
      </Button>
   )
}

export default ResizeButton
