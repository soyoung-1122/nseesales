<template>
  <p>
    결제금액 {{expenseData.Amount}} <br>
    결제타입 {{expenseData.ExpType}}<br>
    고객사 {{expenseData.ExpCustomer}}<br>
    결제일 {{expenseData.ExpDate}}<br>
    사용처 {{expenseData.Store}}<br>
  </p>
</template>
<script>
export default {
  props: ["expenseData"]
}
</script>