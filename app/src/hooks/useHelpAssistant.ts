import { useState } from 'react';

export const ASSISTANT_TYPE = {
  tasks: 'tasks',
  marks: 'marks',
};

export type ParamsType = {
  KidId?: string;
};

export const useHelpAssistant = ({
  type,
  params,
}: {
  type: keyof typeof ASSISTANT_TYPE;
  params?: ParamsType;
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getHelpAssistant = () => {
    setLoading(true); // Включаем индикатор загрузки
    setMessages([]); // Очищаем предыдущие сообщения

    const eventSource = new EventSource(
      `https://api.kk-a.ru/helper/${type}?${new URLSearchParams(params)}`,
      {
        withCredentials: true, // Для отправки кук
      }
    );

    // Обрабатываем открытие соединения
    // eventSource.onopen = () => {
    // console.log('Соединение с SSE установлено');
    // };

    // Обрабатываем ошибки соединения
    eventSource.onerror = (error) => {
      console.error('Ошибка при подключении к SSE:', error);
      setLoading(false); // Выключаем индикатор загрузки при ошибке
      eventSource.close();
    };

    // Обрабатываем поступающие сообщения
    eventSource.onmessage = (event) => {
      // console.log('Новое сообщение:', event.data);
      const parsedData = JSON.parse(event.data);

      // Закрываем соединение, если получили сообщение об окончании
      if (parsedData.value === 'DONE') {
        // console.log('Поток завершен');
        setLoading(false); // Выключаем индикатор загрузки
        eventSource.close(); // Закрываем соединение
      } else {
        // Обновляем состояние сообщений
        setMessages((prevMessages) => [...prevMessages, parsedData.value]);
      }
    };
  };

  return { messages, loading, getHelpAssistant };
};
