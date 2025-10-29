export type AuthSliceType = {
  email: string;
  password: string;
  name?: string;
  bio?: string;
  image?: string;

  setField: (field: keyof AuthSliceType, value: string) => void;
  resetAuthForm: () => void;
};
