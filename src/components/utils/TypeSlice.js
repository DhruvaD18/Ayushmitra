import { createSlice } from "@reduxjs/toolkit";

const TypeSlice = createSlice({
    name:'type',
    initialState:{value:null},
    reducers:{
        setType:(state,action)=>{
            state.value = action.payload
        },
        clearType:(state)=>{
            state.value = null
        },
    },
})

export const {setType,clearType} = TypeSlice.actions
export default TypeSlice.reducer
