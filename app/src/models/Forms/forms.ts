export type InputTypes = {
  onChange: () => void;
};

export type SelectTypes = InputTypes & {
  options: string[] | number[];
  optionValues: string[] | number[];
};
