import type { SxProps, Theme } from '@mui/material/styles';

export type SxStyles = SxProps<Theme>;
export type SxStylesMap<Classnames extends string> = Record<
  Classnames,
  SxProps
>;
