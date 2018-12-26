<template>
  <div class="app-container">
    <div class="crumbs" style="height: 100%;background: #FFFFFF">
      <div style="overflow: auto;padding-bottom: 20px;">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules_system" label-width="200px" class="demo-ruleForm"
                 size="small">
          <div class="all-things">
            <div class="all-things-top">
              <div class="all-things-top-title">
                <h1>
                  运单基础信息
                </h1>
              </div>
            </div>
            <el-form-item label="运单号" prop="waybillNo">
              <el-input v-model="ruleForm.waybillNo" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="发站" prop="departureStation">
              <el-input v-model="ruleForm.departureStation" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="到站" prop="arriveStation">
              <el-input v-model="ruleForm.arriveStation" style="width:290px" maxlength='25'></el-input>
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
            <el-form-item label="日期" prop="waybillDate">
              <el-date-picker
                v-model="ruleForm.waybillDate"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1"
                style="width:290px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式" prop="payment">
              <el-select v-model="ruleForm.payment" style="width:290px" placeholder="请选择">
                <el-option
                  v-for="item in payMode"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经办人" prop="operator">
              <el-select v-model="ruleForm.operator" style="width:290px" placeholder="请选择">
                <el-option
                  v-for="item in allUserList"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
                </el-option>
              </el-select>
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
            <el-form-item label="发货单位" prop="deliveryCompany">
              <el-input v-model="ruleForm.deliveryCompany" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="发货人" prop="deliveryPerson">
              <el-input v-model="ruleForm.deliveryPerson" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="deliveryPhone">
              <el-input v-model="ruleForm.deliveryPhone" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="deliveryTel">
              <el-input v-model="ruleForm.deliveryTel" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="shippingAddress">
              <el-input v-model="ruleForm.shippingAddress" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="地址备注" prop="shippingAddressRemark">
              <el-input v-model="ruleForm.shippingAddressRemark" style="width:290px" maxlength='25'></el-input>
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
              <el-input v-model="ruleForm.receivingCompany" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="收货人" prop="receivingPerson">
              <el-input v-model="ruleForm.receivingPerson" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="receivingPhone">
              <el-input v-model="ruleForm.receivingPhone" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="receivingTel">
              <el-input v-model="ruleForm.receivingTel" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="receivingAddress">
              <el-input v-model="ruleForm.receivingAddress" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="地址备注" prop="receivingAddressRemark">
              <el-input v-model="ruleForm.receivingAddressRemark" style="width:290px" maxlength='25'></el-input>
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
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="ruleForm.goodsName" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="包装" prop="packing">
              <el-input v-model="ruleForm.packing" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="quantity">
              <el-input v-model="ruleForm.quantity" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="weight">
              <el-input v-model="ruleForm.weight" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="体积" prop="volume">
              <el-input v-model="ruleForm.volume" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
            <el-form-item label="单价/件" prop="unitPrice">
              <el-input v-model="ruleForm.unitPrice" style="width:290px" maxlength='25'></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="btn-list fixed-buttom">
        <el-button type="primary" @click="MSMNotic()">短信通知</el-button>
        <el-button type="primary" @click="submitForm" :loading="btnSaveLoading">保存</el-button>
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
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" border @selection-change="selectStatus">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="messageType" label="短信类型" width="100"></el-table-column>
          <el-table-column prop="toPerson" label="接收方" width="100"></el-table-column>
          <el-table-column prop="MSMtemplate" label="短信模版"></el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
<el-button type="primary" @click="onsmsClick">确 定</el-button>
</span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('请填写正确的手机号'))
        }
        callback()
      }
      return {
        dialogVisible: false,
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
        list: null,
        listLoading: true,
        btnSaveLoading: false,
        ruleForm: {
          waybillDate: new Date(),
          deliverySms: 1,
          receiveSms: 1
        },
        rules_system: {
          waybillNo: [
            {required: true, message: '请输入运单号', trigger: 'blur'}
          ],
          operator: [
            {required: true, message: '请输入经办人', trigger: 'blur'}
          ],
          receivingPhone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          deliveryPhone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          deliveryMode: [
            {required: true, message: '请选择送货方式', trigger: 'change'}
          ],
          waybillDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          payment: [
            {required: true, message: '请选择付款方式', trigger: 'change'}
          ],
          deliveryPerson: [
            {required: true, message: '请输入发货人', trigger: 'blur'}
          ],
          receivingPerson: [
            {required: true, message: '请输入收货人', trigger: 'blur'}
          ],
          quantity: [
            {required: true, message: '请输入件数', trigger: 'blur'}
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
        multipleSelection: [],
        tableData: [
          {
            id: 'deliverySms',
            status: 1,
            messageType: '跟踪-发货人',
            toPerson: '发货人',
            MSMtemplate: '您好，您发给{收货人}的{货物名称}已受理，运单号{运单号}。查单链接：{短信跟踪链接} {当前组织名称}，电话:{当前组织联系电话}'
          },
          {
            id: 'receiveSms',
            status: 1,
            messageType: '跟踪-收货人',
            toPerson: '收货人',
            MSMtemplate: '您好，{发货人}发给您的{货物名称}已受理，运单号{运单号}。查单链接：{短信跟踪链接} {当前组织名称}，电话:{当前组织联系电话}'
          }
        ],
        smsList: [],
        allUserList: []
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    mounted () {
      this.multipleSelection = [this.tableData[0], this.tableData[1]]
      this.getAllUser()
    },
    computed: {
      ...mapState({
        user: state => state.user.user
      })
    },
    methods: {
      ...mapActions([
        'getWaybillSave',
        'getWaybillSaveSMS',
        'getUserAllUser'
      ]),
// 获取全部user
      getAllUser () {
        this.getUserAllUser().then(res => {
          this.allUserList = res.data.data
          this.ruleForm.operator = this.user.id
        })
      },
      handleClose () {
        this.multipleSelection = [this.tableData[0], this.tableData[1]]
      },
// 短信方确认
      onsmsClick () {
        this.smsList.map(item => {
          this.ruleForm[item.id] = item.status
        })
        this.dialogVisible = false
      },
      selectStatus (selection) {
        this.multipleSelection = selection
        let aa = []
        this.tableData.map(item => {
          selection.map(v => {
            if (item.id === v.id) {
              item.status = 1
            } else {
              item.status = 0
            }
            aa.push(item)
          })
        })
        this.smsList = this.uniq(aa)
      },
      uniq (array) {
        var temp = [] //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i])
          }
        }
        return temp
      },
      MSMNotic () {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.multipleSelection.map(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        })
      },
// 提交
      submitForm () {
        this.btnSaveLoading = false
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.ruleForm)
            params.operator = {
              id: params.operator
            }
            this.getWaybillSave(params).then(res => {
              let _params = {
                deliverySms: params.deliverySms,
                receiveSms: params.deliverySms,
                id: res.data.data
              }
              this.getWaybillSaveSMS(_params).then(() => {
                this.message({
                  type: 'success',
                  message: '保存成功'
                })
                this.$router.push({name: 'orderList'})
              })
            })
          } else {
            return false
          }
          this.btnSaveLoading = false
        })
      },
      handleShowByCancel () {
        this.$router.push({name: 'orderList'})
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

  .submit {
    width: 90px !important;
    height: 32px;
  }

  .btn-cancel {
    width: 160px;
    height: 40px;
  }

  .cancel {
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
