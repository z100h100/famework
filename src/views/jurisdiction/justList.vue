<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户角色">
          <el-input v-model="formInline.user" placeholder="用户角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onRoleAdd">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row>
      <el-table-column label="用户组">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column label="修改者" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: right;margin-top: 10px"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>

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
        },
        currentPage: 1
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      onSubmit() {
        this.listLoading = false
      },
      onRoleAdd() {
        this.$route.push('/jurisdiction/justModify')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
