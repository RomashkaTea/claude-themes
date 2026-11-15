import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Polar night: ink-blue grays, aurora green accent, violet and rose for the rest.
const aurora = makeColors({
  label: 'Aurora',
  only: 'dark',
  roles: { accent: '#3ee6b0', danger: '#ff6b8a', success: '#7be07a', warning: '#f2c45a', pro: '#b18cff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0a1020',
        'surface-1': '#0f1729',
        'surface-2': '#141d33',
        'surface-3': '#19233c',
        'text-primary': '#eaf4f7',
        'text-secondary': '#b9cad6',
        'text-muted': '#8da2b4',
      },
    },
  },
})

const STARS = Array.from({ length: 70 }, (_, i) => {
  // Deterministic scatter so the sky is the same every launch.
  const x = (i * 137.5) % 1600
  const y = (i * 89.3) % 620
  const r = i % 7 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7
  const d = (i % 5) * 1.3

  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" style="animation-delay:-${d}s"/>`
}).join('')

export const AURORA_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .stars circle { fill: #dfeaff; animation: tw 5s ease-in-out infinite; }
  @keyframes tw { 0%,100% { opacity: .25 } 50% { opacity: .9 } }
  .band { mix-blend-mode: screen; transform-origin: 800px 200px; }
  .b1 { animation: sway1 26s ease-in-out infinite alternate; }
  .b2 { animation: sway2 34s ease-in-out infinite alternate; }
  .b3 { animation: sway3 42s ease-in-out infinite alternate; }
  @keyframes sway1 { from { transform: translateX(-60px) skewX(-6deg); opacity: .75 } to { transform: translateX(80px) skewX(5deg); opacity: 1 } }
  @keyframes sway2 { from { transform: translateX(90px) skewX(4deg); opacity: .5 } to { transform: translateX(-70px) skewX(-5deg); opacity: .85 } }
  @keyframes sway3 { from { transform: translateX(-40px); opacity: .35 } to { transform: translateX(50px); opacity: .6 } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#050a18"/><stop offset=".6" stop-color="#0a1328"/><stop offset="1" stop-color="#0d1a2e"/>
  </linearGradient>
  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3ee6b0" stop-opacity="0"/><stop offset=".45" stop-color="#3ee6b0" stop-opacity=".55"/><stop offset="1" stop-color="#1fa37e" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b18cff" stop-opacity="0"/><stop offset=".4" stop-color="#9a7bff" stop-opacity=".45"/><stop offset="1" stop-color="#3ee6b0" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ff7ab8" stop-opacity="0"/><stop offset=".5" stop-color="#ff7ab8" stop-opacity=".3"/><stop offset="1" stop-color="#b18cff" stop-opacity="0"/>
  </linearGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28"/></filter>
</defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
<g class="stars">${STARS}</g>
<g filter="url(#soft)">
  <path class="band b3" fill="url(#g3)" d="M-100 60 C 300 0, 600 180, 900 90 S 1400 20, 1700 120 L 1700 420 C 1400 340, 1100 460, 800 380 S 200 330, -100 420 Z"/>
  <path class="band b2" fill="url(#g2)" d="M-100 120 C 250 40, 550 240, 850 150 S 1350 60, 1700 190 L 1700 520 C 1350 430, 1050 560, 750 470 S 250 420, -100 520 Z"/>
  <path class="band b1" fill="url(#g1)" d="M-100 180 C 200 90, 500 300, 800 210 S 1300 110, 1700 250 L 1700 600 C 1300 500, 1000 640, 700 540 S 200 480, -100 600 Z"/>
</g>
<path fill="#070d1a" d="M0 1000 L0 880 L120 820 L210 860 L330 760 L430 830 L540 790 L650 860 L780 800 L900 870 L1010 780 L1130 840 L1250 770 L1380 850 L1490 810 L1600 860 L1600 1000 Z"/>
</svg>`

export const AURORA: ThemeSetArgs = {
  colors: aurora.theme,
  backdrop: { scene: 'aurora', glass: { blur: 18, tint: '#0a1020', opacity: 0.55 } },
}

export const AURORA_PROBLEMS = aurora.problems
