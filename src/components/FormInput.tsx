import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  readOnly?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  onBlur,
  value,
  readOnly,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        onBlur={onBlur}
        value={value}
        readOnly={readOnly}
        className="w-full border rounded p-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
