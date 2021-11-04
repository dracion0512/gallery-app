import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 0,
    message: '',
    data: [],
    token: '',
    username: null,
    favorite: [],
    searchTag: '',
  },
  getters: {
    status: (state) => {
      return state.status
    },
    message: (state) => {
      return state.message
    },
    data: (state) => {
      return state.data
    },    
    token: (state) => {
      return state.token
    },
    // other getters
    username: (state) => {
      return state.username
    },
    favorite: (state) => {
      return state.favorite
    },    
    searchTag: (state) => {
      return state.searchTag
    },
  },
  mutations: {
    SET_STATUS: (state, newValue) => {
      state.status = newValue
    },
    SET_MESSAGE: (state, newValue) => {
      state.message = newValue
    },
    SET_DATA: (state, newValue) => {
      state.data = newValue
    },
    SET_TOKEN: (state, newValue) => {
      state.token = newValue
    },
    // other mutations
    SET_USERNAME: (state, newValue) => {
      state.username = newValue
    },
    SET_FAVORITE: (state, newValue) => {  
      const keys = new Map ()
      newValue.forEach(item => keys.set(""+item))
      state.favorite = state.data.filter(item => keys.has(item.id.toString()))
    },
    UPDATE_FAVORITE: (state, item) => {
      if (state.favorite.includes(item)) {
        state.favorite.splice(state.favorite.indexOf(item), 1)
      } else {
        state.favorite.push(item)
        state.favorite.sort((a, b) => a.id - b.id)
      }
    },
    SET_SEARCHTAG: (state, newValue) => {
      state.searchTag = newValue
    },
  },
  actions: {
    setStatus: ({commit, state}, newValue) => {
      commit('SET_STATUS', newValue)
      return state.status
    },
    setMessage: ({commit, state}, newValue) => {
      commit('SET_MESSAGE', newValue)
      return state.message
    },
    setData: ({commit, state}, newValue) => {
      commit('SET_DATA', newValue)
      return state.data
    },
    setToken: ({commit, state}, newValue) => {
      commit('SET_TOKEN', newValue)
      return state.token
    },
    // other actions
    setUsername: ({commit, state}, newValue) => {
      commit('SET_USERNAME', newValue)
      return state.username
    },
    setFavorite: ({commit, state}, newValue) => {
      commit('SET_FAVORITE', newValue)
      return state.favorite
    },
    updateFavorite: ({dispatch, commit, state}, newValue) => {
      commit('UPDATE_FAVORITE', newValue)
      axios({
        method:'patch', 
        url: `https://localhost:9000/api/auth/favorite/${newValue}`, 
        headers: { 
          Authorization: `Bearer ${state.token}` 
        }, 
      })
        .then(res => {
          dispatch('setStatus', res.status)
          dispatch('setMessage', res.data.message)
        })
        .catch(e => console.error(e))
        return state.favorite
    },
    setSearchTag: ({commit, state}, newValue) => {
      commit('SET_SEARCHTAG', newValue)
      return state.searchTag
    },
  }
})