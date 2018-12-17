<template>
  <div class="container-fluid">
    <div>
      <div class="header-title">
        邦达通物流管理系统
      </div>
      <el-form inline ref="form" :model="searchModel" class="header-search">
        <el-form-item style="margin-left: 20px">
          <el-input v-model="searchModel.name" placeholder="请输入查单号/运单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="searchResult" class="row outline-panel center-block order-content">
      <div class="order_detail fn-clear">
        <div class="p-left-continer">
          <div class="p-left">
            <div class="outline-panel">
              <ul>
                <li><span>运单号:&nbsp;HEHFSH81250025L</span></li>
                <li><span>发站:&nbsp;上海</span><span style="margin-left:50px">到站:&nbsp;合肥</span></li>
                <li>承运公司:&nbsp;邦达通 客服部门</li>
                <li>联系方式:&nbsp;<a>18013518618</a></li>
              </ul>
            </div>
            <div class="detail-panel">
              <div>跟踪进度</div>
              <ul>
                <li>【2018-12-14 15:16:15】已接货</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row detail-panel order-content center-block hide">
      <ul>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        searchModel: {
          name: ''
        }
      }
    },
    methods: {
      // 搜索
      onSubmit () {

      }
    }
  }
</script>

<style scoped>
  @import "wuliu.css";
  .header-title {
    height: 60px;
    line-height: 60px;
    background: #118ACF;
    color: #fff;
    /* padding-left: 20px; */
    font-weight: bold;
    text-align: center;
  }
  .header-search {
    margin-top: 10px;
  }
  .outline-panel li{
    line-height: 20px;
  }
</style>
