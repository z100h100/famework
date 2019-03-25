<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="formInline.name" placeholder="角色名"></el-input>
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
          <el-button type="text" @click="roleModifyClick(scope.row)">修改</el-button>
          <el-button type="text" @click="roleDelClick(scope.row)">删除</el-button>
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
        roleList: state => state.role.roleList.content,
        total: state => state.role.roleList.totalElements,
        pageSize: state => state.role.roleList.size,
        currentPage: state => state.role.roleList.number + 1
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
        'getRoleList',
        'getDelRole'
      ]),
      roleModifyClick (row) {
        this.$router.push({path: '/jurisdiction/roleModify', query: {id: row.id}})
      },
      roleDelClick (row) {
        let params = {
          id: row.id
        }
        this.getDelRole(params).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.fetchData()
        })
      },
      onSubmit () {
        this.listLoading = false
      },
      onRoleAdd () {
        this.$router.push('/jurisdiction/roleAdd')
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
        let params
        if (this.formInline.name) {
          params = {
            pageNo,
            pageSize,
            params: [
              {
                andOr: 'and',
                name: 'name',
                operation: 'like',
                value: this.formInline.name
              }
            ]
          }
        } else {
          params = {
            pageNo,
            pageSize
          }
        }
        this.getRoleList(params).then(res => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
