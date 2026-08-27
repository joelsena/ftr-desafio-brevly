import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",

  variants: {
    variant: {
      primary:
        "text-md rounded-lg bg-blue-base px-5 py-4 text-center text-white hover:bg-blue-dark",
      secondary:
        "text-sm rounded-sm px-2 py-1 bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  );
}
