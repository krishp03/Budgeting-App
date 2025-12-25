import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string | null;
    isOnboarded: boolean;
}

const initialState: UserState = {
    name: null,
    isOnboarded: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.isOnboarded = true;
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        resetUser: (state) => {
            state.name = null;
            state.isOnboarded = false;
        },
    },
});

export const { setUserName, updateUserName, resetUser } = userSlice.actions;
export default userSlice.reducer;
