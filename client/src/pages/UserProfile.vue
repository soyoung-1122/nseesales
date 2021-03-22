<template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <user-card>

        </user-card>
        <members-card v-bind="members"
          @editUser="edit"
        >

        </members-card>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <edit-profile-form
          :member="editMember"
          :editor="editor"
        >

        </edit-profile-form>
      </div>
    </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import MembersCard from "./UserProfile/MembersCard.vue";
import {users} from "../api"

export default {
  data: function() {
    return {
      members: null,
      member: {
        username: null,
        role: null
      },
      editMember: null,
      editor: false
    }
  },
  components: {
    EditProfileForm,
    UserCard,
    MembersCard
  },
  created() {
    users.getUserList()
    .then((result) => {
      this.members = result
    }).catch((result) => {
      console.log(result)
    })
  },
  mounted () {
    users.getUser(this.$store.state.user.username)
      .then((result) => {
        this.member.username = result.username
        this.member.role = result.role
        this.editMember = this.member
        // this.editor = false
      })
      .catch()
  },
  methods: {
    edit(member) {
      this.editMember = member
      this.editor = true
    }
  }
};
</script>
<style>
</style>
