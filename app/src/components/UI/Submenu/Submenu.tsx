import React, { useEffect, useRef, useState } from 'react';
import styles from './Submenu.module.scss';

type SubmenuTypes = {
  links: {
    title: string;
    onClick: () => void;
  }[];
};

export const Submenu = ({ links }: SubmenuTypes) => {
  const [visible, setVisible] = useState(false);

  const linksRef = useRef(document.createElement('div'));

  useEffect(() => {
    //Обрабатываем клик вне компонента
    const onClick = (e: MouseEvent) => {
      if (!linksRef?.current?.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      className={styles.menu}
      ref={linksRef}
      onClick={() => setVisible(!visible)}
    >
      <div className={styles.menu__dots}>
        <div /> <div /> <div />
      </div>
      {visible && (
        <div className={styles.linkbox}>
          {links.map((link) => (
            <div
              className={styles.linkbox__link}
              onClick={link.onClick}
              key={link.title}
            >
              {link.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
