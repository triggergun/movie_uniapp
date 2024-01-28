import Vue from "vue";
import Vuex from "vuex";
import system from "./system";
import movie from "./movie";
import search from "./search";

Vue.use(Vuex);

const store=new Vuex.Store({
    modules:{
        system,
		movie,
		search
    }
});

export default store;
