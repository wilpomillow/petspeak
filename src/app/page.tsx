"use client"

import { useMemo, useState } from "react"
import AuroraBackground from "@/components/AuroraBackground"
import { BlurRevealText } from "@/components/BlurRevealText"
import { Animal, ANIMALS, AnimalIcon } from "@/components/AnimalIcons"
import { IconButton } from "@/components/IconButton"
import { translateToPetSpeak } from "@/lib/translate"
import { speak, stopSpeak } from "@/lib/speak"
import { Volume2, RotateCcw } from "lucide-react"

export default function Page() {
  const [animal, setAnimal] = useState<Animal>("dog")
  const [input, setInput] = useState("")

  const translation = useMemo(() => {
    if (!input.trim()) return ""
    return translateToPetSpeak(input, animal)
  }, [input, animal])

  function onReset() {
    stopSpeak()
    setInput("")
    setAnimal("dog")
  }

  return (
    <AuroraBackground>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 md:px-8">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <img
                src="/icons/logo.png"
                alt="pet_speak logo"
                className="h-12 md:h-14 w-auto"
              />
              <p className="mt-2 max-w-xl text-sm text-[#5a4631]/80 md:text-base">
                Turn your words into something your pet will understand. (Maybe)
              </p>
            </div>

            <IconButton label="Reset" onClick={onReset}>
              <RotateCcw className="h-5 w-5" />
            </IconButton>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {/* Input */}
          <div className="rounded-3xl border border-[#d7c3aa]/70 bg-white/60 p-4 shadow-soft backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-wide text-[#5a4631]/90">
                Type here
              </h2>
              <div className="text-xs text-[#6b5640]/70">
                {input.trim().length} chars
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write something here…"
              className="min-h-[220px] w-full resize-none rounded-2xl border border-[#e2d2bd] bg-white/55 p-4 text-[15px] leading-relaxed text-[#2b241d] outline-none placeholder:text-[#6b5640]/55 focus:border-[#c9ad8a]"
            />
          </div>

          {/* Animal picker */}
          <div className="flex h-full flex-col rounded-3xl border border-[#d7c3aa]/70 bg-white/50 p-4 shadow-soft backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-wide text-[#5a4631]/90">
                Pick your pet
              </h2>
              <div className="text-xs text-[#6b5640]/70">Default: Dog</div>
            </div>

            <div className="grid h-full grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-6">
              {ANIMALS.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setAnimal(a.key)}
                  className="group w-full flex flex-col items-center"
                >
                  <div className="w-full flex justify-center">
                    <AnimalIcon animal={a.key} active={animal === a.key} />
                  </div>
                  <div className="mt-1 text-center text-[11px] text-[#6b5640]/80 group-hover:text-[#5a4631]">
                    {a.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Translation (single live output) */}
        <section className="mt-4">
          <div className="rounded-3xl border border-[#d7c3aa]/70 bg-white/60 p-4 shadow-soft backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-wide text-[#5a4631]/90">
                Translation
              </h2>
              <div className="text-xs text-[#6b5640]/70">
                {translation ? `${translation.length} chars` : "—"}
              </div>
            </div>

            <div className="relative">
              <div className="min-h-[160px] rounded-2xl border border-[#e2d2bd] bg-white/55 p-4 pr-14 pb-14 text-[15px] leading-relaxed text-[#2b241d]">
                {translation ? (
                  translation
                ) : (
                  <span className="text-[#6b5640]/55">
                    Start typing to translate…
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 right-2">
                <IconButton
                  label="Play audio"
                  onClick={() => {
                    if (!translation.trim()) return
                    speak(translation, animal)
                  }}
                  disabled={!translation.trim()}
                >
                  <Volume2 className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
          </div>

          <p className="mt-3 w-full text-center text-xs text-[#6b5640]/70">
            Audio uses the browser&apos;s speech synthesis – Maybe you&apos;ll need
            to sound it out yourself.
          </p>
        </section>

        {/* Sponsor banner */}
        <section className="mt-6">
          <p className="mb-2 w-full text-center text-sm text-[#5a4631]/80">
            if you want to truly understand your pet, visit our sponsor:
          </p>

          <div className="flex justify-center">
  <a
    href="https://www.petcircle.com.au/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F05868a112b3e434889adfac931ede590%2F4128a7f0fded46a19420442b07e966c8?format=webp&width=983"
      alt="Pet Circle sponsor banner"
      className="block max-h-[120px] w-auto rounded-2xl transition hover:opacity-95"
    />
  </a>
</div>
        </section>


        <footer className="mt-auto pt-10 text-center text-xs text-[#6b5640]/70">
          Copyright © 2026 Wilpo Millow. All rights reserved.
        </footer>
      </main>
    </AuroraBackground>
  )
}
