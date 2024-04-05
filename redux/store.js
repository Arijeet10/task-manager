
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/taskSlice";

export const store=configureStore({
    reducer
})






