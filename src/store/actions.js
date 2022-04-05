import {saveCatch} from '@/assets/js/cache'

export const saveStorage = function ({commit}, {key, val}) {
  commit('set_storage', saveCatch(key, val))
}