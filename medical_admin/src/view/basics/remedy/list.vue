<!-- 基本设置 > 药品管理/列表 -->
<template>
  <div>
    <el-form class="paddingClass headerCommon" ref="ruleForm">
      <div class="demo-ruleForm">
        <el-form-item label="药品名称">
          <el-input v-model="ruleForm.name" placeholder="请输入药品关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="按疾病匹配">
          <el-input v-model="ruleForm.disease" placeholder="请输入疾病关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ruleForm.state" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain>批量导入</el-button>
          <el-button type="primary" plain @click="addClick('新增')">+ 新增药品</el-button>
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
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addClick('编辑',scope.row.id)">编辑</el-button>
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
import { medicalDrugs, drugsDelete } from "@/api";
export default {
  components: {
    khPagination
  },
  data() {
    return {
      ruleForm: {
        name: "",
        disease: "",
        state: null
      },
      listParameter: [
        {
          prop: "num",
          title: "药品编号"
        },
        {
          prop: "name",
          title: "药品名称"
        },
        {
          prop: "specifications",
          title: "规格"
        },
        {
          prop: "manufactor",
          title: "厂家"
        },
        {
          prop: "tradeName",
          title: "商品名"
        },
        {
          prop: "price",
          title: "零售价"
        },
        {
          prop: "disease",
          title: "关联疾病"
        },
        {
          prop: "departments",
          title: "关联科室"
        },
        {
          prop: "state",
          title: "状态"
        }
      ],
      tableData: [],
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "上架"
        },
        {
          value: 1,
          label: "未上架"
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
      this.medicalDrugsDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.medicalDrugsDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.medicalDrugsDo();
    },
    addClick(text, id) {
      this.$router.push({
        path: "/basics/remedy/addRemdy",
        query: { name: text + "药品", id }
      });
    },
    openClick(id) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.drugsDeleteDo(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除接口
    drugsDeleteDo(id) {
      drugsDelete({ id }).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.medicalDrugsDo();
        }
      });
    },
    // 列表接口
    medicalDrugsDo() {
      let data = {
        page: this.page,
        limit: this.limit,
        ...this.ruleForm
      };
      medicalDrugs(data).then(res => {
        if (res.code === 0) {
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item => {
            item.state = item.state === 0 ? "上架" : "下架";
          });
          this.tableData = res.page.list;
        }
      });
    }
  },
  created() {
    this.medicalDrugsDo();
  }
};
</script>
<style lang="scss" scoped>
</style>