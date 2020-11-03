
  <!-- 
  * 分页
  * 用法：<kh-pagination  :totalCount="100" :page="1" :limit="limit" @changeLimit="changeLimit" @changePage="changePage"/>
  -->
<template>
  <div class="kh-pagination">
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    />
  </div>
</template>

<script>
export default {
  name: "KhPagination",
  props: {
    //当前页
    page: {
      type: Number,
      default: 1
    },
    //当前页数
    limit: {
      type: Number,
      default: 10
    },
    pageData:Object,
    //总数
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    };
  },
  methods: {
    // 更换一页最大值
    handleSizeChange(val) {
      this.$emit("changeLimit",val);
    },
    // 更改当前页
    handleCurrentChange(val) {
      this.$emit("changePage",val);
    }
  }
};
</script>

<style lang="scss" scoped>
.kh-pagination {
  /deep/.el-pagination {
    display: flex;
    justify-content: center;
    padding: 14px 0;
  }
}
</style>
