import React from 'react';
import { IconTypes } from '../../../../models/Icons/IconModels';

export const IconStudy = ({ active = false }: IconTypes) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.61719 7.32422C-0.111328 10.6758 0.117188 10.5645 0.0234375 11.0391C0.00585938 11.1562 0.00585938 11.3438 0.0234375 11.4609C0.111328 11.9004 0.246094 11.9824 3.01758 13.1777L5.5957 14.291L5.625 17.5605L5.6543 20.8301L5.81836 21.2988C6.49219 23.2031 8.64844 24.7441 11.5605 25.3945C12.8672 25.6875 13.4004 25.7461 15 25.7461C16.5996 25.7461 17.1328 25.6875 18.4395 25.3945C21.3516 24.7441 23.5137 23.2031 24.1816 21.2988L24.3457 20.8301L24.3633 17.5723L24.3809 14.3086L24.832 14.1094L25.2832 13.9043L25.3125 19.0781C25.3418 24.1875 25.3418 24.252 25.4648 24.4102C25.6934 24.7207 25.8809 24.8145 26.25 24.8145C26.6191 24.8145 26.8066 24.7207 27.0352 24.4102C27.1582 24.252 27.1582 24.1992 27.1758 18.668L27.1875 13.0898L28.3945 12.5625C29.6953 12 29.9004 11.8594 29.9766 11.4551C29.9941 11.3438 29.9941 11.1562 29.9766 11.0391C29.8828 10.5586 30.1113 10.6699 22.4414 7.34766C17.502 5.20898 15.2402 4.25391 15.0586 4.23633C14.8184 4.21875 14.2207 4.46484 7.61719 7.32422ZM20.8711 8.71289C24.0527 10.0957 26.6602 11.2324 26.6602 11.25C26.6602 11.2676 26.4609 11.3613 26.2148 11.4668L25.7754 11.6543L20.4023 10.9805C17.4492 10.6055 14.9414 10.3184 14.8359 10.3359C14.5664 10.377 14.2441 10.6348 14.1387 10.8926C13.957 11.3262 14.1914 11.9297 14.6133 12.0996C14.7129 12.1406 16.4414 12.375 18.457 12.6211C20.4727 12.873 22.166 13.0898 22.2188 13.1133C22.2891 13.1426 21.1465 13.6582 18.7617 14.6953C16.8047 15.5391 15.1465 16.248 15.0762 16.2656C14.9941 16.2891 13.3008 15.5801 9.92578 14.1211C3.47461 11.3262 3.43359 11.3086 3.38672 11.2617C3.3457 11.2207 14.8477 6.2168 14.9941 6.21094C15.041 6.21094 17.6836 7.33594 20.8711 8.71289ZM11.3613 16.7871C14.4844 18.1406 14.8652 18.293 15.082 18.2637C15.2109 18.2461 16.8516 17.5723 18.7207 16.7578C20.5898 15.9492 22.207 15.2461 22.3125 15.2051L22.5059 15.123L22.4883 17.8594L22.4707 20.5957L22.2832 20.9824C21.457 22.6641 18.3574 23.9062 15 23.9062C11.6426 23.9062 8.54297 22.6641 7.7168 20.9824L7.5293 20.5957L7.51172 17.8535L7.49414 15.1113L7.6875 15.1934C7.79297 15.2402 9.44531 15.9551 11.3613 16.7871Z"
        fill={active ? '#fff' : '#333333'}
      />
      <line
        x1="26.5"
        y1="13.5"
        x2="26.5"
        y2="23.5"
        stroke={active ? '#fff' : '#ff6633'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="14.6714"
        y1="10.6937"
        x2="25.5896"
        y2="12.0327"
        stroke={active ? '#fff' : '#ff6633'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};