<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
                <p>{{this.$store.state.user.username}}님 | {{this.$store.state.user.role}}</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="#" 
              class="nav-link"
              @click="logout">
              <i class="ti-power-off"></i>
              <p>
                Logout
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
import axios from "axios"
import {auth} from "../../api"

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logout() {
      // this.$http.post(`/logout`)
      //   .then((result) => {
      //     // this.$store.commit("setAccessToken", {
      //     //   accessToken: null
      //     // })
      //     this.$store.commit("setAuth", {
      //       isAuthorized: false
      //     })
      //     this.$store.commit("setUser", {
      //       username: null,
      //       role: null
      //     })

      //     alert(result.data)
      //     this.$router.push("/login")

      //   }).catch((err) => {
      //     console.log(err.response)
      //   })
      auth.logout()
      .then((result) => {
        // this.$store.commit("setAccessToken", {
        //   accessToken: null
        // })
        this.$store.commit("setAuth", {
          isAuthorized: false
        })
        this.$store.commit("setUser", {
          username: null,
          role: null
        })

        alert(result)
        this.$router.push("/login")
      })
    }
  }
};
</script>
<style>
</style>
