<template>
  <div class="app-container">
    <div style="height: 100%;position: relative;">
      <div class="consignment">
        <div class="consignmentOpen">运单号：WSCDNB81251093L <span>已入库 【邦达通】</span></div>
        <div class="consignmentTitle">货物托运单</div>
        <div class="consignmentInfo"><span>汪元周</span><span>2018-12-19 16:48:45</span></div>
      </div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" noborder fit highlight-current-row>
        <el-table-column label="操作类型" width="200">
          <template slot-scope="scope">
            <div class="createWaybill">创建运单</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="150" align="center">
          <template slot-scope="scope">
            {{scope.row.pageviews}}
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.pageviews}}
          </template>
        </el-table-column>
        <el-table-column label="操作描述" align="center">
          <template slot-scope="scope">
            {{scope.row.pageviews}}
          </template>
        </el-table-column>
        <el-table-column label="上传图片" align="center">
          <template slot-scope="scope">
            {{scope.row.pageviews}}
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-list fixed-buttom">
        <el-form :inline="true" :model="formInline" ref="ruleForm" class="demo-form-inline">
          <el-form-item label="状态类型" prop="status">
            <el-select v-model="formInline.status" style="width:290px" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInline.waybillDate"
              type="daterangetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1"
              style="width:150px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作描述">
            <el-input v-model="formInline.status" placeholder="不超过100个字!" style="width: 200px" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="用户可见">
            <el-checkbox v-model="formInline.status"></el-checkbox>
          </el-form-item>
        </el-form>
        <div style="margin: 0 auto;text-align: center">
          <el-button type="primary" @click="fetchData()">保存跟踪</el-button>
          <el-button type="primary" @click="upload()">上传图片</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        formInline: {},
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
        list: [
          {
            pageviews: 1
          }
        ],
        listLoading: true
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.listLoading = false
        // getList(this.listQuery).then(response => {
        //   this.list = response.data.items
        //   this.listLoading = false
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-list {
    margin-left: 15px;
    background-color: #FFFFFF;
    position: relative;
    padding: 0 0 20px 200px;

    &.fixed-buttom {
      position: fixed;
      bottom: 0;
      right: 15px;
      left: 0;
      padding: 10px 0 10px 300px;
      border-top: 1px solid #edeff4;
    }
  }
  .consignment {
    display: flex;
    .consignmentOpen {
      flex: 1;
      text-align: left;
      >span {
        color: red;
        font-weight: bold;
        font-size: 12px;
      }
    }
    .consignmentTitle {
      flex: 1;
      text-align: center;
      font-size: 24px;
      color: #333;
      line-height: 30px;
      letter-spacing: 16px;
      &:after {
        content: "";
        display: block;
        height: 4px;
        margin-top: 6px;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
      }
    }
    .consignmentInfo {
      flex: 1;
      text-align: right;
      span {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
  .createWaybill {
    color: red;
  }
</style>
