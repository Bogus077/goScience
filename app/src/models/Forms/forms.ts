import { ChangeEventHandler } from 'react';

export type InputTypes = {
  onChange: () => void;
};

export type SelectTypes = {
  options: string[] | number[];
  optionValues: string[] | number[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
