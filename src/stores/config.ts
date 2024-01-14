import { defineStore } from 'pinia'


export const useConfigStore = defineStore('quiz', {
  state: () => ({
    screenWidth: document.documentElement.clientWidth,
    screenHeight: document.documentElement.clientHeight
  }),
  getters: {},
  actions: {
   
  },
  persist: {
    key: `md-quiz`
  },
  share: {
    enable: false
  }
})
