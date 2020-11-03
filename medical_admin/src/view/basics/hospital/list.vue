<!-- 基本设置 > 医院管理 -->
<template>
  <div>
    <el-form class="paddingClass headerCommon" ref="resetForm">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="医院名称">
          <el-input v-model="FormName" placeholder="请输入医生姓名或账号" clearable></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain @click="addClick('新增')">+ 新增</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格 -->
    <div class="paddingClass tableTop">
      <el-table :data="tableData" border style="width: 100%" class="bottom">
        <el-table-column
          v-for="(item,index) in listParameter"
          :key="index"
          :prop="item.prop"
          :label="item.title"
          :width="item.size"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addClick('编辑',scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="addOfficeClick(scope.row.id)">添加科室</el-button>
            <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <kh-pagination
        @changeLimit="changeLimit"
        @changePage="changePage"
        :page="page"
        :limit="limit"
        :totalCount="totalCount"
      ></kh-pagination>
    </div>
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination";
import { hospitalList, deleteList } from "@/api";
export default {
  components: {
    khPagination
  },
  data() {
    return {
      FormName: "",
      value: [],
      listParameter: [
        {
          prop: "updateTimeStr",
          title: "更新时间"
        },
        {
          prop: "name",
          title: "医院名称"
        },
        {
          prop: "grade",
          title: "医院等级"
        },
        {
          prop: "address",
          title: "地址"
        },
        {
          prop: "e",
          title: "科室"
        },
        {
          prop: "f",
          title: "医生数"
        }
      ],
      tableData: [],
      options: [
        {
          value: 3,
          label: "三级甲等"
        },
        {
          value: 2,
          label: "二级甲等"
        }
      ],
      // 当前页
      page: 1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount: 0
    };
  },
  methods: {
    query() {
      this.page = 1;
      this.limit = 10;
      this.hospitalListHospital();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.hospitalListHospital();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.hospitalListHospital();
    },
    addClick(text, id) {
      this.$router.push({
        path: "/basics/hospital/addHospital",
        query: { name: text + "医院", id }
      });
    },
    addOfficeClick(id) {
      this.$router.push({ path: "/basics/hospital/addOffice", query: { id } });
    },
    handleChange(value) {
      console.log(value);
    },
    openClick(id) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteListHospital(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除接口
    deleteListHospital(id) {
      deleteList({ id }).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.hospitalListHospital();
        }
      });
    },
    // 列表接口
    hospitalListHospital() {
      let data = {
        page: this.page,
        limit: this.limit,
        name: this.FormName
      };
      hospitalList(data).then(res => {
        if (res.code === 0) {
          this.totalCount = res.page.totalCount;
          this.options.forEach(item => {
            res.page.list.forEach(item1 => {
              if (item.value === item1.grade) {
                item1.grade = item.label;
                return;
              }
            });
          });
          this.tableData = res.page.list;
        }
      });
    }
  },
  created() {
    this.hospitalListHospital();
  }
};
</script>
<style lang="scss" scoped>

</style>