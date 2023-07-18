export default function Checkbox({
  title,
  subtitle,
  name,
  register,
  errors,
  notReq,
}) {
  return (
    <div className="relative flex items-start my-3">
      <div className="flex h-5 items-center">
        <input
          name={title}
          type="checkbox"
          {...register(name, {
            required: notReq ? false : `Please enter a ${name}`,
          })}
          className={`h-4 w-4 rounded ${
            errors ? "border-red-600 " : "border-gray-300 "
          }  text-purple-600 focus:ring-indigo-500`}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {title}
        </label>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
