export const state = {
  FB: null,
};
export const actions = {};

export const mutations = {
  setFB(state, payload) {
    state.FB = payload;
  },
};
export const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};