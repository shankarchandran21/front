import { createSlice } from "@reduxjs/toolkit";
const savedThreads = JSON.parse(localStorage.getItem("task") ?? "null") || {};
const initialState = savedThreads || {
    idToken: "",
    uid: "",
    displayName: "",
    photoURL: "",
    email: "",
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userAuth: (state, { payload }) => {
            state.idToken = payload._id;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            localStorage.setItem("task", JSON.stringify(state));
        },
        logoutUserAuth: (state) => {
            state.idToken = "",
                state.uid = "",
                state.email = "",
                state.displayName = "",
                state.photoURL = "",
                localStorage.removeItem("task");
        }
    }
});
export const { userAuth, logoutUserAuth } = authSlice.actions;
export default authSlice.reducer;
