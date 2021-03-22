<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Company"
                      :readonly="true"
                      placeholder="Paper dashboard"
                      v-model="user.company">
            </fg-input>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      label="Username"
                      placeholder="Username"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Role"
                      placeholder="Role"
                      v-model="user.role"
                      :readonly="user.role == 'admin' ? false : true">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Address"
                      placeholder="Home Address"
                      v-model="user.address">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="City"
                      placeholder="City"
                      v-model="user.city">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Country"
                      placeholder="Country"
                      v-model="user.country">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number"
                      label="Postal Code"
                      placeholder="ZIP Code"
                      v-model="user.postalCode">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Here can be your description"
                        v-model="user.aboutMe">

              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile(editor == true ? 'admin' : null)"
          >
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import {users} from "../../api";

export default {
  props:["member", "editor"],
  data() {
    return {
      user: {
        company: "Nalin tech",
        username: "",
        email: "",
        role: "",
        firstName: "soyoung",
        lastName: "lee",
        country: "Korea",
        city: "Hanam",
        postalCode: "",
        aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
      }
    };
  },
  // mounted() {
  //   this.user.username = this.member.username
  //   this.user.role = this.member.role
  // },
  watch: {
    member() {
      this.user.username = this.member.username
      this.user.role = this.member.role
    }
  },
  methods: {
    updateProfile(editor) {
      // alert("Your data: " + JSON.stringify(this.user));
      //여기에 admin이 다른 유저 수정할지 본인이 자기 정보 수정할지에 따라 다르게 적용돼야 함.
      users.editUser(this.member.username, this.user)
      .then((result) => {
        console.log(result)
        if(editor != "admin") {
          this.$store.commit("setUser", {
            username: result.username,
            role: this.user.role
          })
        }
        this.$message.success("profile update successful");
        this.$emit("editedUserInfo", this.user)
      }).catch((result) => {
        console.log(result)
      })
    }
  }
};
</script>
<style>
</style>
