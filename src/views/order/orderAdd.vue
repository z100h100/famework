<template>
  <div class="app-container">
    <div>货物托运单</div>
    <div class="crumbs" style="display: flex;height: 100%;background: #FFFFFF">
      <div style="overflow: auto;flex:1;">
        <!-- 系统配置-->
        <div class="all-things">
          <div class="all-things-top">
            <div class="all-things-top-title">
              <h1>
                111
              </h1>
            </div>
          </div>
          <el-form :model="ruleForm" :rules="rules_system" label-width="200px" class="demo-ruleForm" size="small">
            <el-form-item label="2222" prop="">
              <el-input v-model="ruleForm.name" style="width:290px" maxlength='25' @blur='checkDeviceName()'></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="btn-list fixed-buttom">
        <el-button type="primary" class="btn-save submit" @click="submitForm" :loading="btnSaveLoading">保存</el-button>
        <el-button class="btn-cancel cancel" @click="handleShowByCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        list: null,
        listLoading: true,
        btnSaveLoading: false,
        ruleForm: {},
        rules_system: {}
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      submitForm () {
        console.log(1)
      },
      handleShowByCancel () {
        console.log(1)
      },
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

<style lang="scss">
  .crumbs {
    .crumbs_header {
      height: 50px;
      box-sizing: border-box;
      background: #fff;
      border-bottom: 1px solid #edeff4;
      align-items: center;
      justify-content: flex-start;
      display: flex;
      font-weight: bold;

      i {
        cursor: pointer;
        color: #acaeb0;
        margin: 0 12px 0 22px;
      }

      .crumbs_title {
        padding-left: 8px;
        color: #555;
        font-size: 14px;
        border-left: 1px solid #eeeff3;
        font-weight: bold;
      }
    }
  }
</style>
