import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload
        },
        removeUser: (state) => {
            state.value = ""
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;