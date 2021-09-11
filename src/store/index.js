import { configureStore } from "@reduxjs/toolkit"
import UiSlice from "./ui/ui-slice"
import AppFeaturesSlice from "./app-features/app-features-slice"

export const store = configureStore({
   reducer: { ui: UiSlice.reducer, appFeatures: AppFeaturesSlice.reducer },
})
