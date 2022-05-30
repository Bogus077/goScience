import { createSlice } from '@reduxjs/toolkit';
// import { logIn, signUp } from './thunks';

export type InitialState = {
  loading: boolean;
};

const initialState: InitialState = {
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // clearErrors: (state) => {
    //   state.error = undefined;
    // },
    // makeWelcomeDialogDone: (state) => {
    //   state.dialogsQueue = state.dialogsQueue?.filter(
    //     (item) => item !== 'welcomeDialog'
    //   );
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(signUp.pending, (state) => {
    //   state.loading = true;
    //   state.error = undefined;
    // });
    // builder.addCase(signUp.fulfilled, (state, { payload }) => {
    //   state.user = payload;
    //   state.loading = false;
    // });
    // builder.addCase(signUp.rejected, (state, { payload }) => {
    //   state.error = payload?.errorMessage;
    //   state.loading = false;
    // });
  },
});

export const { reducer: userReducer } = userSlice;
// export const { clearErrors, makeWelcomeDialogDone } = userSlice.actions;
export * from './thunks';
export * from './selectors';
