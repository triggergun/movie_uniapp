import Vue from "vue";
import Vuex from "vuex";
import system from "./system";
import movie from "./movie";

Vue.use(Vuex);

const store=new Vuex.Store({
    modules:{
        system,
		movie
    }
});

export default store;
