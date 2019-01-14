<template>
  <div class="app-container">
    <div style="height: 100%;position: relative;">
      <div class="consignment">
        <div class="consignmentOpen">运单号：{{orderTrackList.waybillNo}}<span>{{orderTrackList.status | filterStatus(statusList)}} 【邦达通】</span></div>
        <div class="consignmentTitle">货物托运单</div>
        <div class="consignmentInfo"><span>操作人：{{orderTrackList.operator.username}}</span><span>开单时间：{{dateFormater(orderTrackList.waybillDate, 'YYYY-MM-DD hh:mm:ss')}}</span></div>
      </div>
      <el-table :data="orderTrackList.trackings" v-loading.body="listLoading" element-loading-text="Loading" noborder fit highlight-current-row :height="650">
        <el-table-column label="操作类型" width="200" align="center">
          <template slot-scope="scope">
            <div class="createWaybill">{{scope.row.status | filterStatus(statusList)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="150" align="center">
          <template slot-scope="scope">
            {{scope.row.operationTime ? $moment(scope.row.operationTime).format('YYYY-MM-DD hh:mm:ss') : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.operator.username}}
          </template>
        </el-table-column>
        <el-table-column label="操作描述" align="center">
          <template slot-scope="scope">
            {{scope.row.described}}
          </template>
        </el-table-column>
        <el-table-column label="上传图片" align="center">
          <template slot-scope="scope">
            <span class="blueColor" v-for="(item, index) in scope.row.picture" @click="showPic(item)" v-if="scope.row.picture">
              [{{index}}]
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-list fixed-buttom">
        <el-form :inline="true" :model="formInline" ref="ruleForm" class="demo-form-inline">
          <el-form-item label="状态类型" prop="status">
            <el-select v-model="formInline.status" style="width:150px" placeholder="请选择状态类型">
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
              v-model="formInline.operationTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1"
              style="width:200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作描述">
            <el-input v-model="formInline.described" placeholder="不超过100个字!" style="width: 200px" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="用户可见">
            <el-checkbox v-model="formInline.userSee"></el-checkbox>
          </el-form-item>
        </el-form>
        <div style="margin: 0 auto;text-align: center">
          <el-button type="primary" @click="saveTracking()">保存跟踪</el-button>
          <el-button type="primary" @click="upload()">上传图片</el-button>
        </div>
      </div>
    </div>
    <!--上传图片-->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="980px"
      class="uploadAvatar"
      :before-close="handleClose">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          with-credentials
          :on-exceed="handleAvatarExceed"
          list-type="picture-card"
          :file-list="imageUrl"
          :action="g_Config.UPLOADURL"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :limit="5">
          <i class="el-icon-plus"></i>
        </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onUploadClick">确 定</el-button>
      </span>
    </el-dialog>
    <!--图片展示-->
    <el-dialog
      title="图片展示"
      :visible.sync="dialogPicVisible"
      width="600px"
      :before-close="handlePicClose">
      <template>
        <img :src="pictureUrl" width="100%">
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onPicClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {formatDate} from '@/utils/index'
  export default {
    data () {
      return {
        dialogVisible: false,
        dialogShowVisible: false,
        dialogImageUrl: '',
        imageUrl: [],
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
        formInline: {
          status: '1',
          operationTime: new Date(),
          userSee: true
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
        listLoading: true,
        pictureList: [],
        dialogPicVisible: false,
        pictureUrl: '',
      }
    },
    mounted () {
      this.fetchData()
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
    computed: {
      ...mapState({
        orderTrackList: state=> state.order.orderTrackList
      })
    },
    methods: {
      ...mapActions([
        'getWaybillGet',
        'getWaybillSaveTracking'
      ]),
      dataTrans (data) {
        return data
      },
      // 展示图片
      showPic (item) {
        this.dialogPicVisible = true
        this.pictureUrl = this.g_Config.IMG_URL + item
      },
      onPicClick () {
        this.handlePicClose()
      },
      handlePicClose () {
        this.pictureUrl = ''
        this.dialogPicVisible = false
      },
      upload () {
        this.dialogVisible = true
      },
      dateFormater (time, fm) {
        return this.$moment(time).format(fm)
      },
      // 确定上传
      onUploadClick () {
        this.handleClose()
      },
      handleClose () {
        this.dialogVisible = false
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl.push({url: this.g_Config.IMG_URL + res.data})
        this.pictureList.push(res.data)
      },
      handleAvatarExceed (files, fileList) {
        this.$message.error('最多一次只能上传5张图片')
      },
      handleRemove(file, fileList) {
        let params = 99
        this.imageUrl.forEach((item, index) => {
          if (file.uid === item.uid) {
            params = index
          }
        })
        if (params != 99) {
          this.imageUrl.splice(params, 1)
          this.pictureList.splice(params, 1)
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return (isJPG || isPNG) && isLt2M
      },
      saveTracking () {
        this.listLoading = false
        let params = {
          ...this.formInline,
          waybill:{
            id: this.$route.params.id
          }
        }
        if (this.pictureList.length) {
          params.pictures = this.pictureList.toString()
        }
        if (params.userSee) {
          params.userSee = 1
        } else {
          params.userSee = 0
        }
        this.getWaybillSaveTracking(params).then(response => {
          this.pictureList = []
          this.imageUrl = []
          this.listLoading = false
          this.fetchData()
        }).catch(() => {
          this.listLoading = false
        })
      },
      fetchData () {
        this.listLoading = false
        let params = {
          id: this.$route.params.id
        }
        this.getWaybillGet(params).then(response => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    /*width: 148px;*/
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
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
      left: 0;
      padding: 10px 0 10px 250px;
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
  .blueColor {
    color: #4979ff;
    cursor: pointer;
  }
</style>
<style lang="scss">
  .avatar-uploader {
    display: inline-flex;
    /*width: 148px;*/
    height: 148px;
    padding: 5px;
    .el-upload-list--picture-card {
      display: inline-flex;
    }
    .el-upload.el-upload--picture-card {
      display: table;
    }
  }
  .uploadAvatar.el-dialog__wrapper .el-dialog .el-dialog__body {
    display: inline-flex;
    flex-wrap: wrap;
  }
</style>
