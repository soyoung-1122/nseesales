<template>
  <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      drag
      :limit="1"
      :file-list="fileList"
      :http-request="requestUpload"
      accept=".csv, .CSV"
      :auto-upload="true"
    >
      <i class="el-icon-upload" />
      <div class="el-upload_text">파일을 드래그하거나 <em style="color:#68B3C8;">클릭해서 업로드하기</em></div>
      <div class="el-upload_tip" slot="tip">csv 파일만 업로드 가능</div>
    </el-upload>
</template>
<script>
export default {
  data: function() {
    return {
      fileList: [],
      file:null
    }
  },
  methods: {
    requestUpload(param) {
      const fileObj = param.file
      const formData = new FormData()
      console.log(fileObj)
      // console.log(param)
      formData.append('file', fileObj)
      console.log(fileObj)
      // console.log(this.fileList[0].name)

      this.$http.post('http://localhost:4567/test/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
        // data: formData
      }).then(res => console.log(res))
      .catch(e => console.log(e))
    }
  }
}
</script>