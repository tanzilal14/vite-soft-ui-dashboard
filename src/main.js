/*
=========================================================
* Vite Soft UI Dashboard - v1.0.0
=========================================================
* Product Page: https://creative-tim.com/product/vite-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
* Licensed under MIT (https://github.com/creativetimofficial/vite-soft-ui-dashboard/blob/556f77210e261adc3ec12197dab1471a1295afd8/LICENSE.md)
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/nucleo-svg.css";
import "./assets/scss/custom.scss";
import SoftUIDashboard from "./soft-ui-dashboard";
import { defineRule } from "vee-validate";
import { plugin, defaultConfig } from "@formkit/vue";
import AllRules from "@vee-validate/rules";
// import setLocale from "@vee-validate/i18n";
// import { localize } from "vee-validate";
import {
  ApolloLink,
  from,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApolloProvider } from "@vue/apollo-option";
import { createUploadLink } from "apollo-upload-client";
import "bootstrap-icons/font/bootstrap-icons.scss";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import PlaceBrowser from "./views/components/PlaceBrowser.vue";
// import "leaflet/dist/leaflet.css";
import { onError } from "apollo-link-error";

import "animate.css";
// import { setLocale } from "vee-validate/i18n";
// setLocale("en");
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});
const httpLink = createUploadLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_BASE_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(function (data, code) {
      if (data.code == "UNAUTHENTICATED") {
        store.commit("SET_TOKEN", null);
        store.commit("SET_USER", null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = `/`;
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();

window.customFetch = function (url, opts = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(opts.method || "get", url);

    for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);

    xhr.onload = (e) =>
      resolve({
        ok: true,
        text: () => Promise.resolve(e.target.responseText),
        json: () => Promise.resolve(JSON.parse(e.target.responseText)),
      });

    xhr.onerror = reject;

    if (xhr.upload)
      xhr.upload.onprogress = (event) =>
        console.log(`${(event.loaded / event.total) * 100}% uploaded`);
    // console.info(opts);
    xhr.send(opts.body);
  });
};

const apolloClient = new ApolloClient({
  cache,
  link: from([authMiddleware, errorLink, httpLink]),
  // link: authMiddleware.concat(createUploadLink({
  //   uri: import.meta.env.VITE_BASE_URL,
  //   // fetch:typeof window === 'undefined' ? global.fetch : customFetch
  // })),
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

router.beforeEach((to, from, next) => {
  if (to.name == "logout") {
    let tempheder = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // axios.get(baseUrlApi+'/logout',tempheder);
    store.commit("SET_TOKEN", null);
    store.commit("SET_USER", null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    next({
      path: "/",
      params: { nextUrl: to.fullPath },
    });
  } else if (to.meta.auth === true) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.meta.auth === false) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({ name: "Dashboard" });
    }
  } else {
    next();
  }
});

window.formatAsCurrency = function (value, dec) {
  dec = dec || 0;
  if (value === null) {
    return 0;
  }
  value = parseInt(value) || 0;
  return "" + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

// window.makeId = function (data) {
//   return data.toLowerCase().split(" ").join("_");
// };

let app = createApp(App)
  .use(store)
  .use(router)
  .use(apolloProvider)
  .use(SoftUIDashboard)
  .use(VueSweetalert2)
  .use(plugin, defaultConfig)
  .provide(DefaultApolloClient, apolloClient)
  .component("v-select", vSelect)
  .component("Datepicker", Datepicker)
  .component("PlaceBrowser", PlaceBrowser);

app.config.globalProperties.makeId = (data) => {
  return data.toLowerCase().split(" ").join("_");
};
app.config.globalProperties.makeList = (data, varName) => {
  var dataList = [];
  data.forEach((item) => {
    dataList.push(item[varName]);
  });
  return dataList;
};

app.config.globalProperties.extractId = (data) => {
  return {
    product_id: data.id,
  };
};
app.config.globalProperties.makeTime = (data) => {
  if (data.length === 5) {
    return data + ":00";
  } else {
    return data;
  }
};
app.config.globalProperties.extractList = (data) => {
  if (typeof data === "string") {
    return [...data.split()];
  } else {
    return [...data];
  }
};
app.config.globalProperties.extractProduct = (data) => {
  let newData = [];
  data.forEach((item) => {
    if (Object.keys(item).length !== 0) {
      newData.push({ product_id: item.id });
    }
  });

  return newData;
};

app.mount("#app");
