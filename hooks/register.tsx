import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { AURORA, AURORA_PROBLEMS, AURORA_SCENE } from './aurora.js'
import { CATPPUCCIN, CATPPUCCIN_PROBLEMS } from './catppuccin.js'

const LOOKS: Record<string, { look: ThemeSetArgs; problems: string[] }> = {
  aurora: { look: AURORA, problems: AURORA_PROBLEMS },
  catppuccin: { look: CATPPUCCIN, problems: CATPPUCCIN_PROBLEMS },
}
const DEFAULT = 'catppuccin'

async function apply($: EngineInterface, name: string): Promise<string> {
  const entry = LOOKS[name]

  if (entry === undefined) {
    return `Unknown look "${name}". Try: ${Object.keys(LOOKS).join(', ')}.`
  }
  const unpainted = entry.problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    $.ui.toast(unpainted)
  }
  const set = await $.theme.set(entry.look)

  return set.isDrawn ? `Look set to ${name}.` : `Look set to ${name}, but nothing draws here: ${set.reason}`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'look',
      description: `Switch the app look: ${Object.keys(LOOKS).join(' | ')}`,
    })
    const saved = await $.store.get('look')
    const name = typeof saved === 'string' && saved in LOOKS ? saved : DEFAULT
    await apply($, name)

    return next(e)
  })

  on('command.run', { command: 'look' }, async ($, e) => {
    const name = e.args.trim().toLowerCase()

    if (name === '') {
      const saved = await $.store.get('look')

      return { text: `Current look: ${String(saved ?? DEFAULT)}. Options: ${Object.keys(LOOKS).join(', ')}.` }
    }
    const text = await apply($, name)

    if (name in LOOKS) {
      await $.store.set('look', name)
    }

    return { text }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'aurora') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={AURORA_SCENE} alt="Green and violet aurora drifting over a dark mountain ridge" isInteractive />
  })
}
