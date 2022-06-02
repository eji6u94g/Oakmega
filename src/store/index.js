import Vue from 'vue'
import Vuex from 'vuex'
import fb from "./fb"
import urbanAPI from "../apis/urbanRenewalAPI"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLocation: [25.02716, 121.43256],
    userInfo: {
      fb: {
        name: "",
        avatar: ""
      },
      google: {
        name: "",
        avatar: ""
      }
    },
    renewalDataGroup: [],
    polygonDataGroup: [],
    isRenewalDataLoaded: false,
    isPolygonDataLoaded: false,
    isFbLogined: false,
    isGoogleLogined: false
  },
  mutations: {
    setUserInfo(state, payload) {
      const { name, avatar, type } = payload
      if (type === "fb") {
        this.commit("setIsLoginedOrLoaded", {
          dataName: "isFbLogined", boolean: false
        })
        state.userInfo.fb = {
          name, avatar
        }
        this.commit("setIsLoginedOrLoaded", {
          dataName: "isFbLogined", boolean: true
        })
      } else if (type === "google") {
        this.commit("setIsLoginedOrLoaded", {
          dataName: "isGoogleLogined", boolean: false
        })
        state.userInfo.google = {
          name, avatar
        }
        this.commit("setIsLoginedOrLoaded", {
          dataName: "isGoogleLogined", boolean: true
        })
      }

    },
    setRenewalDataGroup(state, data) {
      state.renewalDataGroup = data
    },
    setPolygonDataGroup(state, data) {
      for (const item of data) {
        state.polygonDataGroup.push(item.geometry.coordinates[0]);
      }

      for (const items of state.polygonDataGroup) {
        for (const item of items) {
          item.pop();
          const firstItem = item.shift();
          item.push(firstItem);
        }
      }
    },
    setIsLoginedOrLoaded(state, payload) {
      const { dataName, boolean } = payload
      state[dataName] = boolean
    }
  },
  actions: {
    async fetchRenewalData({ commit, state }) {
      try {
        commit("setIsLoginedOrLoaded", { dataName: "isRenewalDataLoaded", boolean: false })
        const { data, status } = await urbanAPI.getRenewalData(
          state.userLocation[1],
          state.userLocation[0]
        );

        if (status !== 200) {
          throw new Error("Can't connect to server. Please try again latter.");
        }

        commit("setRenewalDataGroup", data.result)
        commit("setIsLoginedOrLoaded", { dataName: "isRenewalDataLoaded", boolean: true })
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPolygonData({ commit }) {
      try {
        commit("setIsLoginedOrLoaded", { dataName: "isPolygonDataLoaded", boolean: false })
        const { data, status } = await urbanAPI.getPolygonData();

        if (status !== 200) {
          throw new Error("Can't connect to server. Please try again latter.");
        }

        commit("setPolygonDataGroup", data.result.features)
        commit("setIsLoginedOrLoaded", { dataName: "isPolygonDataLoaded", boolean: true })
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
    fb
  }
})
