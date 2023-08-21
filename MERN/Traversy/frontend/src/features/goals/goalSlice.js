import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create goal function
export const createGoal = createAsyncThunk(
    'goals/create',
    async(goalData, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.user.token
            return await goalService.createGoal(goalData, token)
        }catch(error){
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//creating a reducer
export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action)=>{
            state.isSuccess = true
            state.isLoading =false
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer