/**
 * Запрос на авторизацию
 */
export type AuthorizationRequest = {
  phone: string;
  password: string;
};

/**
 * Ответ авторизации (токен)
 */
export type AuthorizationResponse = {
  accessToken: string;
};

/**
 * Запрос на проверку существования номера телефона
 */
export type CheckPhoneRequest = {
  phone: string;
};

/**
 * Ответ на запрос проверки существования телефона
 */
export type CheckPhoneResponse = {
  phoneExist: string;
};
