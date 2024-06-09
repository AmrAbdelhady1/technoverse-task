import { UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  register: UseFormRegister<any>;
  placeholder: string;
}

const InputField = ({ name, register, placeholder }: Props) => {
  return (
    <input
      type="text"
      className="bg-white py-3 px-4 rounded-lg focus:outline-none border w-full focus:right-2 focus:ring-primary focus:border-none"
      placeholder={placeholder}
      {...register(name, {
        required: true,
      })}
    />
  );
};

export default InputField;
