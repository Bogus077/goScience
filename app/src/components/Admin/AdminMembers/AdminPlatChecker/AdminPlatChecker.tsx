import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

type AdminPlatCheckerTypes = {
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newFormats: number[]
  ) => void;
  plats: number[];
};

export const AdminPlatChecker = ({
  onChange,
  plats,
}: AdminPlatCheckerTypes) => {
  return (
    <ToggleButtonGroup
      value={plats}
      onChange={onChange}
      aria-label="plats checker"
      color="primary"
    >
      <ToggleButton value={1} aria-label="1 взвод">
        1 взвод
      </ToggleButton>
      <ToggleButton value={2} aria-label="2 взвод">
        2 взвод
      </ToggleButton>
      <ToggleButton value={3} aria-label="3 взвод">
        3 взвод
      </ToggleButton>
      <ToggleButton value={4} aria-label="4 взвод">
        4 взвод
      </ToggleButton>
      <ToggleButton value={5} aria-label="Спортвзвод">
        Спортвзвод
      </ToggleButton>
      <ToggleButton value={[1, 2, 3, 4, 5]} aria-label="Все взвода">
        Все
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
