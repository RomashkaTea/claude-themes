# themes

Four looks for the Claude desktop and mobile apps, switched with a slash command:

- **aurora**: a polar-night palette with an animated sky. Green, violet and rose aurora bands drift over twinkling stars and a mountain ridge. Dark mode only, and the motion stops when the system asks for reduced motion.
- **catppuccin**: the Catppuccin palette, Latte in light mode and Mocha in dark mode.
- **tokyo-night**: the Tokyo Night palette, Day in light mode and Night in dark mode.
- **space**: a deep-space palette with an animated sky. A starfield turns slowly past glowing nebulae, shooting stars streak by, and a ringed planet sits in the corner. Dark mode only.

Type `/look aurora`, `/look catppuccin`, `/look tokyo-night` or `/look space` to switch. Your choice is remembered across sessions, and `/look` on its own shows the current look. The terminal and editors don't draw themes.

## Install

At the prompt of a terminal session:

```
/plugin install themes --marketplace RomashkaTea/claude-themes
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```bash
claude plugin install themes --marketplace RomashkaTea/claude-themes
```

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `RomashkaTea/claude-themes`, then Add plugin.

## Credits

The Catppuccin colors come from [Catppuccin](https://github.com/catppuccin/catppuccin) (MIT), and the Tokyo Night colors from [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) (MIT).
