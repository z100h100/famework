<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="formInline.andOr" placeholder="角色名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onRoleAdd">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="roleList" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row>
      <el-table-column label="角色">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="size" @click="roleModifyClick(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
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
        roleList: state => state.role.roleList.content,
        total: state => state.role.roleList.totalPages,
        pageSize: state => state.role.roleList.size,
        currentPage: state => state.role.roleList.number
      })
    },
    filters: {
      // funFilterRoles (data) {
      //   return data.map(item => {
      //     return item.name
      //   }).toString()
      // }
    },
    created () {
      this.fetchData()
    },
    methods: {
      ...mapActions([
        'getRoleList'
      ]),
      roleModifyClick (row) {
        this.$router.push({path: '/jurisdiction/roleModify', query: {id: row.id}})
      },
      onSubmit() {
        this.listLoading = false
      },
      onRoleAdd() {
        this.$router.push('/jurisdiction/roleModify')
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
        this.getRoleList(params).then(res => {
          this.listLoading = false
          console.log(res)
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
