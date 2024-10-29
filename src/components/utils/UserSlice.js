import { createSlice } from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name:'user',
    initialState:{value:null},
    reducers:{
        setUser: (state, action) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = null;
        },
    },
})

export const {setUser,clearUser} = UserSlice.actions
export default UserSlice.reducer