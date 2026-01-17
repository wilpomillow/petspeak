"use client"

import { cn } from "@/lib/cn"

export function IconButton({
  label,
  onClick,
  children,
  disabled = false
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl border transition",
        "border-[#d7c3aa]/70 bg-white/60 text-[#6b5640] backdrop-blur-md shadow-soft",
        "hover:border-[#c9ad8a] hover:bg-white/75 active:scale-[0.98]",
        "disabled:opacity-50 disabled:hover:bg-white/60 disabled:active:scale-100"
      )}
    >
      {children}
    </button>
  )
}
