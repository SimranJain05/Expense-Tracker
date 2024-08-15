import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading.slice.js";
import errorReducer from "./slices/error.slice.js";
import successReducer from "./slices/success.slice.js";
import userReducer from "./slices/user.slice.js";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
    success: successReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
