import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { Controller } from "react-hook-form";

export default function TextArea({
  control,
  name,
  errors,
  placeholder,
  notReq,
  disabled = false,
  height = null,
  title,
}) {
  return (
    <Controller
      control={control}
      rules={{
        required: notReq ? false : `Please enter a ${name}`,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <div
          className={`${
            errors ? "border-red-600 " : "border-gray-300 "
          } w-full relative rounded-md border bg-white p-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600`}
        >
          {title && (
            <label
              htmlFor={name}
              className={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium ${
                errors ? "text-red-600" : "text-gray-900 "
              }  `}
            >
              {title}
            </label>
          )}
          <GrammarlyEditorPlugin clientId="client_NMyje7qaocxveAkUNbdV8P">
            <textarea
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              className={`bg-white block w-full border-0 p-0 ${height} text-gray-900 placeholder-gray-500 focus:ring-0  focus:outline-none sm:text-sm`}
            />
          </GrammarlyEditorPlugin>
        </div>
      )}
      name={name}
    ></Controller>
  );
}
