import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCurrentUser, loginNewUser, logoutCurrentUser, signupNewUser } from "./loginAPI"

const initialState = {
    currentUser: null,
    status: "idle",
    errors: null,
}

export const fetchCurrentUserAsync = createAsyncThunk(
    "auth/fetchCurrentUser",
    async () =>{
        const response = await fetchCurrentUser()
            return response
    }
)

export const loginNewUserAsync = createAsyncThunk(
    "auth/loginNewUser",
    async({ username, password }) => {
        const response = await loginNewUser( { username, password })
            return response
    }
)

export const logoutCurrentUserAsync = createAsyncThunk(
    "auth/logoutCurrentUser",
    async() => {
        const response = await logoutCurrentUser()
        return console.log(response)
    }
)

export const signupNewUserAsync = createAsyncThunk(
    "auth/signupNewUser",
    async({username, email, password, password_confirmation}) => {
        const response = await signupNewUser( { username, email, password, password_confirmation } )
        return response
    }
)

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginUser: (state, action) =>  { state.currentUser = action.payload
                                        state.errors = null 
                                        state.status = "idle"
        },
        logoutUser: (state) => {state.currentUser = null
                                state.errors = null
                                state.status = "idle"    },
        loginError: (state, action) => {state.errors = action.payload},
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginNewUserAsync.pending, (state) => {
            state.status = "Loading..."
        })
        .addCase(loginNewUserAsync.fulfilled, (state, action) => {
            if(action.payload?.error) { 
                state.currentUser = null
                state.errors = action.payload.error
                state.status = "error"
            } else{
                state.currentUser = action.payload.data.attributes
                state.errors = null
                state.status = "idle"}        
        })
        .addCase(loginNewUserAsync.rejected, (state, action) => {
                state.currentUser = null
                state.errors = action.payload.errors
                state.status = "error"
        })
        .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
            if(action.payload?.error) { 
                state.currentUser = null
                // state.errors = action.payload.error
                state.status = "idle"
            } else{
                state.currentUser = action.payload.data.attributes
                state.errors = null
                state.status = "idle"}        
        })
        .addCase(fetchCurrentUserAsync.rejected, (state, action) => {
                state.currentUser = null
                state.errors = action.payload.errors
                state.status = "error"
        })
        .addCase(logoutCurrentUserAsync.fulfilled, (state) =>{
                state.currentUser = null
                state.errors = null
                state.status = "idle"
        })
        .addCase(signupNewUserAsync.fulfilled, (state, action) =>{
            if(action.payload?.errors) { 
                state.currentUser = null
                state.errors = action.payload.errors
                state.status = "error"
            } else{
                state.currentUser = action.payload.data.attributes
                state.errors = null
                state.status = "idle"}
        })
        .addCase(signupNewUserAsync.rejected, (state, action) =>{
                state.currentUser = null
                state.errors = action.payload.errors
                state.status = "error"
        })
    }

    
})

export default loginSlice.reducer
export const { loginUser, logoutUser, loginError } = loginSlice.actions