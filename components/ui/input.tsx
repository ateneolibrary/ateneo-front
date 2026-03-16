import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-white px-2.5 py-1 text-base text-black shadow-[0_1px_0_0_var(--border)] outline-none transition-[transform,box-shadow] duration-150 ease-out file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 focus-visible:translate-y-[1px] focus-visible:shadow-[0_4px_0_0_var(--active)] active:translate-y-[1px] active:shadow-[0_4px_0_0_var(--active)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[0_4px_0_0_var(--destructive)] dark:bg-white dark:text-black dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
