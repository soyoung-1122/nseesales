/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from 'axios'
import {store} from "./store"
import locale from "element-ui/lib/locale/lang/ko"
// import {setAuthInHeader} from "./api"  // refresh

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(ElementUI, {locale});
Vue.use(PaperDashboard);

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:4000/api/v1"
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function(config) {
    // refresh()
    // console.log("before"+axios.defaults.headers.common['Authorization'])
    if(config.headers.common.Authorization != null) {
      const token = store.getters.AccessToken //아니 근데 access 토큰 재발급을 해줘야하자나ㅠㅠ
      axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
      // console.log("after"+axios.defaults.headers.common['Authorization'])
    }
    return config
  },
  function(error) {
    

    return Promise.reject(error)
  })

  axios.interceptors.response.use(response => response, error => {
      // 오류 응답을 처리
      // ...
      const originalRequest = error.config;

      console.info(error.config)
      console.log(axios.defaults.headers.common['Authorization'])

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.post('/refresh').then((result) => {
        setAuthInHeader(result.data.access_token, originalRequest)
        // originalRequest.defaults.headers.common['Authorization'] = result.data.access_token
        return axios(originalRequest)
      })      
    };
      return Promise.reject(error);
  });
/* eslint-disable no-new */
new Vue({
  router,
  store,
  beforeCreate() {
    const token = store.getters.AccessToken
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  },
  render: h => h(App)
}).$mount("#app");

const setAuthInHeader = (token, originalRequest) => {
  store.commit("setAccessToken", {
    accessToken: token
  })
  originalRequest.headers.Authorization = token ? `Bearer ${token}` : null;

}

17