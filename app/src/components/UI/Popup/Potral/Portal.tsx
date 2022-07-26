import React, { ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PotralTypes = {
  children: ReactElement;
};

export const Portal = ({ children }: PotralTypes) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
