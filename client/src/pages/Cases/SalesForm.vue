<template>
  <div>
    <p>sales form</p>
    <div class="text-center">
      <div class="col-md-6">
        <fg-input type="text"
                  label="담당자"
                  placeholder="이소영"
        >
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="프로젝트명"
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
      <div class="col-md-6">
        <fg-input type="text"
                  label="Contact"
                  placeholder="이소영"
        >
        </fg-input>
      </div>
      <p-button type="info"
                round
                @click.native.prevent="updateProfile(editor == true ? 'admin' : null)"
      >
        매출 등록
      </p-button>
    </div>
  </div>
  
</template>
<script>
export default {
  name: "FormSales"
}
</script>