<template>
  <div class="app-container">
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
    </el-table>
  </div>
</template>

<script>

  export default {
    data () {
      return {
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
