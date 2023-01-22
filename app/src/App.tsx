import React from 'react';
import './assets/fonts/style.css';
import './assets/global.scss';

import { Provider } from 'react-redux';
import { createStore } from './redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ProtectedRoutes } from './utils/router/ProtectedRoutes';
import {
  StudyPage,
  LoginPage,
  ClassSettingsPage,
  RegistrationPage,
  CreateTaskPage,
  TeamPage,
  CreateTeamPage,
  CreateProjectPage,
  UpdateProjectPage,
  CreateProjectTaskPage,
  KidWeekSummaryPage,
  MotivationPage,
  MembersPage,
  AdminMainPage,
  AdminAddMemberPage,
  AdminEditMemberPage,
  AdminLogsPage,
  NotificationsPage,
  AdminAddNotificationPage,
} from './pages';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { frontendRoutes } from './utils/router/routes';
import { CreateKidPage } from './pages/Kid/CreateKid';
import { UpdateTeamPage } from './pages/Plan/UpdateTeamPage/UpdateTeamPage';
import { UpdateProjectTaskPage } from './pages/Plan/UpdateProjectTaskPage/UpdateProjectTaskPage';
import { AdminProtectedRoutes } from './utils/router/AdminProtectedRoutes';
import { AdminMembersPage } from './pages/Admin/AdminMembersPage';
import { ru } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

const store = createStore(); // Possible additional params to store init func
const persistor = persistStore(store);

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <BrowserRouter>
            <Routes>
              <Route path={frontendRoutes.user.login} element={<LoginPage />} />
              <Route
                path={frontendRoutes.user.registration}
                element={<RegistrationPage />}
              />
              <Route
                path={frontendRoutes.kidWeekStats}
                element={<KidWeekSummaryPage />}
              />

              <Route element={<ProtectedRoutes />}>
                {/* Study */}
                <Route
                  path={frontendRoutes.dashboard}
                  element={<StudyPage />}
                />
                <Route
                  path={frontendRoutes.plan.index}
                  element={<StudyPage />}
                />
                <Route
                  path={frontendRoutes.tasks.add}
                  element={<CreateTaskPage />}
                />
                <Route
                  path={`${frontendRoutes.plan.index}/:pageSlug`}
                  element={<StudyPage />}
                />

                <Route
                  path={frontendRoutes.settings.class}
                  element={<ClassSettingsPage />}
                />

                <Route
                  path={frontendRoutes.kid.add}
                  element={<CreateKidPage />}
                />

                {/* Motivation */}
                <Route
                  path={frontendRoutes.plan.motivation}
                  element={<MotivationPage />}
                />

                {/* Team */}
                <Route path={frontendRoutes.plan.team} element={<TeamPage />} />
                <Route
                  path={frontendRoutes.plan.createTeam}
                  element={<CreateTeamPage />}
                />
                <Route
                  path={`${frontendRoutes.plan.updateTeam}/:teamId`}
                  element={<UpdateTeamPage />}
                />

                <Route
                  path={frontendRoutes.project.add}
                  element={<CreateProjectPage />}
                />
                <Route
                  path={`${frontendRoutes.project.edit}/:projectId`}
                  element={<UpdateProjectPage />}
                />

                <Route
                  path={frontendRoutes.project.addTask}
                  element={<CreateProjectTaskPage />}
                />
                <Route
                  path={`${frontendRoutes.project.editTask}/:taskId`}
                  element={<UpdateProjectTaskPage />}
                />

                {/* Members */}
                <Route
                  path={`${frontendRoutes.members}/:version`}
                  element={<MembersPage />}
                />
                <Route
                  path={frontendRoutes.members}
                  element={<MembersPage />}
                />
              </Route>

              {/* AdminPanel */}
              <Route element={<AdminProtectedRoutes />}>
                <Route
                  path={frontendRoutes.admin.mainPage}
                  element={<AdminMainPage />}
                />
                <Route
                  path={frontendRoutes.admin.members}
                  element={<AdminMembersPage />}
                />
                <Route
                  path={frontendRoutes.admin.addMember}
                  element={<AdminAddMemberPage />}
                />
                <Route
                  path={`${frontendRoutes.admin.editMember}/:id`}
                  element={<AdminEditMemberPage />}
                />
                <Route
                  path={frontendRoutes.admin.logs}
                  element={<AdminLogsPage />}
                />
                <Route
                  path={frontendRoutes.admin.notifications}
                  element={<NotificationsPage />}
                />
                <Route
                  path={frontendRoutes.admin.addNotification}
                  element={<AdminAddNotificationPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}
