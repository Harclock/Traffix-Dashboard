import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    modules: [], // Qui salveremo i moduli (es: ['traffico', 'meteo', 'mappe'])
    userProfile: null
  }),
  actions: {
    setModules(newModules) {
      this.modules = newModules;
    },
    clearUser() {
      this.modules = [];
      this.userProfile = null;
    }
  }
});