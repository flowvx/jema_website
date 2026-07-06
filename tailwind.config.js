/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      },
      colors: {
        // Tokens pilotés par variables CSS (voir index.css) → thème dynamique.
        accent: 'var(--accent-color)',
        'accent-strong': 'var(--accent-strong)',
        paper: 'var(--paper-color)',
        ink: 'var(--text-primary)',
        'ink-soft': 'var(--text-secondary)',
        'ink-muted': 'var(--text-muted)'
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        glow: '0 0 40px var(--accent-glow)'
      },
      backdropBlur: {
        glass: '14px'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite'
      }
    }
  },
  plugins: []
}
