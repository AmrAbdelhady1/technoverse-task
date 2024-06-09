import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  placeholder: string;
  error: FieldError | undefined;
}

const InputField = ({ name, register, placeholder, label, error }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500 font-medium">{label}</p>

      <input
        type="text"
        className="bg-white py-3 px-4 rounded-lg focus:outline-none border w-full focus:ring-2 focus:ring-primary focus:border-transparent ring-inset"
        placeholder={placeholder}
        {...register(name, {
          required: true,
        })}
      />

      {error && <p className="text-red-500">{label} is required</p>}
    </div>
  );
};

export default InputField;
