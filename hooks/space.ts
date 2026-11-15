import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Deep space: violet-black grays, starlight-blue accent, nebula pinks and greens.
const space = makeColors({
  label: 'Deep space',
  only: 'dark',
  roles: { accent: '#8fa8ff', danger: '#ff6b81', success: '#6fe3a5', warning: '#ffc266', pro: '#d38cff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#07060f',
        'surface-1': '#0d0b1a',
        'surface-2': '#121024',
        'surface-3': '#17142d',
        'text-primary': '#ece9ff',
        'text-secondary': '#c3bfe0',
        'text-muted': '#9893bd',
      },
    },
  },
})

// A small deterministic random, so the sky is the same every launch.
function rng(seed: number): () => number {
  let s = seed

  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296

    return s / 4294967296
  }
}

function stars(count: number, seed: number, maxR: number, cls: string): string {
  const rand = rng(seed)
  const tints = ['#ffffff', '#dfe6ff', '#fff2dc', '#e8dcff']
  let out = ''

  for (let i = 0; i < count; i++) {
    // Spread over a square larger than the screen, so the slow turn never shows an edge.
    const x = (rand() * 2400 - 400).toFixed(0)
    const y = (rand() * 2400 - 700).toFixed(0)
    const r = (0.4 + rand() * maxR).toFixed(2)
    const fill = tints[Math.floor(rand() * tints.length)]
    const delay = (rand() * 6).toFixed(1)
    out += `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" fill="${fill}" style="animation-delay:-${delay}s"/>`
  }

  return out
}

export const SPACE_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .far { opacity: .55; }
  .mid { animation: tw 7s ease-in-out infinite; }
  .near { animation: tw 4.5s ease-in-out infinite; }
  @keyframes tw { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
  .sky { transform-origin: 800px 500px; animation: turn 600s linear infinite; }
  .sky2 { transform-origin: 800px 500px; animation: turn 420s linear infinite; }
  @keyframes turn { to { transform: rotate(360deg) } }
  .neb { animation: breathe 30s ease-in-out infinite alternate; transform-origin: 300px 750px; }
  .neb2 { animation: breathe 38s ease-in-out infinite alternate-reverse; transform-origin: 1250px 250px; }
  @keyframes breathe { from { opacity: .55; transform: scale(1) } to { opacity: .9; transform: scale(1.08) } }
  .planet { animation: bob 24s ease-in-out infinite alternate; }
  @keyframes bob { from { transform: translateY(0) } to { transform: translateY(14px) } }
  .shoot { opacity: 0; animation: shoot 11s linear infinite; }
  .shoot2 { opacity: 0; animation: shoot 17s linear infinite; animation-delay: 6s; }
  @keyframes shoot {
    0% { opacity: 0; transform: translate(0, 0) }
    1% { opacity: 1 }
    6% { opacity: 0; transform: translate(-520px, 260px) }
    100% { opacity: 0; transform: translate(-520px, 260px) }
  }
  @media (max-aspect-ratio: 3/4) { .planet-wrap { transform: translate(-120px, 60px) scale(.75); } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
<defs>
  <radialGradient id="void" cx="50%" cy="45%" r="75%">
    <stop offset="0" stop-color="#0e0b22"/><stop offset=".6" stop-color="#08071a"/><stop offset="1" stop-color="#040309"/>
  </radialGradient>
  <radialGradient id="n1" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#c03fa0" stop-opacity=".5"/><stop offset=".5" stop-color="#6a2fb0" stop-opacity=".25"/><stop offset="1" stop-color="#2a1660" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="n2" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#2fb8c0" stop-opacity=".35"/><stop offset=".55" stop-color="#3550c8" stop-opacity=".18"/><stop offset="1" stop-color="#1a1a60" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="planetBody" cx="35%" cy="30%" r="75%">
    <stop offset="0" stop-color="#f2b38a"/><stop offset=".45" stop-color="#b8607a"/><stop offset=".8" stop-color="#4a2550"/><stop offset="1" stop-color="#1a0e26"/>
  </radialGradient>
  <linearGradient id="bands" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff" stop-opacity=".12"/>
    <stop offset=".38" stop-color="#fff" stop-opacity="0"/><stop offset=".6" stop-color="#2a0f30" stop-opacity=".25"/>
    <stop offset=".7" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#e8c8ff" stop-opacity="0"/><stop offset=".2" stop-color="#e8c8ff" stop-opacity=".55"/>
    <stop offset=".5" stop-color="#ffd9b8" stop-opacity=".8"/><stop offset=".8" stop-color="#e8c8ff" stop-opacity=".55"/><stop offset="1" stop-color="#e8c8ff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#9fb4ff" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="planetClip"><circle cx="0" cy="0" r="120"/></clipPath>
  <filter id="haze" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.4"/></filter>
</defs>
<rect width="1600" height="1000" fill="url(#void)"/>
<g filter="url(#haze)">
  <ellipse class="neb" cx="300" cy="760" rx="520" ry="300" fill="url(#n1)"/>
  <ellipse class="neb2" cx="1250" cy="240" rx="560" ry="320" fill="url(#n2)"/>
  <ellipse class="neb" cx="900" cy="980" rx="700" ry="200" fill="url(#n2)" opacity=".5"/>
</g>
<g class="sky">${stars(260, 7, 0.9, 'far')}</g>
<g class="sky2">${stars(110, 42, 1.3, 'mid')}</g>
<g class="sky2" filter="url(#glow)">${stars(26, 99, 1.9, 'near')}</g>
<g class="shoot"><line x1="1450" y1="120" x2="1560" y2="65" stroke="url(#trail)" stroke-width="2" stroke-linecap="round"/></g>
<g class="shoot2"><line x1="1100" y1="60" x2="1190" y2="15" stroke="url(#trail)" stroke-width="1.6" stroke-linecap="round"/></g>
<svg x="0" y="0" width="1600" height="1000" viewBox="0 0 1600 1000" preserveAspectRatio="xMaxYMin meet">
  <g class="planet-wrap"><g class="planet" transform="translate(1390 210)">
    <ellipse cx="0" cy="0" rx="230" ry="44" fill="none" stroke="url(#ring)" stroke-width="10" transform="rotate(-18)" opacity=".55"/>
    <circle cx="0" cy="0" r="120" fill="url(#planetBody)"/>
    <rect x="-130" y="-130" width="260" height="260" fill="url(#bands)" clip-path="url(#planetClip)" transform="rotate(-18)"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="#ffb0d8" stroke-opacity=".25" stroke-width="3"/>
    <path d="M -230 0 A 230 44 0 0 0 230 0" fill="none" stroke="url(#ring)" stroke-width="10" transform="rotate(-18)"/>
    <circle cx="-300" cy="150" r="14" fill="#c9c3e6"/><circle cx="-304" cy="146" r="14" fill="#07060f" opacity=".55"/>
  </g></g>
</svg>
</svg>`

export const SPACE: ThemeSetArgs = {
  colors: space.theme,
  backdrop: { scene: 'space', glass: { blur: 16, tint: '#07060f', opacity: 0.5 } },
}
export const SPACE_PROBLEMS = space.problems
