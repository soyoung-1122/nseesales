<template>
  <card class="card" :title="title">
    <div>
      <ul class="list-unstyled team-members">
        <li>
          <div class="row" v-for="member in members" :key="member.username">
            <div class="col-3">
              <div class="avatar">
                <img src="@/assets/img/faces/face-0.jpg" alt="Circle Image" class="rounded img-fluid">
              </div>
            </div>
            <div class="col-6">
              {{member.username}}
              <br>
              <!-- <span :class="getStatusClass(member.status)"> -->
                <small>{{member.role}}</small>
              <!-- </span> -->
            </div>
            <div class="col-3">
              <p-button type="success" outline icon>
                <i class="fa fa-envelope"></i>
              </p-button>
            </div>
            <div 
              class="col-3"
              v-if="role == 'admin' ? true : false"
              @click="editUser(member)"
            >
              <p-button type="success" outline icon>
                <i class="ti-pencil"></i>
              </p-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </card>
</template>
<script>
import {users} from "../../api"
export default {
  data() {
    return {
      role: null,
      title: "Team members",
      members: []
      //   {
      //     image: require("@/assets/img/faces/face-0.jpg"),
      //     name: "Dj Khaled",
      //     status: "Offline"
      //   },
      //   {
      //     image: require("@/assets/img/faces/face-1.jpg"),
      //     name: "Creative Tim",
      //     status: "Available"
      //   },
      //   {
      //     image: require("@/assets/img/faces/face-1.jpg"),
      //     name: "Flume",
      //     status: "Busy"
      //   }
      // ]
    };
  },
  mounted () {
    this.role = this.$store.state.user.role
    users.getUserList()
    .then((result) => {
      this.members = result

    }).catch((result) => {
      console.log(result)
    })
  },
  methods: {
    editUser(member) {
      this.$emit("editUser", member)
    },
    getStatusClass(status) {
      switch (status) {
        case "Offline":
          return "text-muted";
        case "Available":
          return "text-success";
        case "Busy":
          return "text-danger";
        default:
          return "text-success";
      }
    }
  }
};
</script>
<style>
</style>
