import type { Animal } from "@/components/AnimalIcons"

type SoundProfile = {
  sounds: string[]
  pitch: number
  rate: number
}

const PROFILES: Record<Animal, SoundProfile> = {
  dog: { sounds: ["woof", "bark", "arf", "ruff"], pitch: 1.0, rate: 1.1 },
  cat: { sounds: ["meow", "mrrp", "nyan", "purr"], pitch: 1.2, rate: 1.0 },
  bird: { sounds: ["tweet", "chirp", "peep", "trill"], pitch: 1.35, rate: 1.15 },
  fish: { sounds: ["blub", "bloop", "glub", "plop"], pitch: 0.9, rate: 0.95 },
  rabbit: { sounds: ["sniff", "bink", "thump", "munch"], pitch: 1.05, rate: 1.0 },
  guineaPig: { sounds: ["wheek", "purr", "chirp", "chut"], pitch: 1.15, rate: 1.05 },
  hamster: { sounds: ["squeak", "snip", "munch", "peep"], pitch: 1.25, rate: 1.05 },
  ferret: { sounds: ["dook", "chirp", "huff", "snrk"], pitch: 1.1, rate: 1.1 },
  chinchilla: { sounds: ["squeak", "bark", "eep", "chitter"], pitch: 1.3, rate: 1.0 },
  snake: { sounds: ["hiss", "ssss", "sssh", "tsss"], pitch: 0.75, rate: 0.9 },
  lizard: { sounds: ["tsk", "click", "huff", "chirp"], pitch: 0.95, rate: 0.95 },
  turtle: { sounds: ["hmm", "mmm", "snrk", "plod"], pitch: 0.85, rate: 0.85 }
}

function hashWord(word: string) {
  // Small deterministic hash (stable across sessions)
  let h = 2166136261
  for (let i = 0; i < word.length; i++) {
    h ^= word.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function chooseSound(word: string, animal: Animal) {
  const profile = PROFILES[animal]
  const w = word.toLowerCase()

  // Deterministic "letter cues" (existence of certain letters influences which sound family)
  if (animal === "snake") return "s".repeat(Math.max(1, word.length))
  if (animal === "cat" && (w.includes("r") || w.includes("l"))) return profile.sounds[3] // "purr"
  if (animal === "bird" && (w.includes("t") || w.includes("p"))) return profile.sounds[0] // "tweet"

  const idx = hashWord(w + "|" + animal) % profile.sounds.length
  return profile.sounds[idx]
}

function extendToLength(base: string, targetLen: number) {
  if (targetLen <= base.length) return base.slice(0, Math.max(1, targetLen))

  const vowels = new Set(["a", "e", "i", "o", "u", "y"])
  const chars = base.split("")
  const vowelIdxs = chars
    .map((c, i) => (vowels.has(c.toLowerCase()) ? i : -1))
    .filter((i) => i >= 0)

  // If no vowels, repeat last character
  if (vowelIdxs.length === 0) {
    return base + chars[chars.length - 1].repeat(targetLen - base.length)
  }

  let out = chars.slice()
  let i = 0
  while (out.length < targetLen) {
    const at = vowelIdxs[i % vowelIdxs.length]
    out.splice(at + 1, 0, out[at]) // duplicate vowel
    i++
    if (i > 4000) break
  }
  return out.join("").slice(0, targetLen)
}

function keepPunctuation(word: string) {
  const m = word.match(/^([\p{L}\p{N}']+)([^\p{L}\p{N}']+)?$/u)
  if (!m) return { core: word, punc: "" }
  return { core: m[1] ?? word, punc: m[2] ?? "" }
}

export function translateToPetSpeak(input: string, animal: Animal) {
  const words = input.trim().split(/\s+/).filter(Boolean)
  const translated = words.map((w) => {
    const { core, punc } = keepPunctuation(w)
    const sound = chooseSound(core, animal)
    const out = extendToLength(sound, Math.max(4, core.length))
    return out + punc
  })
  return translated.join(" ")
}

/**
 * TTS helper: keeps on-screen text unchanged, but adjusts speech text so
 * snake "ssssss" is more likely to be spoken as a held hiss.
 */
export function toSpeechText(displayText: string, animal: Animal) {
  if (animal !== "snake") return displayText

  // Turn tokens like "ssssss" into "hissssss" (TTS tends to hold this)
  return displayText.replace(/\b(s{2,})\b/gi, (m) => "hi" + "s".repeat(m.length))
}

/** Convenience: translate + TTS-friendly postprocess in one call */
export function translateToPetSpeakForSpeech(input: string, animal: Animal) {
  return toSpeechText(translateToPetSpeak(input, animal), animal)
}

export function getVoiceTuning(animal: Animal) {
  return PROFILES[animal]
}
