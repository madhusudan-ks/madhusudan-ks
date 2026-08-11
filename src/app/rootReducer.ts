import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import { api } from "../services/api";

const rootReducer = combineReducers({
  app: appReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
