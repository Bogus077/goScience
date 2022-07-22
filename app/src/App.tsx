import React from 'react';
import './assets/fonts/style.css';
import './assets/global.scss';

import { Provider } from 'react-redux';
import { createStore } from './redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ProtectedRoutes } from './utils/router/ProtectedRoutes';
import { StudyPage, LoginPage } from './pages';

const store = createStore(); // Possible additional params to store init func
const persistor = persistStore(store);

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path={'/login'} element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path={'/'} element={<StudyPage />} />
              <Route path={'/plan'} element={<StudyPage />} />
              <Route path={'/plan/:pageSlug'} element={<StudyPage />} />
              <Route path={'/room'} element={<></>} />
              <Route path={'/room/:roomId'} element={<></>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
