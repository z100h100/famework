<template>
  <div class="app-container">
    <div class="crumbs" style="height: 100%;background: #FFFFFF">
      <div style="overflow: auto;padding-bottom: 20px;">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules_system" label-width="200px" class="demo-ruleForm" size="small">
        <div class="all-things">
          <div class="all-things-top">
            <div class="all-things-top-title">
              <h1>
                运单基础信息
              </h1>
            </div>
          </div>
          <el-form-item label="运单号" prop="WaybillNo">
            <el-input v-model="ruleForm.WaybillNo" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="发站" prop="startStation">
            <el-input v-model="ruleForm.startStation" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="到站" prop="endStation">
            <el-input v-model="ruleForm.endStation" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="送货方式" prop="deliveryMode">
            <el-select v-model="ruleForm.deliveryMode" style="width:290px" placeholder="请选择">
              <el-option
                v-for="item in deliveryMode"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="ruleForm.timeDate"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1"
              style="width:290px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="付款方式" prop="payMode">
            <el-select v-model="ruleForm.payMode" style="width:290px" placeholder="请选择">
              <el-option
                v-for="item in payMode"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经办人" prop="owner">
            <el-input v-model="ruleForm.owner" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
        </div>
        <div class="all-things">
          <div class="all-things-top">
            <div class="all-things-top-title">
              <h1>
                发货方基本信息
              </h1>
            </div>
          </div>
          <el-form-item label="发货单位" prop="startDept">
            <el-input v-model="ruleForm.startDept" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="发货人" prop="startOwner">
            <el-input v-model="ruleForm.startOwner" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="startPhoneNum">
            <el-input v-model="ruleForm.startPhoneNum" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="startTelNum">
            <el-input v-model="ruleForm.startTelNum" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="startAdd">
            <el-input v-model="ruleForm.startAdd" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="地址备注" prop="startAddMark">
            <el-input v-model="ruleForm.startAddMark" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
        </div>
        <div class="all-things">
          <div class="all-things-top">
            <div class="all-things-top-title">
              <h1>
                收货方基本信息
              </h1>
            </div>
          </div>
          <el-form-item label="收货单位" prop="endDept">
            <el-input v-model="ruleForm.endDept" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="endOwner">
            <el-input v-model="ruleForm.endOwner" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="endPhoneNum">
            <el-input v-model="ruleForm.endPhoneNum" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="endTelNum">
            <el-input v-model="ruleForm.endTelNum" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="endAdd">
            <el-input v-model="ruleForm.endAdd" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="地址备注" prop="endAddMark">
            <el-input v-model="ruleForm.endAddMark" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
        </div>
        <div class="all-things">
          <div class="all-things-top">
            <div class="all-things-top-title">
              <h1>
                货物规格价格基本信息
              </h1>
            </div>
          </div>
          <el-form-item label="货物名称" prop="goods">
            <el-input v-model="ruleForm.goods" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="包装" prop="package">
            <el-input v-model="ruleForm.package" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="number">
            <el-input v-model="ruleForm.number" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input v-model="ruleForm.weight" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="volume">
            <el-input v-model="ruleForm.volume" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
          <el-form-item label="单价/件" prop="price">
            <el-input v-model="ruleForm.price" style="width:290px" maxlength='25'></el-input>
          </el-form-item>
        </div>
        </el-form>
      </div>
      <div class="btn-list fixed-buttom">
        <el-button type="primary"@click="MSMNotic">短信通知</el-button>
        <el-button type="primary"@click="submitForm" :loading="btnSaveLoading">保存</el-button>
        <el-button @click="handleShowByCancel">返回</el-button>
      </div>
    </div>
    <!--短信通知-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose">
      <template>
        <el-table :data="tableData" style="width: 100%" border>
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column prop="messageType" label="短信类型" width="100"></el-table-column>
          <el-table-column prop="toPerson" label="接收方" width="100"></el-table-column>
          <el-table-column prop="MSMtemplate" label="短信模版"></el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        dialogVisible: false,
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        list: null,
        listLoading: true,
        btnSaveLoading: false,
        ruleForm: {},
        rules_system: {
          WaybillNo: [
            { required: true, message: '请输入运单号', trigger: 'blur' }
          ],
          owner: [
            { required: true, message: '请输入经办人', trigger: 'blur' }
          ],
          deliveryMode: [
            { required: true, message: '请选择送货方式', trigger: 'change' }
          ],
          payMode: [
            { required: true, message: '请选择付款方式', trigger: 'change' }
          ],
          startOwner: [
            { required: true, message: '请输入发货人', trigger: 'blur' }
          ],
          endOwner: [
            { required: true, message: '请输入收货人', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入件数', trigger: 'blur' },
            { type: 'number', message: '件数必须为数字值'}
          ],
        },
        payMode: [
          {
            name: '现付',
            code: '0'
          },
          {
            name: '到付',
            code: '1'
          },
          {
            name: '欠付',
            code: '2'
          },
          {
            name: '月结',
            code: '3'
          },
          {
            name: '回付',
            code: '4'
          },
          {
            name: '货到打卡',
            code: '5'
          },
          {
            name: '货款扣',
            code: '6'
          },
          {
            name: '免费',
            code: '7'
          },
          {
            name: '多笔付',
            code: '8'
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
        ],
        tableData: [
          {
            messageType: '跟踪-发货人',
            toPerson: '发货人',
            MSMtemplate: '您好，您发给{收货人}的{货物名称}已受理，运单号{运单号}。查单链接：{短信跟踪链接} {当前组织名称}，电话:{当前组织联系电话}'
          },
          {
            messageType: '跟踪-收货人',
            toPerson: '收货人',
            MSMtemplate: '您好，{发货人}发给您的{货物名称}已受理，运单号{运单号}。查单链接：{短信跟踪链接} {当前组织名称}，电话:{当前组织联系电话}'
          }
        ]
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
      handleClose () {
        console.log(1)
      },
      MSMNotic () {
        this.dialogVisible = true
      },
      submitForm () {
        this.btnSaveLoading = true
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
          this.btnSaveLoading = false
        });
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

<style lang="scss" scoped>
  .text-red {
    color: red;
  }
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

  .el-breadcrumb__inner {
    font-size: 16px !important;
  }

  .top-things {
    position: relative;
    height: 48px;
    background-color: #FFFFFF;
    margin-top: 20px;
  }

  .top-things-left {
    float: left;
    margin: 0 auto;
    padding-left: 25px;
    padding-top: 13.5px;
  }

  .top-things-right {
    float: right;
    margin: 0 auto;
    padding-right: 25px;
    padding-top: 13.5px;
    color: #999999
  }

  .all-things {
    background-color: #FFFFFF;
    position: relative;
    padding-bottom: 10px;
  }

  .all-things-top {
    background: #f9f9fb;
    height: 49px;
    border-bottom: 1px solid #E9EAED;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .btn-list {
    margin-left: 15px;
    background-color: #FFFFFF;
    position: relative;
    padding: 0 0 20px 200px;
    &.fixed-buttom {
      position: fixed;
      bottom: 0;
      right: 15px;
      left: 225px;
      padding: 10px 0 10px 200px;
      border-top: 1px solid #edeff4;
    }
  }

  .btn-save {
    width: 160px;
    height: 40px;
  }
  .submit{
    width: 90px !important;
    height: 32px;
  }
  .btn-cancel {
    width: 160px;
    height: 40px;
  }
  .cancel{
    width: 60px;
    height: 32px;
  }
  .el-input__inner {
    width: 290px !important;
  }

  .el-button--primary {
    /*width: 160px;*/
  }

  .left-things {
    width: 224px;
    border-right: 1px solid #edeff4;
    min-height: calc(100vh - 110px - 20px);
  }

  .el-menu-vertical-demo li {
    border: 0;
    border-bottom: 1px solid #edeff4;
    color: #666;
  }

  .el-menu-vertical-demo li i {
    display: inline-block;
    width: 16px;
    font-size: 12px;
    text-align: center;
    margin-right: 5px;
  }

  .el-menu-vertical-demo li span {
    font-size: 14px !important;
  }

  .no-things {
    height: 319px;
    background-color: white;
    width: 224px;
  }
</style>
<style>
  .el-menu-item：hover {
    background-color: #0062AD
  }
</style>
