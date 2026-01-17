"use client"

import Image from "next/image"
import { cn } from "@/lib/cn"

export type Animal =
  | "dog"
  | "cat"
  | "bird"
  | "fish"
  | "rabbit"
  | "guineaPig"
  | "hamster"
  | "ferret"
  | "chinchilla"
  | "snake"
  | "lizard"
  | "turtle"

export const ANIMALS: { key: Animal; label: string }[] = [
  { key: "dog", label: "Dog" },
  { key: "cat", label: "Cat" },
  { key: "bird", label: "Bird" },
  { key: "fish", label: "Fish" },
  { key: "rabbit", label: "Rabbit" },
  { key: "guineaPig", label: "Guinea Pig" },
  { key: "hamster", label: "Hamster" },
  { key: "ferret", label: "Ferret" },
  { key: "chinchilla", label: "Chinchilla" },
  { key: "snake", label: "Snake" },
  { key: "lizard", label: "Lizard" },
  { key: "turtle", label: "Turtle" }
]

const ICON_SRC: Record<Animal, string> = {
  dog: "/icons/dog.png",
  cat: "/icons/cat.png",
  bird: "/icons/bird.png",
  fish: "/icons/fish.png",
  rabbit: "/icons/rabbit.png",
  guineaPig: "/icons/guinea-pig.png",
  hamster: "/icons/hamster.png",
  ferret: "/icons/ferret.png",
  chinchilla: "/icons/chinchilla.png",
  snake: "/icons/snake.png",
  lizard: "/icons/lizard.png",
  turtle: "/icons/turtle.png"
}

function IconBase({
  title,
  children,
  active
}: {
  title: string
  children: React.ReactNode
  active: boolean
}) {
  return (
    <div
      className={cn(
        // 1:1 tile + centered content
        "relative grid aspect-square w-full max-w-[72px] sm:max-w-[80px] md:max-w-[88px] place-items-center overflow-hidden rounded-2xl border shadow-soft transition",
        "bg-white/55 backdrop-blur-md",
        "border-[#d7c3aa]/70 hover:border-[#c9ad8a] hover:bg-white/70",
        active && "border-[#b89469] bg-white/75"
      )}
      aria-label={title}
      title={title}
    >
      {children}
    </div>
  )
}

export function AnimalIcon({
  animal,
  active
}: {
  animal: Animal
  active: boolean
}) {
  const title = ANIMALS.find((a) => a.key === animal)?.label ?? animal
  const src = ICON_SRC[animal]

  return (
    <IconBase title={title} active={active}>
      <Image
        src={src}
        alt={`${title} icon`}
        fill
        className="object-contain p-4"
        sizes="(max-width: 640px) 22vw, (max-width: 1024px) 12vw, 96px"
        priority={animal === "dog"}
      />
    </IconBase>
  )
}
