import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Input({
  title,
  name,
  type,
  register,
  errors,
  placeholder,
  min,
  max,
  notReq,
  background = "bg-gray-50",
  autoComplete = "on",
  disabled = false,
  global = null,
  setGlobal,
  key = 0,
}) {
  const [toggle, setToggle] = useState(null);
  return (
    <div key={key}>
      <div
        className={`${
          errors ? "border-red-600 " : "border-gray-300 "
        } relative rounded-md border p-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600`}
      >
        {title && (
          <label
            htmlFor={name}
            className={`absolute -top-2 left-2 -mt-px inline-block ${background} px-1 text-xs font-medium ${
              errors ? "text-red-600" : "text-gray-900 "
            }  `}
          >
            {title}
          </label>
        )}
        <input
          id={name}
          type={
            typeof setGlobal === "function" ? global || type : toggle || type
          }
          placeholder={placeholder}
          minLength={min}
          autoComplete={autoComplete}
          maxLength={max}
          disabled={disabled}
          className={`${background} block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0  focus:outline-none sm:text-sm`}
          {...register(name, {
            required: notReq ? false : `Please enter a ${name}`,
          })}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setToggle((current) => (current ? null : "text"));
              if (typeof setGlobal === "function")
                setGlobal((current) => (current ? null : "text"));
            }}
            className="absolute top-2 right-6 text-gray-500 hover:text-gray-700"
          >
            {(typeof setGlobal === "function" ? global : toggle) ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {errors && <p className="mt-2 text-xs text-red-600">{errors.message}</p>}
    </div>
  );
}
