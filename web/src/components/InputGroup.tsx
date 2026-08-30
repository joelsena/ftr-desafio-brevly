import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  prefix?: string;
};

export function InputGroup({
  label,
  className,
  error,
  prefix,
  placeholder,
  ...props
}: InputProps) {
  return (
    <label className="group flex flex-col gap-2" data-error={!!error}>
      <small className="text-xs text-gray-500 uppercase group-focus-within:text-blue-base group-data-[error=true]:text-danger">
        {label}
      </small>
      <div
        className={twMerge(
          "border border-gray-300 rounded-lg px-4 py-3 text-md font-normal",
          "group-data-[error=true]:border-danger group-focus-within:border-blue-base focus:outline-none focus-visible:outline-none",
          className,
        )}
      >
        <span className="text-gray-400">{prefix}</span>
        <input
          className="text-gray-600 outline-none placeholder-gray-400"
          placeholder={prefix ? "" : placeholder}
          {...props}
        />
      </div>

      {error && (
        <span className="flex items-center">
          <WarningIcon size={16} className="text-danger mr-2" />
          <p className="text-sm text-gray-500 font-normal">{error}</p>
        </span>
      )}
    </label>
  );
}
