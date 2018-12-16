<template>
  <div class="app-container">
    <div>货物托运单</div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      list: null,
      listLoading: true
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
  created () {
    this.fetchData()
  },
  methods: {
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
