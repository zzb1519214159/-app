<!-- 运营管理 > 视频管理/列表  -->
<template>
  <div>
    <el-form class="paddingClass headerCommon" ref="resetForm">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="医生">
          <el-input v-model="resetForm.name" placeholder="请输入医生姓名或账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="执业点">
          <select-index
            :options="options"
            :options1="options1"
            :options2="options2"
            @dataTransmit="dataTransmit"
            @judgeIndex="judgeIndex"
            textDefault="选择医院"
            textDefault1="选择一级科室"
            textDefault2="选择二级科室"
          />
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
        <el-table-column prop="updateTimeStr" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="name" label="视频名" align="center"></el-table-column>
        <el-table-column label="视频封面" align="center">
          <template slot-scope="scope">
            <el-image
              slot="error"
              style="width: 60px; height: 60px"
              :src="user_img+scope.row.titleImg"
              :preview-src-list="[user_img+scope.row.titleImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="doctor" label="医生" align="center"></el-table-column>
        <el-table-column
          prop="hospital"
          label="医院"
          align="center"
          width="300"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="level2Departments" label="科室" align="center"></el-table-column>
        <el-table-column prop="player" label="播放次数" align="center"></el-table-column>
        <el-table-column prop="forward" label="转发次数" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="previewClick(scope.row.url)">预览</el-button>
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
    <el-dialog title="预览视频" :visible.sync="dialogVisible" width="30%">
      <video width="536px" height="240" controls :src="videoUrl"></video>
    </el-dialog>
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination";
import selectIndex from "@com/select";
import {
  operateVideo,
  operateDelete,
  hospitalList,
  hospitalDepartments
} from "@/api";
export default {
  components: {
    selectIndex,
    khPagination
  },
  data() {
    return {
      resetForm: {
        name: ""
      },
      tableData: [],
      dialogVisible: false,
      options: [],
      options1: [],
      options2: [],
      // 当前页
      page: 1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount: 0,
      videoUrl:""
    };
  },
  methods: {
    query() {
      this.page = 1;
      this.limit = 10;
      this.operateVideoDo();
    },
    dataTransmit(item) {
      this.resetForm.hospitalId = item.provinceId;
      this.resetForm.departments1Id = item.cityId;
      this.resetForm.departments2Id = item.areaId;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (!data.val) {
          this.hospitalListDo();
        } else {
          data.val === "provinceId"
            ? this.hospitalDepartmentsDo(this.resetForm.hospitalId, 0)
            : this.hospitalDepartmentsDo(
                this.resetForm.hospitalId,
                this.resetForm.departments1Id
              );
        }
      }
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.operateVideoDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.operateVideoDo();
    },
    doctor(item) {
      console.log(item);
    },
    addClick(text, id) {
      this.$router.push({
        path: "/operation/video/addVideo",
        query: { name: text + "视频", id }
      });
    },
    previewClick(url) {
      this.videoUrl = this.user_img+url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          setTimeout(() => {
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openClick(id) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateDeleteDo(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取医院科室接口
    hospitalDepartmentsDo(hospitalId, parentId) {
      let data = {
        hospitalId,
        parentId
      };
      hospitalDepartments(data).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            item.cityId = item.departmentId;
          });
          if (parentId === 0) {
            this.options1 = res.data;
          } else {
            this.options2 = res.data;
          }
        }
      });
    },
    // 医院列表接口
    hospitalListDo() {
      hospitalList({ limit: 500 }).then(res => {
        if (res.code === 0) {
          res.page.list.forEach(item => {
            item.cityId = item.id;
          });
          this.options = res.page.list;
        }
      });
    },
    // 删除接口
    operateDeleteDo(id) {
      operateDelete({ id }).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.operateVideoDo();
        }
      });
    },
    // 列表接口
    operateVideoDo() {
      let data = {
        page: this.page,
        limit: this.limit,
        ...this.resetForm
      };
      operateVideo(data).then(res => {
        if (res.code === 0) {
          this.totalCount = res.page.totalCount;
          this.tableData = res.page.list;
        }
      });
    }
  },
  created() {
    this.operateVideoDo();
  }
};
</script>
<style lang="scss" scoped>
</style>