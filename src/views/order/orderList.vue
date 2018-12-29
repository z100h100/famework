<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="运单号">
          <el-input v-model="formInline.waybillNo" placeholder="运单号"></el-input>
        </el-form-item>
        <el-form-item label="开单日期">
          <el-date-picker
            v-model="formInline.waybillDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            style="width: 380px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经办人">
          <el-select v-model="formInline.operator" style="width:180px" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in allUserList"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="orderList" v-loading.body="listLoading" element-loading-text="Loading" border fit
              highlight-current-row>
      <el-table-column label="运单号" width="200" align="center">
        <template slot-scope="scope">
          <div class="waybillNoClass" @click="waybillNoClick(scope.row)">{{scope.row.waybillNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="开单时间" min-width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.waybillDate ? $moment(scope.row.waybillDate).format('YYYY-MM-DD hh:mm:ss') : ''}}
        </template>
      </el-table-column>
      <el-table-column label="发货人" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.deliveryPerson}}
        </template>
      </el-table-column>
      <el-table-column label="收货人" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.receivingPerson}}
        </template>
      </el-table-column>
      <el-table-column label="运单状态" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.status | filterStatus(statusList)}}
        </template>
      </el-table-column>
      <el-table-column label="发站" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.departureStation}}
        </template>
      </el-table-column>
      <el-table-column label="到站" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.arriveStation}}
        </template>
      </el-table-column>
      <el-table-column label="送货方式" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.deliveryMode | filterMode(deliveryMode)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: right;margin-top: 10px"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        list: null,
        allUserList: [],
        listLoading: true,
        formInline: {
          waybillDate: this.getSeventDays(),
          waybillNo: '',
          operator: ''
        },
        statusList: [
          {
            name: '已入库',
            code: '0'
          },
          {
            name: '短驳中',
            code: '1'
          },
          {
            name: '已装车',
            code: '2'
          },
          {
            name: '已发车',
            code: '3'
          },
          {
            name: '已到达',
            code: '4'
          },
          {
            name: '已卸车',
            code: '5'
          },
          {
            name: '中转中',
            code: '6'
          },
          {
            name: '已接收',
            code: '7'
          },
          {
            name: '送货中',
            code: '8'
          },
          {
            name: '已送货',
            code: '9'
          },
          {
            name: '已签收',
            code: '10'
          },
          {
            name: '待补录',
            code: '11'
          },
          {
            name: '提货中',
            code: '12'
          },
          {
            name: '已提货',
            code: '13'
          },
          {
            name: '网点中转中',
            code: '14'
          },
          {
            name: '网点中转已接收',
            code: '15'
          },
          {
            name: '预装车',
            code: '16'
          },
          {
            name: '部分短驳中',
            code: '17'
          },
          {
            name: '部分短驳完成',
            code: '18'
          },
          {
            name: '部分装车',
            code: '19'
          },
          {
            name: '部分发车',
            code: '20'
          },
          {
            name: '部分到达',
            code: '21'
          },
          {
            name: '部分送货中',
            code: '22'
          },
          {
            name: '部分送货完成',
            code: '23'
          },
          {
            name: '部分签收',
            code: '24'
          },
          {
            name: '部分入库',
            code: '25'
          }
        ],
        deliveryMode: [
          {
            name: '自提',
            code: '0'
          },
          {
            name: '送货',
            code: '1'
          },
          {
            name: '送货上门',
            code: '2'
          },
          {
            name: '送货上楼(有电梯)',
            code: '3'
          },
          {
            name: '送货上楼(无电梯)',
            code: '4'
          },
          {
            name: '送货卸货',
            code: '5'
          },
          {
            name: '送货安装',
            code: '6'
          },
          {
            name: '整车直送',
            code: '7'
          },
          {
            name: '大车直送',
            code: '8'
          }
        ]
      }
    },
    filters: {
      filterStatus (value, list) {
        if (value == '99') {
          return '创建订单'
        }
        let valueName = ''
        list.map(item => {
          if (item.code == value) valueName = item.name
        })
        return valueName
      },
      filterMode (value, list) {
        let valueName = ''
        list.map(item => {
          if (item.code == value) valueName = item.name
        })
        return valueName
      }
    },
    computed: {
      ...mapState({
        // 已关联列表
        orderList: state => state.order.orderList.content,
        total: state => state.order.orderList.totalElements,
        pageSize: state => state.order.orderList.size,
        currentPage: state => state.order.orderList.number + 1,
        user: state => state.user.user
      })
    },
    mounted () {
      this.getAllUser()
      this.fetchData()
    },
    methods: {
      ...mapActions([
        'getWaybillPage',
        'getUserAllUser'
      ]),
      showDetail (id) {
        this.$router.push({name: 'orderDetail', params: {id: id}})
      },
      waybillNoClick (row) {
        this.$router.push({name: 'orderTrack', params: {id: row.id}})
      },
      getSeventDays () {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
      getAllUser () {
        this.getUserAllUser().then(res => {
          this.allUserList = res.data.data
          this.formInline.operator = this.user.id
        })
      },
      /**
       * @description 已关联案事件改变页码后请求接口数据
       * @pageSize 每页显示数据记录数
       */
      pageSizeChange (pageSize) {
        this.fetchData(pageSize)
      },
      /**
       * @description 已关联案事件当前页码改变后处理数据
       * @pageNo 当前页码
       */
      currentPageChange (pageNo) {
        this.fetchData(this.pageSize, pageNo - 1)
      },
      fetchData (pageSize = 10, pageNo = 0) {
        this.listLoading = true
        let params
        if (this.formInline.waybillDate && this.formInline.waybillDate.length) {
          params = {
            pageNo,
            pageSize,
            params: [
              {
                andOr: "and",
                name: "waybillNo",
                operation: "like",
                value: this.formInline.waybillNo
              },
              {
                andOr: "and",
                name: "waybillDate",
                operation: "between",
                value: ['#toDate' + new Date(this.formInline.waybillDate[0]).getTime(), '#toDate' + new Date(this.formInline.waybillDate[1]).getTime()]
              },
              {
                andOr: "and",
                name: "operator.id",
                operation: "eq",
                value: this.formInline.operator
              }
            ]
          }
        } else {
          params = {
            pageNo,
            pageSize,
            params: [
              {
                andOr: "and",
                name: "waybillNo",
                operation: "like",
                value: this.formInline.waybillNo
              },
              {
                andOr: "and",
                name: "operator.id",
                operation: "eq",
                value: this.formInline.operator
              }
            ]
          }
        }
        this.getWaybillPage(params).then(res => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .waybillNoClass {
    color: #409EFF;
    cursor: pointer;
  }
</style>
