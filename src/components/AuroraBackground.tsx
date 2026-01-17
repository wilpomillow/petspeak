"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/cn"

/**
 * Aurora-like animated background inspired by the "Aurora" style backgrounds on reactbits.dev.
 * Implemented locally (no external component pull) to keep dependency surface minimal.
 */
export default function AuroraBackground({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#f3e2c9]/70 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#e8d2b3]/55 blur-3xl"
          animate={{ x: [0, -90, 0], y: [0, 60, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[55%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#fff7ea]/55 blur-3xl"
          animate={{ y: [0, -50, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.35),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(43,36,29,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,36,29,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
