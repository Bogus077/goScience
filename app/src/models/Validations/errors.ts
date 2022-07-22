export const VALIDATION_ERRORS = {
  REQUIRED: 'Обязательное поле не заполнено',

  SERVER: {
    UNTYPED_ERROR: 'Ошибка сервера',
  },

  PASSWORD: {
    WRONG: 'Неправильный пароль',
    INCORRECT: 'Неверный пароль',
    SHORT: 'Пароль не может быть короче 6 символов',
    NOT_EQUAL: 'Пароли не совпадают',
  },

  PHONE: {
    INCORRECT: 'Некорретный формат телефона',
    IS_NOT_EXISTS: 'Номер телефона не зарегистрирован',
    IS_ALREADY_EXISTS: 'Номер телефона уже зарегистрирован',
  },
};
