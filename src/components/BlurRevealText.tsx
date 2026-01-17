"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/cn"

/**
 * Soft blur-to-sharp reveal inspired by React Bits "Blur Text" animations.
 */
export function BlurRevealText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("tracking-tight", className)}
    >
      {text}
    </motion.h1>
  )
}
