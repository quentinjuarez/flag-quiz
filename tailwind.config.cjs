import {
  EXTENDED_COLORS,
  SPACING,
  EXTENDED_BOX_SHADOW,
  EXTENDED_FONT_FAMILIES,
  EXTENDED_FONT_SIZES,
  EXTENDED_TRACKING,
  EXTENDED_TRANSITION,
  EXTENDED_BORDER_RADIUS
} from './src/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: SPACING,
    extend: {
      colors: EXTENDED_COLORS,
      fontFamily: EXTENDED_FONT_FAMILIES,
      minWidth: SPACING,
      fontSize: EXTENDED_FONT_SIZES,
      letterSpacing: EXTENDED_TRACKING,
      boxShadow: EXTENDED_BOX_SHADOW,
      transitionProperty: EXTENDED_TRANSITION,
      transitionDuration: {
        DEFAULT: '250ms'
      },
      borderRadius: EXTENDED_BORDER_RADIUS
    },
  },
  darkMode: 'class',
  plugins: [
  ]
}
