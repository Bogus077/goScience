import React from 'react';
import { IconTypes } from '../../../../models/Icons/IconModels';

export const IconProcess = ({ active = false }: IconTypes) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.5" cy="4.5" r="3.5" fill="#ff6633" />
      <circle cx="25.5" cy="15.5" r="3.5" fill="#ff6633" />
      <circle cx="4.5" cy="15.5" r="3.5" fill="#ff6633" />
      <circle cx="15.5" cy="25.5" r="3.5" fill="#ff6633" />
      <path
        d="M14.0977 0.09375C12.5332 0.439453 11.2266 1.61719 10.7812 3.06445C10.7109 3.29883 10.6348 3.5332 10.6113 3.5918C10.582 3.68555 10.2891 3.50391 8.64258 2.36719C6.82617 1.11328 6.69141 1.03125 6.4043 1.00781C6.16406 0.990234 6.05859 1.00781 5.88867 1.11328C5.52539 1.33594 5.48438 1.48828 5.46094 2.58984L5.4375 3.57422H3.97852C2.625 3.57422 2.49609 3.58594 2.28516 3.69141C2.02148 3.82617 1.81641 4.16016 1.81641 4.45312C1.81641 4.74609 2.02148 5.08008 2.28516 5.21484C2.49609 5.32031 2.625 5.33203 3.97852 5.33203H5.4375L5.46094 6.31055C5.48438 7.41211 5.52539 7.57031 5.87695 7.78711C6.11719 7.93359 6.49219 7.95117 6.73828 7.82227C6.83789 7.76953 7.73438 7.16602 8.73633 6.47461C9.74414 5.77734 10.5762 5.22656 10.5879 5.23828C10.6055 5.25 10.6523 5.41406 10.6992 5.60742C11.0039 6.78516 11.9121 7.88086 13.0312 8.43164C13.7461 8.7832 14.1445 8.87109 15 8.87109C15.8555 8.87109 16.2539 8.7832 16.9629 8.4375C17.8477 8.00391 18.5449 7.30664 18.9844 6.41602C19.1133 6.1582 19.248 5.80664 19.2832 5.63672L19.3535 5.33203H22.0137H24.668V7.98633V10.6465L24.3633 10.7168C23.6074 10.8867 22.6465 11.5137 22.0898 12.2051C21.7441 12.627 21.3633 13.377 21.2637 13.8105L21.1934 14.1211H15H8.80664L8.73633 13.8105C8.70117 13.6465 8.56641 13.2949 8.4375 13.0371C7.99805 12.1465 7.30078 11.4492 6.41602 11.0156C5.70703 10.6699 5.30859 10.582 4.45312 10.582C3.59766 10.582 3.19922 10.6699 2.49023 11.0156C1.34766 11.5781 0.474609 12.6445 0.134766 13.8867C-0.00585938 14.4141 -0.00585938 15.5859 0.134766 16.1133C0.380859 16.998 0.955078 17.8887 1.6582 18.457C2.08008 18.8027 2.83008 19.1836 3.26953 19.2832L3.57422 19.3535V22.541C3.57422 25.6172 3.58008 25.7344 3.69141 25.957C3.76758 26.1094 3.89062 26.2324 4.04297 26.3086C4.26562 26.4199 4.38281 26.4258 7.45898 26.4258H10.6465L10.7168 26.7305C10.8164 27.1699 11.1973 27.9199 11.543 28.3418C12.1113 29.0449 13.002 29.6191 13.8867 29.8652C14.4141 30.0059 15.5859 30.0059 16.1133 29.8652C16.998 29.6191 17.8887 29.0449 18.457 28.3418C18.8027 27.9199 19.1836 27.1699 19.2832 26.7363L19.3535 26.4258H21.9199H24.4863L24.5039 27.4746C24.5215 28.5059 24.5273 28.5293 24.668 28.6816C24.8789 28.9102 25.0957 29.0039 25.3887 29.0039C25.6348 29.0039 25.7812 28.916 27.7148 27.5859C29.4727 26.3789 29.7949 26.1328 29.8945 25.9336C30.0352 25.6582 30.0176 25.2832 29.8477 25.0488C29.7832 24.9668 28.8105 24.2637 27.6855 23.4902L25.6348 22.0781L25.2949 22.1016C24.9961 22.125 24.9258 22.1543 24.7383 22.3418L24.5215 22.5586L24.5039 23.6133L24.4863 24.668H21.9199H19.3535L19.2832 24.3633C19.248 24.1934 19.1133 23.8418 18.9844 23.584C18.5449 22.6934 17.8477 21.9961 16.9629 21.5625C16.2539 21.2168 15.8555 21.1289 15 21.1289C14.1445 21.1289 13.7461 21.2168 13.0371 21.5625C12.1523 21.9961 11.4551 22.6934 11.0156 23.584C10.8867 23.8418 10.752 24.1934 10.7168 24.3633L10.6465 24.668H7.98633H5.33203V22.0137V19.3535L5.64258 19.2832C6.39258 19.1133 7.35352 18.4863 7.91016 17.7949C8.25586 17.373 8.63672 16.623 8.73633 16.1836L8.80664 15.8789H15H21.1934L21.2637 16.1836C21.2988 16.3535 21.4336 16.7051 21.5625 16.9629C22.002 17.8535 22.6992 18.5508 23.584 18.9844C24.293 19.3301 24.6914 19.418 25.5469 19.418C26.4023 19.418 26.8008 19.3301 27.5098 18.9844C28.6523 18.4219 29.5254 17.3555 29.8652 16.1133C30.0059 15.5859 30.0059 14.4141 29.8652 13.8867C29.6191 13.002 29.0449 12.1113 28.3418 11.543C27.9199 11.1973 27.1699 10.8164 26.7363 10.7168L26.4258 10.6465V7.45898C26.4258 4.38281 26.4199 4.26562 26.3086 4.04297C26.2324 3.89062 26.1094 3.76758 25.957 3.69141C25.7344 3.58008 25.6172 3.57422 22.541 3.57422H19.3535L19.2832 3.26367C19.1836 2.83008 18.8027 2.08008 18.457 1.6582C17.8945 0.960938 16.998 0.375 16.1426 0.146484C15.627 0.00585938 14.5957 -0.0175781 14.0977 0.09375ZM15.6387 1.8457C16.1426 1.96875 16.5527 2.20898 16.9395 2.61914C17.5371 3.24609 17.7891 4.04883 17.6484 4.875C17.5488 5.44922 17.332 5.87695 16.9219 6.30469C16.3008 6.95508 15.4395 7.24805 14.5781 7.10156C14.0039 7.00195 13.5762 6.78516 13.1484 6.375C11.1738 4.48828 12.9785 1.21875 15.6387 1.8457ZM7.92188 3.99609C8.26758 4.23047 8.54883 4.43555 8.54883 4.45312C8.54883 4.48828 7.30078 5.33203 7.24805 5.33203C7.22461 5.33203 7.20703 4.93359 7.20703 4.45312C7.20703 3.9668 7.22461 3.57422 7.24805 3.57422C7.27148 3.57422 7.57031 3.76758 7.92188 3.99609ZM5.0918 12.3926C5.5957 12.5156 6.00586 12.7559 6.39258 13.166C6.99023 13.793 7.24219 14.5957 7.10156 15.4219C7.00195 15.9961 6.78516 16.4238 6.375 16.8516C5.75391 17.502 4.89258 17.7949 4.02539 17.6484C3.45703 17.5488 3.0293 17.332 2.60156 16.9219C0.626953 15.0352 2.43164 11.7656 5.0918 12.3926ZM26.1855 12.3926C26.6895 12.5156 27.0996 12.7559 27.4863 13.166C28.084 13.793 28.3359 14.5957 28.1953 15.4219C28.0957 15.9961 27.8789 16.4238 27.4688 16.8516C26.8477 17.502 25.9863 17.7949 25.125 17.6484C24.5508 17.5488 24.123 17.332 23.6953 16.9219C21.7207 15.0352 23.5254 11.7656 26.1855 12.3926ZM15.6387 22.9395C16.1426 23.0625 16.5527 23.3027 16.9395 23.7129C17.5371 24.3398 17.7891 25.1426 17.6484 25.9688C17.5488 26.543 17.332 26.9707 16.9219 27.3984C16.1191 28.2422 14.8652 28.4707 13.8398 27.9727C13.3828 27.75 12.832 27.2109 12.6094 26.7656C11.9766 25.5117 12.3809 24.0703 13.582 23.2676C14.1504 22.8926 14.918 22.7695 15.6387 22.9395ZM26.9414 25.1074C27.2695 25.3301 27.5391 25.5293 27.5391 25.5469C27.5391 25.5762 26.3965 26.373 26.2969 26.4141C26.2734 26.4258 26.25 26.0332 26.25 25.5469C26.25 25.0605 26.2734 24.668 26.2969 24.6797C26.3203 24.6855 26.6133 24.8789 26.9414 25.1074Z"
        fill={active ? '#fff' : '#333333'}
      />
    </svg>
  );
};