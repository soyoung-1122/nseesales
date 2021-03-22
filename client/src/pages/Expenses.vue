<template>
  <div>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      :picker-options="pickerOptions"
      style="float:left;"
      @change="getExpenseList"
    >
    </el-date-picker>
    <p-button type="info"
      round
      @click.native.prevent="()=>{
        showModal = true
        modalHeader='비용 등록'
        currentModal = 'createModal'
      }"
      style="float:right;"
    >
      등록
    </p-button>
    <p-button type="info"
      round
      @click.native.prevent="()=>{exportSelection = !exportSelection}"
      style="float:right;"
    >
      <i class="ti-clip" />
    </p-button>
    <el-table
      :data="pagedTableData"
      style="width:100%"
      height="500"
      border
    >
      <el-table-column
        v-if="exportSelection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="Index"
        label="#"
        width="60"
        sortable
      />
      <el-table-column
        prop="ExpType"
        label="구분"
        width="90"
        sortable
      />
      <el-table-column
        prop="ExpCustomer"
        label="고객사"
        width="150"
        sortable
      />
      <el-table-column
        prop="ExpProject"
        label="프로젝트명"
        width="200"
        sortable
      />
      <el-table-column
        prop="ExpDate"
        label="사용일시"
        width="170"
        sortable
      />
      <el-table-column
        v-slot="scope"
        prop="ExpEmpId"
        label="사용자"
        width="120"
        :filters="filter"
        :filter-method="filterTag"
        sortable
      >
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{scope.row.ExpEmpId}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus"
              @click.native="expenseInfo(scope.$index)"
            >
              비용 정보
            </el-dropdown-item>
            <el-dropdown-item icon="ti-wand"
              @click.native="editExpense(scope.$index)"
            >
              비용 수정
            </el-dropdown-item>
            <el-dropdown-item
              icon="ti-minus"
              style="color: red;"
            >
              <el-button type="text" 
                style="color: red;"  
                @click="open"
              >
                비용 삭제
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-table-column>
      <el-table-column
        prop="ExpAcct"
        label="계정과목"
        width="100"
        sortable
      />
      <el-table-column
        prop="ExpAcctSub"
        label="세부항목"
        width="100"
        sortable
      />
      <el-table-column
        prop="Store"
        label="사용처"
        width="300"
        sortable
      />
      <el-table-column
        prop="Amount"
        label="사용금액"
        width="100"
        sortable
      />
      <el-table-column
        prop="ExpMethod"
        label="결제방법"
        width="98"
        sortable
      />
    </el-table>
    <p-button type="info"
      round
      style="float:center;"
      v-if="exportSelection"
      @click.native.prevent="()=>{
        
      }"
    >
      저장하기
    </p-button>
    <p-button type="info"
      round
      style="float:center;"
      v-if="exportSelection"
      @click.native.prevent="()=>{
        exportSelection = !exportSelection
      }"
    >
      취소
    </p-button>
    <el-pagination
      :current-page.sync="page.currentPage"
      :page-sizes="[30, 50, 100, 200, page.total]"
      :page-size.sync="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      >
    </el-pagination>
    <modal v-if="showModal" 
        @close="showModal = false"
        :modalHeader="modalHeader"
        @ExpenseAdded="getExpenseList"
    >
      <expense-form slot="body" 
        v-if="currentModal == 'createModal'"
      />
      <expense-info slot="body" 
        v-if="currentModal == 'infoModal'"
        :editData="expenseData"
      />
    </modal>
  </div>
</template>
<script>
import ExpenseForm from "./Expenses/ExpenseForm"
import ExpenseInfo from "./Expenses/ExpenseInfo"

export default {
  components: {
    ExpenseForm,
    ExpenseInfo
  },
  data: function() {
    return {
      exportSelection:false,
      modalHeader: "",
      currentModal: "",
      showModal: false,
      tableData: [],
      pickerOptions: {
          shortcuts: [{
            text: '최근 3개월',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '최근 6개월',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '최근 1년',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 12);
              picker.$emit('pick', [start, end]);
            }
          }],
      },
      page: {
        pageSize: 50,
        total: 0,
        currentPage: 0
      },
      value1: '',
      value2: '',
      expenseData: {
        Index: 0,
        ExpType: '',
        ExpCustomer: '',
        ExpDate: '',
        ExpEmpId: '',
        ExpAcct: '',
        ExpAcctSub: '',
        Store: '',
        Amount: 0,
        ExpMethod: '',
        ExpProject: ''
        
      },
      filter: []
    }
  },
  created() {
    this.setExpenseList()
  },
  methods: {
    open() {
        this.$confirm('삭제 후에는 복구할 수 없습니다.', '삭제하시겠습니까?', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteExpense()
        }).catch(() => {

        });
      },
    filterTag(value, row) {
        return row.ExpEmpId === value;
    },
    clickEmp() {
      console.log("ggg")
    },
    setExpenseList() {
      const start = new Date()
      const end = new Date()

      start.setMonth(start.getMonth() - 3)
      this.value2 = [start, end]
      
      this.getExpenseList(start, end)
    },
    getExpenseList(start, end) {
      if(!end) {
        end = start[1]
        start = start[0]
      }
      
      this.$http.get("http://localhost:4567/test/expense", {
        params: {
        startDate: this.getFormatDate(start),
        endDate: this.getFormatDate(end)
        }
      })
      .then((result) => {
        this.tableData = result.data
        this.page.total = result.data.length
      })
      .catch((err) => console.log(err))   
    },

    getFormatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      var day = date.getDate()
      day = day >= 10 ? day : '0' + day
      return year + '-' + month + '-' + day
    },
    expenseInfo(idx) {
      this.currentModal = "infoModal"
      this.modalHeader = "비용 정보"
      this.showModal = true
      this.expenseData = this.pagedTableData[idx]
      
      this.$http.get("http://localhost:4567/test/expense", {
        params: {
          ExpenseId: "",
        }
      }).then(() => {

      }).catch(() => {
        
      })
    },
    editExpense(idx) {
      this.currentModal = "editModal"
      this.modalHeader = "비용 수정"
      this.showModal = true
      this.expenseData = this.pagedTableData[idx]
      
      this.$http.put("http://localhost:4567/test/expense", {
        params: {
          ExpenseId: "",
        }
      }).then(() => {
        this.setExpenseList()
      }).catch(() => {

      })
    },
    deleteExpense(idx) {
      //id도 같이 와야 삭제를 id로 하지
      // if(this.$store.state.user.role != 'admin') {//( || id 일치안할때)
      
      // }
      this.$http.delete("http://localhost:4567/test/expense",{
        params: {
          ExpenseId: "dfdfdfd"
        }
      }).then(() => {
        this.setExpenseList()
      }).catch(() => {

      })
    }
  },

  computed: {
    pagedTableData() {
      return this.tableData.slice(this.page.pageSize * this.page.currentPage - this.page.pageSize, this.page.pageSize * this.page.currentPage)
    }
  }
}
</script>
<style>
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>