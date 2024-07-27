import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {jwtDecode} from 'jwt-decode';
export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async ({ email, password, isGoogleAccount }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/signin", { email, password, isGoogleAccount });
            const { data, status } = response;

            if (status === 200) {
                localStorage.setItem('user', JSON.stringify(data));
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ fullname, email, password, isGoogleAccount, avatarGoogle }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/signup", {fullname, email, password, isGoogleAccount, avatarGoogle});
            const { data, status } = response;

            if (status === 200) {
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        }catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/reset-password", { email });
            const { data, status } = response;
            if (status === 200) {
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const resetPasswordComplete = createAsyncThunk(
    'auth/resetPasswordComplete',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/${userId}/reset/${token}`);
            const { data, status } = response;

            if (status === 200) {
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({newPassword, userId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/changePassword', {newPassword, userId, token})
            const { data, status } = response;
            if (status === 200) {
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const verifyUserSession = createAsyncThunk(
    'auth/verifyUserSession',
    async ({token}, {rejectWithValue}) => {
        try {
            const {data, status} = await axios.get('/verifyUserSession',{
                headers : {
                    Authorization:`Bearer ${token}`
                }
            });
            if (status === 200) {
                return data;
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)



const initialState = {
    user: null,
    error: null,
    message: null,
    token:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            try {
                const userString = localStorage.getItem('user');
                if (userString) {
                    state.token = JSON.parse(userString).token
                    state.user = jwtDecode(state.token);
                }
            } catch (error) {
                console.error('Error decoding token from localStorage', error);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.user = jwtDecode(action.payload.token);
                state.token = action.payload.token;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(resetPasswordComplete.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(resetPasswordComplete.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload.message;
            })
            .addCase(verifyUserSession.fulfilled, (state, action) => {
                state.user = jwtDecode(action.payload.token);
                state.token = action.payload.token;
            })
            .addCase(verifyUserSession.rejected, (state, action) => {
                localStorage.removeItem('user')
                state.user = null;
                state.token = null;
                state.error = action.payload.message;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

