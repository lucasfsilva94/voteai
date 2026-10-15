import flavio from '../assets/images/flavio.jpg'
import lula from '../assets/images/lula.jpg'
import type { CandidateId } from '../lib/types.ts'

// Same crop and grayscale treatment for both candidates (credits in docs/CREDITS.md).
export const PORTRAITS: Record<CandidateId, string> = { A: flavio, B: lula }
