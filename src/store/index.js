import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index';
import api from "./modules/api";

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        index,
        api
    }
})
export default store;