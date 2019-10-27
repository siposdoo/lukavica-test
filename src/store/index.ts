import Vue from 'vue'
import Vuex from 'vuex'
import CoinModel from '../models/CoinModel';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      coins: Array<CoinModel>()
  },

  mutations: {
    addToCoins(state, payload) {
      let index = state.coins.findIndex(coin => coin.value === payload.value)
      
      if(index<0)
      {
        
      return state.coins.push(payload);
    }else{
      return state.coins[index].counts=Number(state.coins[index].counts)+Number(payload.counts)
      
    }
  },
  updateCoins(state, payload) {
    let index = state.coins.findIndex(coin => coin.id === payload.id)
    state.coins[index].counts=payload.counts
    state.coins[index].value=payload.value
},
  deleteCoin(state, payload){
   
    let index = state.coins.findIndex(coin => coin.id === payload.id)
    state.coins.splice(index, 1)
   }
  },

  actions: {
    addToCoins(context) {
      context.commit('addToCart')
    },
    updateCoins ({commit}, payload) {
                   
      commit('updateCoins', payload)
  
},
    deleteCar ({commit}, payload) {
                   
            commit('deleteCoin', payload)
        
    }
  },
  getters: {
   
    coins: state => state.coins.sort((a, b) => b.counts - a.counts ),
    coinsByVal: state => state.coins.sort((a, b) => b.value - a.value ),

  }
})
