<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onRoleAdd">添加用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="justList" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.roles | funFilterRoles}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="size" @click="justModifyClick(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: right;margin-top: 10px"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        list: null,
        listLoading: true,
        formInline: {
          personInCharge: '',
          openingDate: '',
          user: '',
          region: ''
        }
      }
    },
    computed: {
      ...mapState({
        // 已关联列表
        justList: state => state.just.justList.content,
        total: state => state.just.justList.totalPages,
        pageSize: state => state.just.justList.size,
        currentPage: state => state.just.justList.number
      })
    },
    filters: {
      funFilterRoles (data) {
        return data.map(item => {
          return item.name
        }).toString()
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      ...mapActions([
        'getJustList'
      ]),
      justModifyClick (row) {
        this.$router.push({path: '/jurisdiction/justModify', query: {id: row.id}})
      },
      onSubmit() {
        this.listLoading = false
      },
      onRoleAdd() {
        this.$router.push('/jurisdiction/justModify')
      },
      /**
       * @description 已关联案事件改变页码后请求接口数据
       * @pageSize 每页显示数据记录数
       */
      pageSizeChange (pageSize) {
        this.fetchData(pageSize)
      },
      /**
       * @description 已关联案事件当前页码改变后处理数据
       * @pageNo 当前页码
       */
      currentPageChange (pageNo) {
        this.fetchData(this.pageSize, pageNo - 1)
      },
      fetchData (pageSize = 10, pageNo = 0) {
        this.listLoading = true
        let params = {
          pageNo,
          pageSize,
          ...this.formInline
        }
        this.getJustList(params).then(res => {
          this.listLoading = false
          console.log(res)
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
