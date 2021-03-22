<template>
  <div>
    <p>forecast form</p>
      <div class="col-md-6">
        <label>
        <el-select v-model="selected" 
          placeholder="Select"
          :disabled="this.$store.state.user.role == 'admin' ? false : true"
        >
          <el-option
            v-for="item, index in contacts"
            :key="index"
            :label="item.name"
            :value="item.name"
            >
          </el-option>
        </el-select></label>
      </div>
      <div class="col-md-12">
        <fg-input type="text"
                  label="프로젝트명"
                  placeholder="프로젝트명"
        >
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="Contact"
                  placeholder="이소영"
        >
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="Contact"
                  placeholder="이소영"
        >
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="Contact"
                  placeholder="이소영"
        >
        </fg-input>
      </div>
    <div class="text-center">
      <p-button type="info"
                round
                @click.native.prevent="updateProfile(editor == true ? 'admin' : null)"
      >
        forecast 등록
      </p-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormForecast",
  data: function() {
    return {
      selected: "이소영",
      contacts: [
        {
          name: "이소영"
        },
        {
          name: "이소영2"
        }
      ]
    }
  }
}
</script>