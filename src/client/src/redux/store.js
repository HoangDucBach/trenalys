import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {statusReducer} from "./reducers/status.reducer";
import {loadState, saveState} from "./actions/status.action";
const rootReducer = combineReducers({
    status: statusReducer,
});
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});
store.subscribe(() => {
    saveState(store.getState());
});