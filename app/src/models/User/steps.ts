export type UserStep = {
  title: string;
  description: string;
  link?: {
    title: string;
    url: string;
  };
  img?: string;
  buttons: {
    nextButton: {
      available: boolean;
      handleClick?: () => void;
      title: string;
      isLoading?: boolean;
    };
    prevButton: {
      handleClick?: () => void;
      title: string;
    };
  };
  errors?: string[];
};
