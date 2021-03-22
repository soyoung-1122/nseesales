<template>
  <div>
    <p-button type="info"
      round
      @click.native.prevent="()=>{showModal = true}"
    >
      등록
    </p-button>
    <div id="test">
      <div style="background-color:cadetblue; width:250px; height:200px;">
        25%
      </div>
      <div style="background-color:darkgrey; width:250px; height:200px;">
        50%
      </div>
      <div style="background-color:cornflowerblue; width:250px; height:200px;">
        75%
      </div>
      <div style="background-color:darksalmon; width:250px; height:200px;">
        100%
      </div>
    </div>
    <modal v-if="showModal" 
      @close="showModal = false"
    >
      <case-form slot="body">
      </case-form>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
// import CaseCard from '../components/Cards/CaseCard.vue'
import CaseCard from "./Cases/CaseCard" //이건 등록된 매출내역 볼때 
import CaseForm from './Cases/CaseForm.vue'
export default {
  components: { CaseForm },
  // components: { CaseCardModal },
  data: function() {
    return {
      showModal: false,
      // :on-success="success"
      // :on-error="error"
      // :on-change="change"
      // :on-progress="progress"
    }
  },
  // mounted() {
  //      window.updateUpLoadFileSinglr = this.updateUpLoadFileSinglr;
  //   },
  methods: {
    progress(e, file) {
      console.log(e)
    },
    change(file) {
      console.log(this.fileList)
    },
    error(err, file, fileList) {
      console.log("err"+err)
      console.log(file)
    },
    success(res, file, fileList) {
      console.log("file"+file)
    },

  }
}
</script>
<style>
  #test > div {
    float: left;
    display: block;
  }
</style>
