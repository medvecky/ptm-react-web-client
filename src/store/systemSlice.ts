import {createSlice} from '@reduxjs/toolkit';

export const systemSlice = createSlice(
    {
        name: 'system',
        initialState: {
            error: "",
            isChangedFlag: false
        },
        reducers: {
            clearError: state => {
                state.error = '';
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

export const {clearError, setError, setChangedFlag} = systemSlice.actions;

// @ts-ignore
export const selectSystemError = state => state.system.error;

// @ts-ignore
export const selectSystemIsChanged = state => state.system.isChangedFlag;

export default systemSlice.reducer;
