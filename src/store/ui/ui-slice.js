import { createSlice } from "@reduxjs/toolkit"

const UiSlice = createSlice({
   name: "UI",
   initialState: {
      isLoading: false,
      notification: null,
      isShowSideBar: false,
      isShowPreview: false,
      isHoverOn: false,
   },
   reducers: {
      setLoadingState(state, action) {
         if (!action.payload) {
            state.isLoading = !state.isLoading
         } else {
            const switcher = action.payload
            if (!typeof switcher === "boolean") return
            state.isLoading = switcher
         }
      },
      showNotification(state, action) {
         const data = action.payload
         state.notification = { status: data.status, title: data.title, message: data.message }
      },
      toggleSideBar(state) {
         state.isShowSideBar = !state.isShowSideBar
      },
      togglePreview(state) {
         state.isShowPreview = !state.isShowPreview
      },
      onHover(state, action) {
         const switcher = action.payload
         if (!typeof switcher === "boolean") return
         state.isHoverOn = switcher
      },
   },
})

export const UiActions = UiSlice.actions
export default UiSlice
