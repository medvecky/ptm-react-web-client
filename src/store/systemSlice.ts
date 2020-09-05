import {createSlice} from '@reduxjs/toolkit';

export const systemSlice = createSlice(
    {
        name: 'system',
        initialState: {
            error: "",
            token: "",
            isChangedFlag: false
        },
        reducers: {
            clearError: state => {
                state.error = '';
            },

            clearToken: state => {
                state.token = '';
            },

            setToken: (state, action) => {
                state.token = action.payload;
            },

            setError: (state, action) => {
                state.error = action.payload;
            },

            setChangedFlag: state => {
                state.isChangedFlag = !state.isChangedFlag;
            }
        }
    }
);

export const {clearError, setError, clearToken, setToken, setChangedFlag} = systemSlice.actions;

// @ts-ignore
export const selectSystemError = state => state.system.error;
// @ts-ignore
export const selectSystemToken = state => state.system.token;

// @ts-ignore
export const selectSystemIsChanged = state => state.system.isChangedFlag;

export default systemSlice.reducer;
