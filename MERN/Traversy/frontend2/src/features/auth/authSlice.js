import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from local storage if any
const user = JSON.parse(localStorage.getItem('user'))

//Variables to store in the global scope
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Asnc functions to be attached to the reducer
/*
//Note that with the use of *createAsyncThunk*, it attaches three
//stage functions to our async function, which are *pending, fulfilled, and refected*
The createAsyncThunck, accepts two common variables
* First - actionTypePrefix - This is a string, that denotes the path the three actions follow
    i.e if the actionTypePrefix is *auth/register*, the three action paths will be
    1. auth/register/pending
    2. auth/register/fulfilled
    3. auth/register/rejected

* Second - The async function which can accept no variable or a common of two, the *payload* and the *thunkAPI*
    thunkAPI
*/

//Register function
export const register = createAsyncThunk(
    'auth/register',
    //fetch code
    /*
    async(user, thunkAPI) =>{
        const res = await authService.register(user)
        if (res.ok){
            return res.data
        } else{
            return thunkAPI.rejectWithValue(res.data.message)
        }
    }
    */
    // /*
    // axios code
    async (user, thunkAPI) =>{
        try {
            return await authService.register(user)
        } catch (error) {
            // console.log(error)
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            // console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
    // */
)

//Login
/*
export const login = createAsyncThunk(
    'auth/login', async(user, thunkAPI)=>{
        try {
            return await authService.login()
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
*/

export const logout = createAsyncThunk(
    'auth/logout', authService.logout()
)

//Creating the reducer
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(register.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            /*
            .addCase(login.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            */
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer