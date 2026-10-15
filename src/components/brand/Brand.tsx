import { Link } from 'react-router'

// Brand mark (concept "Urna", brand/logo): the ballot-box slot above the confirm check.
function BrandMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#194b39" />
      <rect x="17" y="11" width="30" height="5.5" rx="2.75" fill="#c8ee57" />
      <path d="M18.5 36 28.5 46 46.5 26.5" fill="none" stroke="#c8ee57" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Wordmark "voteAI" outlined from DM Sans ("vote" 700, "AI" 400, letter-spacing -0.035em), so the site downloads no font
// for it. It is the logotype (WCAG 1.4.5 exception); the link carries the accessible name, and currentColor keeps it
// visible in forced colours.
const WORDMARK =
  'M36.5 0L20.1 0L1.6-50.4L15.8-50.4L28.3-12.7L28.3-12.7L40.8-50.4L54.9-50.4L36.5 0ZM81.1 1.2L81.1 1.2Q73.9 1.2 68.2-2.1Q62.4-5.5 59.1-11.5Q55.7-17.4 55.7-25.1L55.7-25.1Q55.7-33 59.1-39.0Q62.4-44.9 68.2-48.3Q74-51.6 81.2-51.6L81.2-51.6Q88.5-51.6 94.3-48.3Q100-44.9 103.4-39.0Q106.7-33 106.7-25.2L106.7-25.2Q106.7-17.4 103.4-11.5Q100-5.5 94.2-2.1Q88.4 1.2 81.1 1.2ZM81.1-10.5L81.1-10.5Q84.5-10.5 87.2-12.1Q89.8-13.7 91.4-17Q92.9-20.3 92.9-25.2L92.9-25.2Q92.9-30.1 91.4-33.4Q89.8-36.6 87.2-38.3Q84.5-39.9 81.2-39.9L81.2-39.9Q78-39.9 75.3-38.3Q72.6-36.6 71.1-33.4Q69.5-30.1 69.5-25.2L69.5-25.2Q69.5-20.3 71.1-17Q72.6-13.7 75.3-12.1Q77.9-10.5 81.1-10.5ZM144.6 0L135.5 0Q130.2 0 126.3-1.7Q122.3-3.3 120.1-7.2Q117.9-11 117.9-17.7L117.9-17.7L117.9-39.1L109.3-39.1L109.3-50.4L117.9-50.4L119.4-64.1L131.4-64.1L131.4-50.4L144.7-50.4L144.7-39.1L131.4-39.1L131.4-17.5Q131.4-14.1 132.9-12.8Q134.4-11.5 138-11.5L138-11.5L144.6-11.5L144.6 0ZM175.5 1.2L175.5 1.2Q167.9 1.2 162.1-2.1Q156.2-5.3 153.0-11.2Q149.7-17 149.7-24.7L149.7-24.7Q149.7-32.6 153.0-38.7Q156.2-44.7 162.0-48.2Q167.8-51.6 175.5-51.6L175.5-51.6Q183.0-51.6 188.6-48.3Q194.2-45 197.3-39.4Q200.4-33.8 200.4-26.7L200.4-26.7Q200.4-25.7 200.4-24.5Q200.4-23.2 200.2-21.9L200.2-21.9L159.3-21.9L159.3-30.1L186.8-30.1Q186.5-35 183.4-37.8Q180.2-40.6 175.5-40.6L175.5-40.6Q172.1-40.6 169.2-39.1Q166.3-37.5 164.7-34.3Q163.0-31.1 163.0-26.2L163.0-26.2L163.0-23.3Q163.0-19.2 164.6-16.2Q166.1-13.1 168.9-11.5Q171.7-9.8 175.4-9.8L175.4-9.8Q179.1-9.8 181.6-11.4Q184.0-13 185.2-15.5L185.2-15.5L199.0-15.5Q197.6-10.8 194.3-7Q191.0-3.2 186.2-1Q181.4 1.2 175.5 1.2ZM213.2 0L204.4 0L230.2-70L239.1-70L264.8 0L255.9 0L234.6-59.5L234.6-59.5L213.2 0ZM252.7-18L216.2-18L218.6-24.8L250.3-24.8L252.7-18ZM280.2 0L271.8 0L271.8-70L280.2-70L280.2 0Z'

export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link className={`brand${small ? ' brand-small' : ''}`} to="/" aria-label="voteAI, início">
      <span className="brand-symbol">
        <BrandMark />
      </span>
      <svg className="brand-word" viewBox="0 -70 285 72" aria-hidden="true" focusable="false">
        <path fill="currentColor" d={WORDMARK} />
      </svg>
    </Link>
  )
}
