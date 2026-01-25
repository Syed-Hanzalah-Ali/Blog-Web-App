import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth.Slice";

export default configureStore({
  reducer:{
    auth:authReducer
  }
})

