<template>
  <div id="login">
      <div class="header">
        <h2 class="logo">LOGO HERE</h2>
      </div>
      <div class="login">
        <el-card>
          <h2>Login</h2>
          <el-form
            class="login-form"
            :model="model"
            :rules="rules"
            ref="form"
            @submit.native.prevent="login"
          >
            <el-form-item prop="username">
              <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="model.password"
                placeholder="Password"
                type="password"
                prefix-icon="fas fa-lock"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block
              >Login</el-button>
            </el-form-item>
            <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a>
          </el-form>
        </el-card>
      </div>
      <div class="footer">
        <div class="links">
          <span>Feature 1</span>
          <span>Feature 2</span>
          <span>Feature 3</span>
        </div>
        <div class="version">Version 1.0.0</div>
      </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "login",
  data() {
    return {
      // validCredentials: {
      //   username: null,
      //   password: null
      // },
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // simulateLogin() {
    //   return new Promise(resolve => {
    //     setTimeout(resolve, 300);
    //   });
    // },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      const data = {
        username: this.model.username,
        password: this.model.password
      }
      this.loading = true;
      this.$http.post(`/login`, data)
        .then((result) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`
          
          this.$store.commit("setAccessToken", {
            accessToken: result.data.access_token
          })
          this.$store.commit("setAuth", {
            isAuthorized: true
          })
          this.$store.commit("setUser", {
            username: result.data.username,
            role: result.data.role
          })

          this.$message.success("Login successful");
          this.$router.push("/")
        }).catch((err) => {
          this.$message.error("Username or password is invalid");
          console.log(err.response)
        })
      this.loading = false;
      

    }
  }
};
</script>

<style lang="scss">
#login {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  // background: #102a43;

}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
