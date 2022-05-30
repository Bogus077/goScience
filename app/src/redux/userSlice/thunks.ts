import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes, GS_API } from '../../utils/api';

type defaultError = {
  errorMessage: string;
};

// export const signUp = createAsyncThunk<
//   User,
//   SignUpRequest,
//   { rejectValue: defaultError }
// >('user/signUp', async (request, { rejectWithValue }) => {
//   try {
//     const { data } = await GS_API.post(apiRoutes.signUp, request);
//     return data;
//   } catch ({ response: { data } }) {
//     return rejectWithValue(data as defaultError);
//   }
// });

// export const logIn = createAsyncThunk<
//   User,
//   LogInRequest,
//   { rejectValue: defaultError }
// >('user/login', async (request, { rejectWithValue }) => {
//   try {
//     const { data } = await GS_API.post(apiRoutes.logIn, request);
//     return data;
//   } catch ({ response: { data } }) {
//     return rejectWithValue(data as defaultError);
//   }
// });
