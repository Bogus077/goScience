import React, { useState } from 'react';
import { IconStar } from '../../Icons/IconStar';
import styles from './Stars.module.scss';

type StarsTypes = {
  mark: number;
  setMark: React.Dispatch<React.SetStateAction<number>>;
  markText: string[];
};

export const Stars = ({ mark, setMark, markText }: StarsTypes) => {
  const [hover, setHover] = useState(0);

  const handleHover = (star: number) => {
    setHover(star);
  };

  return (
    <div className={styles.stars} onMouseLeave={() => handleHover(0)}>
      <div
        className={styles.star}
        onMouseEnter={() => handleHover(1)}
        onClick={() => setMark(1)}
      >
        <IconStar active={hover === 0 ? mark > 0 : hover > 0} />
      </div>
      <div
        className={styles.star}
        onMouseEnter={() => handleHover(2)}
        onClick={() => setMark(2)}
      >
        <IconStar active={hover === 0 ? mark > 1 : hover > 1} />
      </div>
      <div
        className={styles.star}
        onMouseEnter={() => handleHover(3)}
        onClick={() => setMark(3)}
      >
        <IconStar active={hover === 0 ? mark > 2 : hover > 2} />
      </div>
      <div
        className={styles.star}
        onMouseEnter={() => handleHover(4)}
        onClick={() => setMark(4)}
      >
        <IconStar active={hover === 0 ? mark > 3 : hover > 3} />
      </div>
      <div
        className={styles.star}
        onMouseEnter={() => handleHover(5)}
        onClick={() => setMark(5)}
      >
        <IconStar active={hover === 0 ? mark > 4 : hover > 4} />
      </div>

      <div className={styles.descr}>
        {markText[hover === 0 ? mark - 1 : hover - 1]}
      </div>
    </div>
  );
};
