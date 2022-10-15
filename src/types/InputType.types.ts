type baseParams = {
  id: string;
  name: string;
  required: boolean;
};

type stateHandler<T> = { value: T; setValue: React.Dispatch<React.SetStateAction<T>> };

export type InputTypeFormik = {
  text: string;
  type: "password" | "email" | "text" | "tel";
} & baseParams;

export type InputType = InputTypeFormik & stateHandler<string> & { onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void };

export type InputFormType = Omit<InputType, "onBlur">;

export type SelectInputType = {
  options: Array<string>;
} & baseParams &
  stateHandler<string>;
