import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice'
import imageGenerationSlice from "./slices/imageGenerationSlice";
const store = configureStore({
    reducer: {
        auth:authSlice,
        imageGeneration:imageGenerationSlice
    }
});

export default store;