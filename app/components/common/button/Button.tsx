"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/app/components/common/spinner/Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    isLoading = false,
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled ?? isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        "inline-flex relative cursor-pointer items-center justify-center gap-2 font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="min-w-[1ch] opacity-0">{children}</span>
          <Spinner button white sm customClass="shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
