import type { Animal } from "@/components/AnimalIcons"
import { getVoiceTuning, toSpeechText } from "@/lib/translate"

/**
 * Browser TTS (SpeechSynthesis).
 * Notes:
 * - pitch is typically clamped to ~[0.5, 2.0] depending on browser/voice
 * - we apply a global pitch boost + small jitter for a more lively sound
 */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function speak(text: string, animal: Animal) {
  if (typeof window === "undefined") return

  const synth = window.speechSynthesis
  if (!synth) return

  synth.cancel()

  const safeText = toSpeechText(text, animal)
  if (!safeText.trim()) return

  const u = new SpeechSynthesisUtterance(safeText)
  const tuning = getVoiceTuning(animal)

  // Global pitch up + tiny jitter so repeats don’t sound identical
  const PITCH_BOOST = 1.9
  const jitter = 1 + (Math.random() - 0.5) * 0.08 // ±4%

  u.pitch = clamp(tuning.pitch * PITCH_BOOST * jitter, 0.5, 2.0)
  u.rate = clamp(tuning.rate, 1.15, 1.6)
  u.volume = 1

  // Best-effort English voice selection (deterministic pick)
  const voices = synth.getVoices()
  const en = voices.filter((v) => /en/i.test(v.lang))
  u.voice = (en[0] ?? voices[0]) || null

  synth.speak(u)
}

export function stopSpeak() {
  if (typeof window === "undefined") return
  window.speechSynthesis?.cancel()
}
