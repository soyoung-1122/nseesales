<template>
  <div>
    <card class="card">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <el-select placeholder="선택"
              v-model="selected"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <slot name="form">
            <form-forecast v-if="selected == 'forecast'"></form-forecast>
            <form-sales v-else></form-sales>
          </slot>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
    </card>
  </div>

 
</template>
<script>
import {users} from "../../api";
import FormForecast from "./ForecastForm";
import FormSales from "./SalesForm";

export default {
  components: {
    FormForecast,
    FormSales
  },
  props:["member", "editor"],
  data() {
    return {
      selected:"forecast",
      options: [
        {
          value: "forecast",
          label: "forecast 등록"
        },
        {
          value: "sales",
          label: "매출 등록"
        }
      ],
      case: {
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
    change(item){
      console.log(item.value)
    }
    ,
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
