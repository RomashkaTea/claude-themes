import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Tokyo Night (MIT, by enkia): Day in light mode, Night in dark mode.
const tokyoNight = makeColors({
  label: 'Tokyo Night',
  light: {
    roles: { accent: '#2e7de9', danger: '#f52a65', success: '#587539', warning: '#8c6c3e', pro: '#9854f1' },
    gray: {
      anchors: {
        'surface-0': '#d0d5e3',
        'surface-1': '#d8dbe6',
        'surface-2': '#e1e2e7',
        'surface-3': '#e1e2e7',
        'text-primary': '#343b58',
        'text-secondary': '#4c5274',
        'text-muted': '#5f6488',
      },
    },
  },
  dark: {
    roles: { accent: '#7aa2f7', danger: '#f7768e', success: '#9ece6a', warning: '#e0af68', pro: '#bb9af7' },
    gray: {
      anchors: {
        'surface-0': '#16161e',
        'surface-1': '#1a1b26',
        'surface-2': '#1f2030',
        'surface-3': '#24263a',
        'text-primary': '#c0caf5',
        'text-secondary': '#a9b1d6',
        'text-muted': '#8a92b8',
      },
    },
  },
})

export const TOKYO_NIGHT: ThemeSetArgs = { colors: tokyoNight.theme }
export const TOKYO_NIGHT_PROBLEMS = tokyoNight.problems
