import { createSlice } from "@reduxjs/toolkit";


const imageGenerationSlice = createSlice({
    name:"imageGeneration",
    initialState:{
        imageUrl: "",
        message: "",
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default imageGenerationSlice.reducer;