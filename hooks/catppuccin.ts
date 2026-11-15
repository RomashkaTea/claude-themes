import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Catppuccin (MIT-licensed community palette): Latte by day, Mocha by night.
const catppuccin = makeColors({
  label: 'Catppuccin',
  light: {
    roles: { accent: '#8839ef', danger: '#d20f39', success: '#40a02b', warning: '#df8e1d', pro: '#7287fd' },
    gray: {
      anchors: {
        'surface-0': '#dce0e8',
        'surface-1': '#e6e9ef',
        'surface-2': '#eff1f5',
        'surface-3': '#eff1f5',
        'text-primary': '#4c4f69',
        'text-secondary': '#5c5f77',
        'text-muted': '#6c6f85',
      },
    },
  },
  dark: {
    roles: { accent: '#cba6f7', danger: '#f38ba8', success: '#a6e3a1', warning: '#f9e2af', pro: '#b4befe' },
    gray: {
      anchors: {
        'surface-0': '#181825',
        'surface-1': '#1e1e2e',
        'surface-2': '#24243a',
        'surface-3': '#2a2b3e',
        'text-primary': '#cdd6f4',
        'text-secondary': '#bac2de',
        'text-muted': '#a6adc8',
      },
    },
  },
})

export const CATPPUCCIN: ThemeSetArgs = { colors: catppuccin.theme }
export const CATPPUCCIN_PROBLEMS = catppuccin.problems
