import { baseUrl } from "../api"
import { UiActions } from "../ui/ui-slice"
import { AppActions } from "./app-features-slice"

export const loadAudioData = () => {
   return async (dispatch) => {
      const fetchData = async () => {
         const response = await fetch(`${baseUrl}/songs`)

         if (!response.ok) throw new Error("Can not load songs!")

         return await response.json()
      }
      /*=============================================*/
      try {
         const songs = await fetchData()
         await dispatch(AppActions.loadSongs(songs))
      } catch (error) {
         dispatch(
            UiActions.showNotification({
               status: "error",
               title: "Error!",
               message: error.message,
            })
         )
      }
      /*=============================================*/
   }
}

const STORAGE_KEY = "HOTARU'S APP 131197"

export const loadStorage = () => {
   return (dispatch) => {
      const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
      dispatch(AppActions.loadConfigs(storage))
   }
}

export const saveConfigs = (configs) => {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(configs))
}

export const resetConfigs = () => {
   localStorage.removeItem(STORAGE_KEY)
   return (dispatch) => dispatch(AppActions.resetConfigs())
}
