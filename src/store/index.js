import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "bg-white",
    isRTL: false,
    mcolor: "",
    isNavFixed: true,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    currentNamePage: [],
    currentUrlPage: [],
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    histologi: {
      feed: {},
      form: {},
    },
    update_histologi: {},
  },
  mutations: {
    SET_HISTOLOGI_FEED(state, payload) {
      state.histologi.feed = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    setNamePage(state, payload) {
      state.currentNamePage = payload;
    },
    setUrlPage(state, payload) {
      state.currentUrlPage = payload;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    user(state) {
      if (state.user != null) return JSON.parse(state.user);
      return state.user;
    },
    getNamePage(state) {
      return state.currentNamePage;
    },
    getUrlPage(state) {
      return state.currentUrlPage;
    },
  },
});
