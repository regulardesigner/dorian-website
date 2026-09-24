const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // Design tokens live as CSS variables in src/assets/tailwind.css
      colors: {
        bg: token('bg'),
        raised: token('bg-raised'),
        text: token('text'),
        dim: token('text-dim'),
        faint: token('text-faint'),
        hairline: token('hairline'),
        'hairline-strong': token('hairline-strong'),
        accent: token('accent'),
        'accent-dim': token('accent-dim'),
      },
      fontFamily: {
        sans: ['Archivo', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '3px',
      },
      maxWidth: {
        page: '1240px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
