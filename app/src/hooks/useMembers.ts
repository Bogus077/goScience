import { useTypedSelector } from './../redux/index';
import { useEffect, useRef, useState } from 'react';
// получаем класс IO
import { io } from 'socket.io-client';
import { ChangeMemberStatusRequest, Member } from '../models/members/members';
import { getRefreshToken, getToken } from '../redux/authSlice';

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = process.env.REACT_APP_API_WS ?? '';

// хук принимает название комнаты
export const useMembers = (roomId: string) => {
  // локальное состояние для пользователей
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState(false);

  // useRef() используется не только для получения доступа к DOM-элементам,
  // но и для хранения любых мутирующих значений в течение всего жизненного цикла компонента
  const socketRef = useRef<any>(null);
  const token = useTypedSelector(getToken);
  const refreshToken = useTypedSelector(getRefreshToken);

  useEffect(() => {
    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
      auth: { token, refreshToken },
    });

    socketRef.current.on('connect', () => {
      setStatus(true);
    });

    socketRef.current.on('disconnect', () => {
      setStatus(false);
    });

    // отправляем запрос на получение списка кадет
    socketRef.current.emit('members:get');

    // обрабатываем получение списка кадет
    socketRef.current.on('members', (members: Member[]) => {
      // обновляем массив кадет
      setMembers(members);
    });

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect();
    };
  }, [refreshToken, roomId, token]);

  const changeMemberStatus = (data: ChangeMemberStatusRequest) => {
    socketRef.current.emit('members:status', data);
  };

  return { members, status, changeMemberStatus };
};
