<template>
  <div>
    <div>
      <div class="header-title">
        <img src="../../assets/images/backUrl.png" @click="backUrl" alt="邦达通物流管理系统"/>
        邦达通物流管理系统
      </div>
      <el-form inline ref="form" :model="searchModel" :rules="rules" class="header-search">
        <el-form-item style="margin-left: 20px" prop="name">
          <el-input v-model="searchModel.name" placeholder="请输入运单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="searchResult" class="row outline-panel center-block order-content" v-if="orderTrackList">
      <div class="order_detail fn-clear">
        <div class="p-left-continer">
          <div class="p-left">
            <div class="outline-panel">
              <ul>
                <li><span>运单号:&nbsp;{{orderTrackList.waybillNo}}</span></li>
                <li><span>发站:&nbsp;{{orderTrackList.departureStation}}</span><span style="margin-left:50px">到站:&nbsp;{{orderTrackList.arriveStation}}</span></li>
                <li>承运公司:&nbsp;邦达通</li>
                <li>联系方式:&nbsp;<a>{{orderTrackList.operator.phone}}</a></li>
              </ul>
            </div>
            <div class="detail-panel">
              <div>跟踪进度</div>
              <ul>
                <li v-for="item in orderTrackList.trackings">【{{item.operationTime ? $moment(item.operationTime).format('YYYY-MM-DD hh:mm:ss') : ''}}】{{item.status | filterStatus(statusList)}}
                  <p>操作描述：{{item.described ? item.described : '无'}}</p>
                  <p v-if="item.picture">
                    图片展示：
                    <span class="blueColor" v-for="(items, index) in item.picture" @click="showPic(items)">
                      [{{index}}]
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-left: 20px;color: red" v-else>暂无数据,请输入正确的订单号</div>
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>

<script>
  import { Base64 } from 'js-base64'
  import {mapState, mapActions} from 'vuex'
  import BigImg from '@/components/bigImg/index.vue'
  export default {
    name: 'index',
    data () {
      return {
        showImg: false,
        imgSrc: '',
        searchModel: {
          name: ''
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
        rules: {
          name: [
            { required: true, message: '请输入运单号', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      'big-img': BigImg
    },
    watch: {
      '$route' () {
        if (this.$route.params.id) {
          let params = {
            id: Base64.decode(this.$route.params.id).slice(3, -3)
          }
          this.getWaybillGet(params).then(res => {
            // console.log(res)
          })
        }
      }
    },
    computed: {
      ...mapState({
        orderTrackList: state => state.order.orderTrackList
      })
    },
    mounted () {
      if (this.$route.params.id) {
        let params = {
          id: Base64.decode(this.$route.params.id).slice(3, -3)
        }
        this.getWaybillGet(params)
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
      }
    },
    methods: {
      ...mapActions([
        'getWaybillGet',
        'getWaybillNo'
      ]),
      showPic (items) {
        this.showImg = true
        // 获取当前图片地址
        this.imgSrc = this.g_Config.IMG_URL + items
      },
      viewImg () {
        this.showImg = false
      },
      // 搜索
      onSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let params = {
              waybillNo: this.searchModel.name
            }
            this.getWaybillNo(params)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      backUrl () {
        window.location.href = 'http://www.bangdatong.cn'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "wuliu.css";
  .header-title {
    height: 60px;
    line-height: 60px;
    background: #118ACF;
    color: #fff;
    padding-left: 20px;
    font-weight: bold;
    img {
      cursor: pointer;
      height: 60px;
      float: left;
    }
  }
  @media screen and (max-width: 900px) {
    .header-title {
      img {
        display: none;
      }
    }
  }
  .header-search {
    margin-top: 10px;
  }
  .outline-panel li{
    line-height: 20px;
  }
  .blueColor {
    color: #4979ff;
    cursor: pointer;
  }
</style>
