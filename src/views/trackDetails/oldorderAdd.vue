<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules_system">
      <div class="consignment">
        <div class="consignmentOpen">
          <div class="layui-form-item fr">
            <label class="layui-form-label requireClass">运单号：</label>
            <div class="layui-block" style="width: 160px">
              <input v-model="name" v-validate="'required|min:3'"
                     :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                     class="layui-input" placeholder="运单号">
              <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
                <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="consignmentTitle">货物托运单</div>
        <div class="consignmentInfo">
          <el-form-item label="开单时间" prop="waybillDate" class="orderContentRight fr">
            <el-date-picker
              v-model="ruleForm.waybillDate"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              class="orderInput"
              :picker-options="pickerOptions1"
              size="mini"
              style="width:200px">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
      <!--表单内容-->
      <div class="order-content skin-border">
        <div class="order-editor-traffic">
          <div>
            <div class="layui-form-item">
              <label class="layui-form-label">发站：</label>
              <div class="layui-block">
                <input v-model="name" v-validate="'required|min:3'"
                       :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                       class="layui-input" placeholder="请输入发站">
                <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
                  <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div>
            <div class="layui-form-item">
              <label class="layui-form-label">到站：</label>
              <div class="layui-block">
                <input v-model="name" v-validate="'required|min:3'"
                       :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                       class="layui-input" placeholder="请输入账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
                  <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div>
            <div class="layui-form-item">
              <label class="layui-form-label">送货方式：</label>
              <div class="layui-block">
                <select v-model="deliveryMode" v-validate="'required'" name="deliveryMode" class="layui-input"
                        :class="{'input': true, 'is-danger': errors.has('deliveryMode')}">
                  <option
                    v-for="item in deliveryModeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </option>
                </select>
                <el-tooltip class="item" effect="pink" :content="errors.first('deliveryMode')" placement="top">
                  <i v-show="errors.has('deliveryMode')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>

    <div class="order-editor-person">
      <div class="order-editor-consignor">
        <div>
          <div>
            <i class="fn-icon fn-icon-avtor"></i>
            <p>发货方</p>
          </div>
        </div>
        <div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">发货单位:</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="请输入发货单位">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">发货人:</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="请输入发货人">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">手机号码:</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">电话号码:</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">发货地址:</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="发货地址">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="地址备注">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-editor-consignee">
        <div>
          <div>
            <i class="fn-icon fn-icon-avtor"></i>
            <p>发货方</p>
          </div>
        </div>
        <div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="cor-company">
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
            <div class="layui-form-item cor-company">
              <label class="layui-form-label">账户</label>
              <div class="layui-block">
                <input v-model="ruleForm.nameList" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('nameList')}"
                       type="text" name="nameList" class="layui-input" placeholder="账户">
                <el-tooltip class="item" effect="pink" :content="errors.first('nameList')" placement="top">
                  <i v-show="errors.has('nameList')" class="el-icon-warning errClass" v-cloak></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-editor-goods">
      <div class="goods-list">
        <el-table
          :data="tableData"
          class="tb-edit"
          :show-header="false"
          border
          width="100%">
          <el-table-column width="55" type="index">
            <template slot-scope="scope">
              <i class="el-icon-plus"></i>
            </template>
          </el-table-column>
          <el-table-column v-for="item in tableHead" :label="item.label" :property="item.property" min-width="200">
            <template slot-scope="scope">
              <div class="layui-form-item">
                <label class="layui-form-label">账户</label>
                <div class="layui-block">
                  <input v-model="scope.row[scope.column.property]" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
                  <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
                    <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="order-editor-fee">
      <div class="order-editor-freight">
        <h3><label class="fn-label">合计运费</label></h3>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="order-editor-freight">
        <h3><label class="fn-label">合计运费</label></h3>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
        <div>
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name" class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="order-editor-extra">
      <div>
        <div class="layui-form-item">
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                   class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div>
        <div class="layui-form-item">
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                   class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div>
        <div class="layui-form-item">
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                   class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div>
        <div class="layui-form-item">
          <label class="layui-form-label">账户</label>
          <div class="layui-block">
            <input v-model="name" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('name')}" type="text" name="name"
                   class="layui-input" placeholder="账户">
            <el-tooltip class="item" effect="pink" :content="errors.first('name')" placement="top">
              <i v-show="errors.has('name')" class="el-icon-warning errClass" v-cloak></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

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
  import './vali'

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
        tableHead: [
          {
            label: "姓名",
            property: "name"
          },
          {
            label: "地址",
            property: "address"
          },
          {
            label: "地址",
            property: "address"
          },
          {
            label: "地址",
            property: "address"
          },
          {
            label: "地址",
            property: "address"
          },
          {
            label: "地址",
            property: "address"
          }
        ],
        // 数据值
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎6666",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎45",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎333",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎222",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        name: '',
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
        deliveryMode: '',
        deliveryModeList: [
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
    mounted () {
      this.multipleSelection = [this.tableData[0], this.tableData[1]]
      // this.getAllUser()
    },
    computed: {
      ...mapState({
        user: state => state.user.user,
        orderTrackList: state => state.order.orderTrackList
      })
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
      }
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
  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td {
    background: none !important;
  }
  .order-editor-extra {
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(270deg,#78aadd 1px,transparent 0),linear-gradient(0deg,#78aadd 1px,transparent 0);
    background-size: 100% 35px;
    >div {
      flex: 1 0 188px;
      display: flex;
      align-items: center;
      height: 35px;
      padding: 0 6px;
      border-right: 1px solid #78aadd;
      font-size: 14px;
      position: relative;
    }
  }
  .order-editor-fee {
    display: flex;
    align-items: stretch;
    border-top: 1px solid #78aadd;
    border-bottom: 1px solid #78aadd;
    >div {
      border-right: 1px solid #78aadd;
      >div {
        display: inline-flex;
        align-items: center;
        position: relative;
        height: 34px;
        padding: 0 6px;
        margin-bottom: 1px;
      }
      h3 {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        box-shadow: inset 0 0 0 0 transparent;
        background: #cae0f6;
        border-bottom: 1px solid #78aadd;
        &:before {
          content: "";
          padding: 0 1px;
          background: #ff8100;
          margin: 0 6px;
        }
      }
    }
  }
  .order-editor-freight {
    flex: 1 50%;
  }
  /deep/.tb-edit {
    .el-table__body {
      td, th {
        padding: 2px 0 !important;
      }
    }
  }
  .order-editor-goods {
    display: flex;
    align-items: stretch;
    background: linear-gradient(270deg,#78aadd 1px,#fff 0);
    .subtract {
      flex: 0 0 31px;
      border-right: 1px solid #78aadd;
      position: relative;
      z-index: 2;
    }
    .goods-list {
      overflow: auto;
      margin-left: -1px;
      flex: 1;
    }
  }
  .order-editor-consignee {
    margin-left: 4px;
    border-left: 1px solid #78aadd;
  }
  .order-editor-person {
    display: flex;
    border-bottom: 1px solid #78aadd;
  }
  .cor-company {
    flex: 1;
    display: flex;
    align-items: center;
    height: 36px;
  }
  .order-editor-person>div>div {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    padding: 4px 0;
  }
  .order-editor-person>div>div:last-child {
    padding: 5px 5px 1px;
  }
  .order-editor-person > div {
    display: flex;
    flex: 1 1 50%;
    border-right: 1px solid #78aadd;
  }

  .order-editor-person > div > div:first-child {
    display: flex;
    flex: 0 0 58px;
    background: #cae0f6;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;

    div {
      width: 100%;
    }

    p {
      width: 100%;
      margin-top: 3px;
      color: #333;
      font-size: 14px;
      text-align: center;
    }
  }

  .layui-input {
    width: 100%;
    outline: none;
    height: 28px;
    padding-right: 15px;
    box-shadow: inset 0 -2px 0 0 #e5e5e5;
    border: none;
    &:focus {
      box-shadow: inset 0 -2px 0 0 #ff4040;
    }
  }

  .is-danger {
    box-shadow: inset 0 -2px 0 0 #ff4040;
    background: #fff5f5;
  }

  .errClass {
    color: red;
    position: absolute;
    right: 5px;
    top: 8px;
  }

  .layui-form-item {
    margin-right: 5px;
    display: flex;
  }

  .layui-label-flex {
    flex: 0 0 70px;
  }

  .layui-form-label {
    font-size: 14px;
    text-align: right;
    height: 28px;
    line-height: 28px;
    margin-right: 5px;
    flex-shrink: 0;
  }

  .layui-block {
    width: 100%;
    position: relative;
    height: 28px;
    line-height: 28px;
  }

  .app-container {
    font-size: 12px;
  }

  .orderContentClass {
    margin-bottom: 10px;
    display: inline-flex;
  }

  .order-editor-traffic {
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(270deg, #78aadd 1px, transparent 0), linear-gradient(0deg, #78aadd 1px, transparent 0);
    background-size: 100% 35px;
  }

  .order-editor-traffic > div, .order-editor-traffic > div.combine > div {
    flex: 1 0 188px;
    display: flex;
    align-items: center;
    height: 35px;
    padding: 0 6px;
    border-right: 1px solid #78aadd;
  }

  .order-content.skin-border {
    border: 1px solid #78aadd;
    border-right: 0;
    background: linear-gradient(270deg, #78aadd 1px, #fff 0);
  }

  .consignment {
    display: flex;

    .consignmentOpen {
      flex: 1;
      text-align: left;

      > span {
        color: red;
        font-weight: bold;
        font-size: 12px;
        margin-left: 5px;
      }
    }

    .consignmentTitle {
      flex: 1;
      text-align: center;
      font-size: 24px;
      color: #333;
      line-height: 30px;
      letter-spacing: 16px;
      padding: 0 20px;

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
  .requireClass {
    color: red;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 12px;
  }
</style>
