import confirmationUrl from '../assets/media/urna-confirma.mp3'

export const CONFIRMATION_SOUND_URL: string = confirmationUrl

// Minimal shapes of the browser audio APIs this class uses, so tests can pass fakes.
type MediaLike = { preload?: string; currentTime?: number; muted?: boolean; pause(): void; play(): Promise<unknown> }
type SourceLike = { buffer?: unknown; connect(target: unknown): void; start(): void; stop(): void }
type ContextLike = {
  state?: string
  destination?: unknown
  currentTime?: number
  resume(): Promise<unknown>
  decodeAudioData(bytes: ArrayBuffer): Promise<unknown>
  createBufferSource?(): SourceLike
  createOscillator?(): { type: string; frequency: { value: number }; connect(t: unknown): void; start(): void; stop(at: number): void }
  createGain?(): { gain: { value: number }; connect(t: unknown): void }
}
type Fetcher = (url: string) => Promise<{ ok: boolean; arrayBuffer(): Promise<ArrayBuffer> }>

export type ConfirmationSoundOptions = {
  AudioCtor?: (new (url: string) => MediaLike) | null
  AudioContextCtor?: (new () => ContextLike) | null
  fetcher?: Fetcher
}

const browserAudioContext = (): (new () => ContextLike) | null => {
  const g = globalThis as unknown as { AudioContext?: new () => ContextLike; webkitAudioContext?: new () => ContextLike }
  return g.AudioContext ?? g.webkitAudioContext ?? null
}

// The real confirmation recording is decoded once and unlocked by a quiz gesture.
export class ConfirmationSound {
  enabled = true
  private AudioContextCtor: (new () => ContextLike) | null
  private fetcher: Fetcher
  private context: ContextLike | null = null
  private bufferPromise: Promise<unknown> | null = null
  private source: SourceLike | null = null
  private token = 0
  private media: MediaLike | null

  constructor({
    AudioCtor = (globalThis as unknown as { Audio?: new (url: string) => MediaLike }).Audio ?? null,
    AudioContextCtor = browserAudioContext(),
    fetcher = globalThis.fetch as unknown as Fetcher,
  }: ConfirmationSoundOptions = {}) {
    this.AudioContextCtor = AudioContextCtor
    this.fetcher = fetcher
    try {
      this.media = AudioCtor ? new AudioCtor(CONFIRMATION_SOUND_URL) : null
      if (this.media) this.media.preload = 'auto'
    } catch {
      this.media = null
    }
  }

  unlock(): void {
    if (!this.enabled) return
    try {
      this.context ??= this.AudioContextCtor ? new this.AudioContextCtor() : null
      this.context?.resume()?.catch(() => {})
      const context = this.context
      if (context && !this.bufferPromise) {
        this.bufferPromise = this.fetcher
          .call(globalThis, CONFIRMATION_SOUND_URL)
          .then((r) => {
            if (!r.ok) throw Error('Audio unavailable')
            return r.arrayBuffer()
          })
          .then((bytes) => context.decodeAudioData(bytes))
          .catch(() => null)
      }
    } catch {
      this.context = null
    }
  }

  // Short keypad tone for the simulated typing; silent until the context was unlocked by a gesture.
  beep(frequency = 880, duration = 0.07): void {
    const ctx = this.context
    if (!this.enabled || !ctx || ctx.state !== 'running' || !ctx.createOscillator || !ctx.createGain) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = frequency
      gain.gain.value = 0.035
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop((ctx.currentTime ?? 0) + duration)
    } catch {
      /* a missing tone never blocks the simulation */
    }
  }

  setEnabled(value: boolean): void {
    this.enabled = value
    if (!value) this.stop()
  }

  stop(): void {
    this.token++
    try {
      this.source?.stop()
    } catch {
      /* already stopped */
    }
    this.source = null
    try {
      this.media?.pause()
    } catch {
      /* not playing */
    }
  }

  async play(): Promise<boolean> {
    if (!this.enabled) return true
    this.stop()
    const token = this.token
    this.unlock()
    try {
      const buffer = await this.bufferPromise
      if (token !== this.token || !this.enabled) return true
      const ctx = this.context
      if (buffer && ctx?.createBufferSource) {
        await ctx.resume()
        if (ctx.state !== 'running') throw Error('Audio blocked')
        if (token !== this.token || !this.enabled) return true
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        source.start()
        this.source = source
        return true
      }
    } catch {
      /* fall back to the media element */
    }
    try {
      if (token !== this.token || !this.enabled) return true
      if (!this.media) return false
      this.media.currentTime = 0
      this.media.muted = false
      await this.media.play()
      return true
    } catch {
      return false
    }
  }
}

// One instance for the whole app: unlocked by the first answer, played by the urn.
export const confirmationSound = new ConfirmationSound()
