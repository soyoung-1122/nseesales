import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios"
import {store} from '../store'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: "history",
  linkActiveClass: "active"
});

router.beforeEach( async(to, from, next) => {
//   axios.post(`/auth`) //access token validation
//   .then(() => { //if valid
//     store.commit("setAuth", {
//       isAuthorized: true
//     })
//   }).catch(() => { //if not
//     axios.post(`/refresh`) //try refresh token
//     .then(() => { //if success
//       store.commit("setAuth", {
//         isAuthorized: true
//       })
//       axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`
//     }).catch(()=> { //if fail
//       axios.post(`/logout`)
//             .then(() => {
  
//             }).catch(() => {
              
//             })
//       store.commit("setAuth", {
//         isAuthorized: false
//       })
//     })
//   })
      
    const isAuthorized = store.getters.tokenAuthorized
  
    if(to.matched.some(function(routeInfo) {
      return routeInfo.meta.requireAuth
    })) {
      if(isAuthorized) {
        alert("already logined")
        router.push("/")
      } 
      else {
        next()
      }
    } else {
      if(isAuthorized) {
        next()
      } else {
        alert("login required")
        router.push("/login")
      }
    
    }
  })

export default router;
