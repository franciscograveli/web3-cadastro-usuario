import { reactive } from 'vue'

// Estado compartilhado do Snackbar (Material 3)
const state = reactive({ show: false, text: '', color: 'inverse-surface', icon: '' })

export function useSnackbar() {
  const open = (text, color, icon) => Object.assign(state, { show: true, text, color, icon })
  return {
    state,
    sucesso: (t) => open(t, 'success', 'mdi-check-circle-outline'),
    erro: (t) => open(t, 'error', 'mdi-alert-circle-outline'),
    info: (t) => open(t, 'inverse-surface', 'mdi-information-outline'),
  }
}
