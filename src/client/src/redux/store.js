import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {statusReducer} from "./reducers/status.reducer";
const rootReducer = combineReducers({
    status: statusReducer,
});
export const store = configureStore({
    reducer: rootReducer,
});