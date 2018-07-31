interface IInput {
  meta: any;
  errorStyle?: object;
  name?: string;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string | ReactNode;
  type?: string;
  disabled?: boolean;
  label?: string;
  [x: string]: any;
}

interface IPasswordInput extends IInput {
  allowShowPassword?: boolean;
}

interface ISubmitFormError {
  error: boolean;
  errorString: string;
}

interface ISelectOption {
  label: string;
  value: string | number;
}
