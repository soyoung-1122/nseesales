<template>
  <div style="width:2000px;">
    <el-radio v-model="radio" label="1">수기 등록</el-radio>
    <el-radio v-model="radio" label="2">csv파일 업로드</el-radio>
    <expense-upload 
      v-if="this.radio == '2'"
    />
    <div class="createExpense"
      v-if="this.radio == '1'"
    >
    <el-form ref="form" 
      :model="form" 
      :inline="true" 
      label-width="auto">
      <el-form-item label="등록자">
        <el-select v-model="expenseData.ExpEmpId" placeholder="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="결제방법">
        <el-select v-model="expenseData.ExpMethod" placeholder="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="결제일자">
        <!-- 수정 일시랑 픽되는 일시랑 포맷 일치해야함 -->
        <el-date-picker
          v-model="expenseData.ExpDate"   
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="프로젝트명">
        <el-autocomplete
          v-model="expenseData.ExpProject"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="계정과목">
        <el-select v-model="expenseData.ExpAcct" placeholder="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="세부항목">
        <el-select v-model="expenseData.ExpAcctSub" placeholder="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="고객사">
        <el-input type="text"
          v-model="expenseData.ExpCustomer"
        />
      </el-form-item>
      <el-form-item label="카드사">   <!-- 개인카드인 경우만 보이게 -->
        <el-input type="text" 
          v-model="expenseData.Card"
        />
      </el-form-item>
      <el-form-item label="카드번호">
        <el-input type="text" 
          v-model="expenseData.Cardno"
        />
      </el-form-item>
      <br>
      <el-form-item label="사용금액"
        :rules="[
          {required: true, message: '사용금액을 입력해주세요'},
          {type: 'number', message: '숫자를 입력해주세요'}
        ]"
      >
        <el-input type="text" 
          v-model="expenseData.Amount"
        />
      </el-form-item>
      <el-form-item label="부가세"
        :rules="[
          {required: true, message: '부가세를 입력해주세요'},
          {type: 'number', message: '숫자를 입력해주세요'}
        ]"
      >
        <el-input type="text" 
          v-model="expenseData.Tax"
        />
      </el-form-item>
      <el-form-item label="km"
        :rules="[
          {type: 'number', message: '숫자를 입력해주세요'}
        ]"
      >
        <el-input type="text" 
          v-model="expenseData.Km"
        />
      </el-form-item>
      <br>
      <el-form-item label="사업자번호"
        :rules="[
          {required: true, message: '사업자번호를 입력해주세요'},
          {type: 'number', message: '숫자를 입력해주세요'}
        ]"
      >
        <el-input type="text" 
        
          v-model="expenseData.Bizno"
        />
      </el-form-item>
      <el-form-item label="사용처"
        :rules="[
          {required: true, message: '사용처를 입력해주세요'}
        ]"
      >
        <el-input type="text" 
          v-model="expenseData.Store"
        />
      </el-form-item>
      <br>
      <el-form-item label="상세내용">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="expenseData.Textarea">
        </el-input>
      </el-form-item>
      <br>
      <p-button type="info"
                round
                @click.native.prevent="updateProfile(editor == true ? 'admin' : null)"
      >
        비용 등록
      </p-button>
    
      </el-form>
    </div>
  </div>
</template>
<script>
import ExpenseUpload from "./ExpenseUpload"

export default {
  props:["editData"],
  components: {
    ExpenseUpload
  },
  data: function() {
    return {
      radio: '1',
      expDate: "",
      expenseData: {
        ExpType: '',
        ExpCustomer: '',
        ExpDate: '',
        ExpEmpId: '',
        ExpAcct: '',
        ExpAcctSub: '',
        Store: '',
        Amount: '',
        Tax: '',
        ExpMethod: '',
        ExpProject: '',
        Bizno: '',
        Remark: '',
        Card: '',
        Cardno: '',
        Km: '',
        Textarea: ''
      }
    }
  },
  mounted() {
    if(this.editData) {
    }
  }
}
</script>