import axios from "axios"
// import _default from "vuex"
import router from "../router"
import {store} from "../store"
// const UNAUTHORIZED = 476
const REFRESHEXPIRED = 477 

const onUnauthroized = () => { 
  //1. refresh토큰으로 access토큰 재발급요청
  //2. refresh토큰 문제시 logout처리
  //3. login 상태일 때 로그인 페이지 요청은 어떻게 처리할지
  //go에서 access토큰 확인해서 만료됐으면 바로 refresh토큰 확인해서 
  //토큰 재발급해줌 -> refresh 토큰 만료 -> 로그아웃 처리
  // router.push('/login') 
  request("post", "refresh")
  .then((result) => {
    console.log(result.access_token)
    setAuthInHeader(result.access_token)
  }).catch((result)=> {
    const {status} = result.response
    if (status == REFRESHEXPIRED) {
      store.commit("setAuth", {
        isAuthorized: false
      })
      router.push("/login")
    }
  })
} 

export const refresh = () => {
  axios.post("/refresh")
  .then((result) => {
    setAuthInHeader(result.data.access_token)
  })
  .catch((result) => {
    const {status} = result.response
    if (status == REFRESHEXPIRED) {
      store.commit("setAuth", {
        isAuthorized: false
      })
      if(router.currentRoute.path != "/login") {
        alert("login required")
        router.push("/login")
      }
    }
  })
}

const request = (method, url, data) => { 
  return axios ({ 
      method, 
      url, 
      data 
  })
  .then(result => result.data) 
  .catch((result) => { 
      // const {status} = result.response 
      // if (status === UNAUTHORIZED) { //여기서 access token 만료인지 refresh token 만료인지 상태코드로 확인 
      //   return refresh()
      // } 
      // else if (status == REFRESHEXPIRED) {
      //   store.commit("setAuth", {
      //     isAuthorized: false
      //   })
      //   router.push("/login")
      // }
      throw Error(result) 
  }).finally(() => {
    return refresh()
  })
} 

export const auth = {
  // login(username, password) {
  //   return request("post", "/login", {username, password})
  // },
  logout() {
    return request("post", "/logout")
  },
  userTest() {
    return request("post", "/refresh")
  }
}
// export const todo = {
//   todoTest(todos) {
//     return request("get", "/users", todos)
//   }
// }

export const users = {
  getUserList() {
    return request("get", "/users")
  }, 
  getUser(id) {
    return request("get", "/users/"+id)
  },
  createUser() {
    return request("post", "/users")
  },
  editUser(id, userInfo) {
    return request("put", "/users/"+id, userInfo)
  },
  deleteUser(id) {
    return request("delete", "/users/"+id)
  }
}
export const setAuthInHeader = token => {
  store.commit("setAccessToken", {
    accessToken: token
  })
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;

}