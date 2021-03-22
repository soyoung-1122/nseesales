<template>
  <!-- <card class="case-card">
    ssss
  </card> -->
  <case-form>
    <!-- <form-forecast slot="form"
      v-if="test">
    </form-forecast>
    <form-contract slot="form"
      v-if="!test"
    ></form-contract> -->
    <div slot="formm">
    </div>
    <!-- <p slot="form"
      v-if="!test"
    >
      dkfsjdfh
    </p> -->
  </case-form>
</template> 
<script>
import CaseForm from "./CaseForm";

export default {
  components: {
    CaseForm
  },
  name: "case-card",
  props: {
    case: {
      title: {
        type: String,
        default: "title"
      },
      subTitle: {
        type: String,
        default: "sub-title"
      }
    }
  },
  data: function() {
    return {
      test:true
    }
  }
}
</script>