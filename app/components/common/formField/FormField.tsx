"use client";

import { Field, ErrorMessage } from "formik";

const inputBaseClass =
  "rounded-lg border w-full border-neutral-300 bg-white px-4 py-2 text-foreground placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-600 dark:bg-neutral-900 dark:placeholder:text-neutral-500";

const labelClass = "text-sm font-medium text-foreground";
const errorClass = "text-sm text-red-500 dark:text-red-400";

export interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  as?: "input" | "textarea";
  rows?: number;
  id?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function FormField({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  rows,
  id,
  className = inputBaseClass,
  labelClassName = labelClass,
  errorClassName = errorClass,
}: FormFieldProps) {
  const fieldId = id ?? `field-${name}`;

  return (
    <div className="flex items-start flex-col gap-1 relative">
      <label htmlFor={fieldId} className={labelClassName}>
        {label}
      </label>
      <Field
        id={fieldId}
        name={name}
        type={as === "textarea" ? undefined : type}
        as={as}
        rows={rows}
        placeholder={placeholder}
        className={className}
      />
      <span className={`absolute top-full inset-start-0 ${errorClassName}`}><ErrorMessage name={name} /></span>
    </div>
  );
}
