import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Paleta baseline do Material 3 Design Kit
const m3Light = {
  dark: false,
  colors: {
    background: '#F7F2FA',
    surface: '#FEF7FF',
    'surface-bright': '#F8F2FA',
    'surface-light': '#F6EDFF',
    'surface-variant': '#E7E0EC',
    'on-surface-variant': '#49454F',
    'surface-container': '#F3EDF7',
    'surface-container-low': '#F7F2FA',
    'surface-container-high': '#ECE6F0',
    'surface-container-highest': '#E6E0E9',
    'on-surface': '#1D1B20',
    primary: '#6750A4',
    'on-primary': '#FFFFFF',
    'primary-container': '#EADDFF',
    'on-primary-container': '#21005D',
    secondary: '#625B71',
    'on-secondary': '#FFFFFF',
    'secondary-container': '#E8DEF8',
    'on-secondary-container': '#1D192B',
    tertiary: '#7D5260',
    'on-tertiary': '#FFFFFF',
    'tertiary-container': '#FFD8E4',
    'on-tertiary-container': '#31111D',
    error: '#B3261E',
    'on-error': '#FFFFFF',
    'error-container': '#F9DEDC',
    'on-error-container': '#410E0B',
    success: '#386A20',
    info: '#00639B',
    warning: '#985C00',
    'inverse-surface': '#322F35',
    'on-inverse-surface': '#F5EFF7',
    outline: '#79747E',
    'outline-variant': '#CAC4D0',
  },
  variables: {
    'border-color': '#CAC4D0',
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'low-emphasis-opacity': 0.38,
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'm3Light',
    themes: { m3Light },
  },
  defaults: {
    VBtn: {
      rounded: 'pill',
      color: 'primary',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
      density: 'comfortable',
    },
    VCard: {
      rounded: 'xl',
      variant: 'outlined',
      elevation: 0,
    },
    VChip: {
      rounded: 'lg',
    },
    VList: {
      density: 'comfortable',
    },
  },
})

export default vuetify
