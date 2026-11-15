# themes

Two looks for the Claude desktop and mobile apps, switched with a slash command:

- **aurora**: a polar-night palette with an animated sky. Green, violet and rose aurora bands drift over twinkling stars and a mountain ridge. Dark mode only, and the motion stops when the system asks for reduced motion.
- **catppuccin**: the Catppuccin palette, Latte in light mode and Mocha in dark mode.

Type `/look aurora` or `/look catppuccin` to switch. Your choice is remembered across sessions, and `/look` on its own shows the current look. The terminal and editors don't draw themes.

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

The Catppuccin colors come from [Catppuccin](https://github.com/catppuccin/catppuccin) (MIT).
