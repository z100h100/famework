<template>
  <div class="app-container">
    <div class="crumbs" style="height: 100%;background: #FFFFFF">
      <div style="overflow: auto;padding-bottom: 20px;">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules_system">
          <div class="consignment">
            <div class="consignmentOpen">
              <div class="layui-form-item fr waybillNoClass">
                <label class="layui-form-label requireClass">运单号</label>
                <div class="layui-block" style="width: 160px">
                  <input v-model="ruleForm.waybillNo" v-validate="'required|waybillNo'"
                         :class="{'input': true, 'is-danger': errors.has('waybillNo')}" type="text" name="waybillNo"
                         class="layui-input requireClass" placeholder="运单号" disabled>
                  <el-tooltip class="item" effect="pink" :content="errors.first('waybillNo')" placement="top">
                    <i v-show="errors.has('waybillNo')" class="el-icon-warning errClass" v-cloak></i>
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
                  :clearable="false"
                  :editable="false"
                  placeholder="选择日期时间"
                  align="right"
                  class="orderInput"
                  :picker-options="pickerOptions1"
                  size="mini"
                  style="width:200px"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <!--表单内容-->
          <div class="order-content skin-border">
            <div class="order-editor-traffic">
              <div>
                <div class="layui-form-item">
                  <label class="layui-form-label">发站</label>
                  <div class="layui-block">
                    <input v-model="ruleForm.departureStation" class="layui-input" placeholder="发站" disabled>
                  </div>
                </div>
              </div>
              <div>
                <div class="layui-form-item">
                  <label class="layui-form-label">到站</label>
                  <div class="layui-block">
                    <input v-model="ruleForm.arriveStation" class="layui-input" placeholder="到站" disabled>
                  </div>
                </div>
              </div>
              <div>
                <div class="layui-form-item">
                  <label class="layui-form-label">路由</label>
                  <div class="layui-block">
                    <input v-model="ruleForm.transferStation" class="layui-input" placeholder="路由" disabled>
                  </div>
                </div>
              </div>
              <div>
                <div class="layui-form-item">
                  <label class="layui-form-label requireClass">送货方式</label>
                  <div class="layui-block">
                    <select v-model="ruleForm.deliveryMode" v-validate="'required'" name="deliveryMode" class="layui-input"
                            :class="{'input': true, 'is-danger': errors.has('deliveryMode')}" disabled>
                      <option
                        v-for="item in deliveryModeList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </option>
                    </select>
                    <el-tooltip class="item" effect="pink" :content="errors.first('deliveryMode')" placement="top">
                      <i v-show="errors.has('deliveryMode')" class="el-icon-warning errClassSelect" v-cloak></i>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <label class="layui-form-label">发货单位</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.deliveryCompany" class="layui-input" placeholder="请输入发货单位" disabled>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label requireClass">发货人</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.deliveryPerson" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('deliveryPerson')}"
                             type="text" name="deliveryPerson" class="layui-input" placeholder="请输入发货人" disabled>
                      <el-tooltip class="item" effect="pink" :content="errors.first('deliveryPerson')" placement="top">
                        <i v-show="errors.has('deliveryPerson')" class="el-icon-warning errClass" v-cloak></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div class="cor-company">
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label requireClass">手机号码</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.deliveryPhone" v-validate="'required|phone'"
                             :class="{'input': true, 'is-danger': errors.has('deliveryPhone')}"
                             type="text" name="deliveryPhone" class="layui-input" placeholder="手机号码" disabled>
                      <el-tooltip class="item" effect="pink" :content="errors.first('deliveryPhone')" placement="top">
                        <i v-show="errors.has('deliveryPhone')" class="el-icon-warning errClass" v-cloak></i>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label">电话号码</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.deliveryTel" type="text" class="layui-input" placeholder="电话号码" disabled>
                    </div>
                  </div>
                </div>
                <div class="cor-company">
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label">发货地址</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.shippingAddress" type="text" class="layui-input" placeholder="发货地址" disabled>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <div class="layui-block">
                      <input v-model="ruleForm.shippingAddressRemark" type="text" class="layui-input" placeholder="地址备注" disabled>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-editor-consignee">
              <div>
                <div>
                  <i class="fn-icon fn-icon-avtor"></i>
                  <p>收货方</p>
                </div>
              </div>
              <div>
                <div class="cor-company">
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label">收货单位</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingCompany" type="text" class="layui-input" placeholder="收货单位" disabled>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label requireClass">收货人</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingPerson" v-validate="'required'"
                             :class="{'input': true, 'is-danger': errors.has('receivingPerson')}"
                             type="text" name="receivingPerson" class="layui-input" placeholder="收货人" disabled>
                      <el-tooltip class="item" effect="pink" :content="errors.first('receivingPerson')" placement="top">
                        <i v-show="errors.has('receivingPerson')" class="el-icon-warning errClass" v-cloak></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div class="cor-company">
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label requireClass">手机号码</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingPhone" v-validate="'required|phone'"
                             :class="{'input': true, 'is-danger': errors.has('receivingPhone')}"
                             type="text" name="receivingPhone" class="layui-input" placeholder="手机号码" disabled>
                      <el-tooltip class="item" effect="pink" :content="errors.first('receivingPhone')" placement="top">
                        <i v-show="errors.has('receivingPhone')" class="el-icon-warning errClass" v-cloak></i>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label">电话号码</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingTel" type="text" class="layui-input" placeholder="电话号码" disabled>
                    </div>
                  </div>
                </div>
                <div class="cor-company">
                  <div class="layui-form-item cor-company">
                    <label class="layui-form-label">收货地址</label>
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingAddress" type="text" class="layui-input" placeholder="收货地址" disabled>
                    </div>
                  </div>
                  <div class="layui-form-item cor-company">
                    <div class="layui-block">
                      <input v-model="ruleForm.receivingAddressRemark" type="text" class="layui-input" placeholder="地址备注" disabled>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="order-editor-goods">
            <div class="goods-list">
              <el-table
                :data="goodsTableData"
                class="tb-edit"
                :show-header="false"
                border
                width="100%">
                <!--<el-table-column width="35" type="index">-->
                <!--<template slot-scope="scope">-->
                <!--<i class="el-icon-plus" v-if="scope.$index== 0" @click="addGoodsList"></i>-->
                <!--<i class="el-icon-minus" v-else @click="delGoodsList(scope.$index)"></i>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column v-for="item in goodsTableHead" :label="item.label" :property="item.property" min-width="150">
                  <template slot-scope="scope">
                    <div class="layui-form-item" v-if="item.label === '件数'">
                      <label class="layui-form-label">{{item.label}}</label>
                      <div class="layui-block">
                        <input v-model="scope.row[scope.column.property]" v-validate="'quantity'" :class="{'input': true, 'is-danger': errors.has('name')}"
                               type="text" :name="scope.column.property + scope.$index" class="layui-input" :placeholder="item.placeholder" disabled/>
                        <el-tooltip class="item" effect="pink" :content="errors.first(scope.column.property + scope.$index)" placement="top">
                          <i v-show="errors.has(scope.column.property + scope.$index)" class="el-icon-warning errClass" v-cloak></i>
                        </el-tooltip>
                      </div>
                    </div>
                    <div class="layui-form-item"  v-else>
                      <label class="layui-form-label">{{item.label}}</label>
                      <input v-model="scope.row[scope.column.property]" type="text" class="layui-input" :placeholder="item.placeholder" disabled/>
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
                <label class="layui-form-label freight">运费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.yunfei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">现返</label>
                <div class="layui-block">
                  <input v-model="ruleForm.xianfan" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">欠返</label>
                <div class="layui-block">
                  <input v-model="ruleForm.qianfan" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">送货费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.songhuofei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">提货费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.tihuofei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">装卸费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.zhangxiefei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">声明价值</label>
                <div class="layui-block">
                  <input v-model="ruleForm.shenmingjiazhi" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">保价费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.baojiafei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">包装费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.baozhuangfei" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">其它费</label>
                <div class="layui-block">
                  <input v-model="ruleForm.qitafei" type="text" class="layui-input" disabled/>
                </div>
              </div>

            </div>
            <div class="order-editor-pay">
              <h3><label class="fn-label">付款方式</label></h3>
              <div>
                <label class="layui-form-label freight requireClass">付款方式</label>
                <div class="layui-block">
                  <select v-model="ruleForm.payment" v-validate="'required'" name="payment" class="layui-input"
                          :class="{'input': true, 'is-danger': errors.has('payment')}" disabled>
                    <option
                      v-for="item in payMode"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </option>
                  </select>
                  <el-tooltip class="item" effect="pink" :content="errors.first('payment')" placement="top">
                    <i v-show="errors.has('payment')" class="el-icon-warning errClassSelect" v-cloak></i>
                  </el-tooltip>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">现付</label>
                <div class="layui-block">
                  <input v-model="ruleForm.xianfu" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">到付</label>
                <div class="layui-block">
                  <input v-model="ruleForm.daofu" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">货到打卡</label>
                <div class="layui-block">
                  <input v-model="ruleForm.huodaodaka" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">月结</label>
                <div class="layui-block">
                  <input v-model="ruleForm.yuejie" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">回付</label>
                <div class="layui-block">
                  <input v-model="ruleForm.huifu" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">货款扣</label>
                <div class="layui-block">
                  <input v-model="ruleForm.huokuankou" type="text" class="layui-input" disabled/>
                </div>
              </div>
              <div>
                <label class="layui-form-label freight">欠付</label>
                <div class="layui-block">
                  <input v-model="ruleForm.qianfu" type="text" class="layui-input" disabled/>
                </div>
              </div>
            </div>
          </div>
          <div class="order-editor-extra">
            <div>
              <div class="layui-form-item">
                <label class="layui-form-label requireClass">经办人</label>
                <div class="layui-block">
                  <select v-model="ruleForm.operator.id" v-validate="'required'" name="operator" class="layui-input"
                          :class="{'input': true, 'is-danger': errors.has('operator')}" disabled>
                    <option
                      v-for="item in allUserList"
                      :key="item.id"
                      :label="item.username"
                      :value="item.id">
                    </option>
                  </select>
                  <el-tooltip class="item" effect="pink" :content="errors.first('operator')" placement="top">
                    <i v-show="errors.has('operator')" class="el-icon-warning errClassSelect" v-cloak></i>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div>
              <div class="layui-form-item">
                <el-checkbox :checked="ruleForm.konghuo ? 'checked' : ''" disabled>控货</el-checkbox>
                <el-checkbox :checked="ruleForm.tihuo ? 'checked' : ''" disabled>提货</el-checkbox>
              </div>
            </div>
            <div>
              <div class="layui-form-item">
                <select v-model="ruleForm.huidan" class="layui-input" disabled>
                  <option
                    v-for="item in huidanList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </option>
                </select>
                <input v-model="ruleForm.huidanfen" type="text" class="layui-input textCenter" disabled>
                <div>份</div>
              </div>
            </div>
            <div class="order-remark">
              <div class="layui-form-item">
                <label class="layui-form-label">备注</label>
                <div class="layui-block">
                  <input v-model="ruleForm.remark" type="text" class="layui-input" disabled>
                </div>
              </div>
            </div>
          </div>

          <!--中转信息-->
          <div class="order-editor-info plain create">
            <div class="order-card full">
              <h3><i class="fn-icon fn-icon-carry-out"></i>中转信息</h3>
            </div>
            <div class="table-wrap">
              <el-table
                :data="zzInfoTableData"
                class="table-wrap-header"
                border
                width="100%">
                <el-table-column label="中转类型" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <select v-model="zzType" class="layui-input" disabled>
                        <option
                          v-for="item in zzTypeList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </option>
                      </select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转单号" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzdh" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="承运商" prop="" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <div class="layui-block">
                        <input v-model="ruleForm.cys"
                               autocomplete="off"
                               type="text"
                               name="receivingPerson"
                               class="layui-input"
                               placeholder="承运商"
                               disabled>
                        <selectList
                          v-show="cys"
                          :list="cysList"
                          @value1="selectCysValueHandle"
                        ></selectList>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="承运商手机号" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.cyssjh" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转到站" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <select v-model="ruleForm.zzdz" class="layui-input" disabled>
                      </select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转到站业务电话" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzdzywdh" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="交接方式" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <select v-model="ruleForm.jjfs" class="layui-input" disabled>
                        <option
                          v-for="item in jjfsList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </option>
                      </select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="承运经办人" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="核定中转费" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.hdzzf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转费" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="付款方式" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <select v-model="ruleForm.fkfs" class="layui-input" disabled>
                        <option
                          v-for="item in payMode"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </option>
                      </select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转返款" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzfk" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转费合计" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzfhj" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转现付" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzxf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转到付" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzdf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转回付" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzhf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转月结" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzyj" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转欠付" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzqf" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转货款扣" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzhkk" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转货到打卡" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzhddk" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="中转备注" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div class="layui-form-item">
                      <input v-model="ruleForm.zzbz" type="text" class="layui-input" disabled/>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
      </div>
      <div class="footer-Button">
        <el-button size="mini" type="primary" @click="handleShowByCancel">确 定</el-button>
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
  import {mapState, mapActions} from 'vuex'
  import selectList from '@/components/selectList'
  export default {
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        if(!(/^1[34578]\d{9}$/.test(value))){
          return callback(new Error('请填写正确的手机号'))
        }
        callback()
      }
      return {
        // cys
        cys: false,
        cysList: [],
        huidanList: [
          {
            name: '回单',
            code: '0'
          },
          {
            name: '电子回单',
            code: '1'
          },
          {
            name: '回执',
            code: '2'
          },
          {
            name: '原单',
            code: '3'
          },
          {
            name: '收条',
            code: '4'
          },
          {
            name: '信封',
            code: '5'
          }
        ],
        zzInfoTableData: [{}],
        goodsTableHead: [
          {
            label: "货物名称",
            placeholder: '',
            property: "name"
          },
          {
            label: "包装",
            placeholder: '',
            property: "packing"
          },
          {
            label: "件数",
            placeholder: '',
            property: "quantity"
          },
          {
            label: "重量(kg)",
            placeholder: '',
            property: "weight"
          },
          {
            label: "体积(方)",
            placeholder: '长*宽*高*件数(米)',
            property: "volume"
          },
          {
            label: "单价",
            placeholder: '',
            property: "unitPrice"
          }
        ],
        zzType: 0,
        zzTypeList: [
          {
            name: '外部中转',
            code: '0'
          }
        ],
        jjfsList: [
          {
            name: '送到承运公司',
            code: '0'
          },
          {
            name: '承运公司上门提货',
            code: '1'
          }
        ],
        // 数据值
        goodsTableData: [
          {
            name: "",
            packing: "",
            quantity: "",
            weight: "",
            volume: "",
            unitPrice: ""
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
            code: 0
          },
          {
            name: '到付',
            code: 1
          },
          {
            name: '欠付',
            code: 2
          },
          {
            name: '月结',
            code: 3
          },
          {
            name: '回付',
            code: 4
          },
          {
            name: '货到打卡',
            code: 5
          },
          {
            name: '货款扣',
            code: 6
          },
          {
            name: '免费',
            code: 7
          },
          {
            name: '多笔付',
            code: 8
          }
        ],
        deliveryModeList: [
          {
            name: '自提',
            code: 0
          },
          {
            name: '送货',
            code: 1
          },
          {
            name: '送货上门',
            code: 2
          },
          {
            name: '送货上楼(有电梯)',
            code: 3
          },
          {
            name: '送货上楼(无电梯)',
            code: 4
          },
          {
            name: '送货卸货',
            code: 5
          },
          {
            name: '送货安装',
            code: 6
          },
          {
            name: '整车直送',
            code: 7
          },
          {
            name: '大车直送',
            code: 8
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
      this.getAllUser()
    },
    components: {
      selectList: selectList
    },
    computed: {
      ...mapState({
        ruleForm: state=> state.order.orderTrackList,
        user: state => state.user.user
      })
    },
    methods: {
      ...mapActions([
        'getWaybillGet',
        'getWaybillSave',
        'getWaybillSaveSMS',
        'getUserAllUser',
        'getWaybillPhone'
      ]),
      // 承运商
      selectCysValueHandle(value){
        this.cys = false
        this.ruleForm.cys = value.name
        this.ruleForm.cyssjh = value.phone
      },
      cysChange () {
        let params = {
          name: this.ruleForm.cys,
          type: 2 // 1收发人 2承运
        }
        this.getWaybillPhone(params).then(res => {
          this.cysList = res.data.data
        })
      },
      // 获取全部user
      getAllUser () {
        this.getUserAllUser().then(res => {
          this.allUserList = res.data.data
          this.ruleForm.operator = this.user.id
          let params = {
            id: this.$route.params.id
          }
          this.getWaybillGet(params).then(res => {
            if (res.data.data.goods.length) {
              this.goodsTableData = res.data.data.goods
            }
          })
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

<style>
  .el-table.table-wrap-header td, .el-table.table-wrap-header th{
    padding: 4px 0 !important;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height:7px;
    background-color:#b5b1b1;
  }
  ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    border-radius: 10px;
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    background-color:#b5b1b1;
  }
</style>
<style lang="scss" scoped>
  .order-editor-info {
    .plain {
      border-right: 0;
      padding-top: 5px;
      background: linear-gradient(270deg,#78aadd 1px,#fff 0);
    }
    .order-card {
      border-right: 1px solid #78aadd;
      h3 {
        min-width: 98px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        background: #cae0f6;
        color: #333;
        border-top: 1px solid #78aadd;
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
  .layui-input[disabled] {
    background: #fff;
    cursor: not-allowed;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td {
    background: none !important;
  }
  .textCenter {
    text-align: center;
  }
  .footer-Button {
    margin-top: 20px;
    text-align: center;
  }
  .freight {
    flex: 0 0 72px;
    text-align: justify;
    text-align-last: justify;
  }
  .order-editor-extra {
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #78aadd;
    background-image: linear-gradient(270deg,#78aadd 1px,transparent 0),linear-gradient(0deg,#78aadd 1px,transparent 0);
    background-size: 100% 35px;
    >div {
      flex: 1 0 82px;
      display: flex;
      align-items: center;
      height: 35px;
      padding: 0 6px;
      border-right: 1px solid #78aadd;
      font-size: 14px;
      position: relative;
      line-height: 28px;
      &.order-remark {
        flex: 2 0 376px;
      }
      >div {
        width: 100%;
      }
    }
  }
  .order-editor-fee {
    display: flex;
    align-items: stretch;
    border-top: 1px solid #78aadd;
    border-left: 1px solid #78aadd;
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
    >div {
      width: 25%;
      float: left;
    }
  }
  .order-editor-pay {
    flex: 1 50%;
    >div {
      width: 33%;
      float: left;
    }
  }
  /deep/.tb-edit {
    .el-table__body {
      td, th {
        padding: 2px 0 !important;
        border-right: 1px solid #78aadd !important;
        border-bottom: 1px solid #78aadd;
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
      flex: 1;
      border-width: 0 1px;
      border-style: solid;
      border-color: #78aadd;
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
    border-left: 1px solid #78aadd;
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
  .errClassSelect {
    color: red;
    position: absolute;
    right: 20px;
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
    border-top: 1px solid #78aadd;
    border-left: 1px solid #78aadd;
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
<style>
  .el-menu-item：hover {
    background-color: #0062AD
  }
</style>
