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

export type InputType = InputTypeFormik &
  stateHandler<string> & { onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; inputRef?: React.RefObject<HTMLInputElement> };

export type InputFormType = InputType & { valid: { error: string }; dirty: boolean };

export type SelectInputType = {
  options: Array<string>;
} & baseParams &
  stateHandler<string>;
