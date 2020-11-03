<!-- 医生管理  >  全部医生/列表 -->
<template>
  <div>
    <el-form class="paddingClass" ref="ruleForm">
      <div class="demo-ruleForm">
        <el-form-item label="医生">
          <el-input v-model="ruleForm.name" placeholder="请输入医生姓名或账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-select v-model="ruleForm.title" placeholder="请选择" clearable>
            <el-option
              v-for="item in optionsTitle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      <div class="demo-ruleForm ringth registerRouleForm">
        <el-form-item label="加入时间">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            clearable
          ></el-date-picker>
        </el-form-item>
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
            <el-button type="text" size="small" @click="resetClick(scope.row.id)">重设密码</el-button>
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
    <el-dialog title="重设密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-width="100px"
        class="index-ruleForm"
      >
        <el-form-item
          prop="account"
          :label="ruleForm.name+'医生'"
          class="doctorItem"
        >手机登录账号：{{ruleForm.mobile}}</el-form-item>
        <el-form-item label="重置新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再输入一次" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="bottom">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination";
import selectIndex from "@com/select";
import {
  doctorList,
  updatePassword,
  doctorDetail,
  doctorDelete,
  hospitalList,
  hospitalDepartments
} from "@/api";
export default {
  components: {
    selectIndex,
    khPagination
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        title: ""
      },
      listParameter: [
        {
          prop: "addTimeStr",
          title: "加入时间"
        },
        {
          prop: "name",
          title: "医生姓名"
        },
        {
          prop: "mobile",
          title: "账号"
        },
        {
          prop: "hospital",
          title: "执业点",
          size: 260
        },
        {
          prop: "level2Departments",
          title: "科室"
        },
        {
          prop: "title",
          title: "职称"
        },
        {
          prop: "sufferer",
          title: "患者数"
        },
        {
          prop: "disease",
          title: "病程数"
        }
      ],
      tableData: [],
      optionsTitle: [
        {
          value: "主任医师",
          label: "主任医师"
        },
        {
          value: "副主任医师",
          label: "副主任医师"
        },
        {
          value: "主治医师",
          label: "主治医师"
        }
      ],
      options: [],
      options1: [],
      options2: [],
      value: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        mobile: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "至少6位", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, message: "至少6位", trigger: "blur" }
        ]
      },
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
      if (this.value) {
        this.ruleForm.startTime = this.value[0];
        this.ruleForm.endTime = this.value[1];
      } else {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
      }
      this.doctorListDo();
    },
    dataTransmit(item) {
      this.ruleForm.hospitalId = item.provinceId;
      this.ruleForm.departments1Id = item.cityId;
      this.ruleForm.departments2Id = item.areaId;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (!data.val) {
          this.hospitalListDo();
        } else {
          data.val === "provinceId"
            ? this.hospitalDepartmentsDo(this.ruleForm.hospitalId, 0)
            : this.hospitalDepartmentsDo(
                this.ruleForm.hospitalId,
                this.ruleForm.departments1Id
              );
        }
      }
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.doctorListDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.doctorListDo();
    },
    doctor(item) {
      console.log(item);
    },
    addClick(text, id) {
      this.$router.push({
        path: "/doctor/entire/addEntire",
        query: { name: text + "医生", id }
      });
    },
    resetClick(id) {
      this.doctorDetailDo(id);
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            password: this.ruleForm.checkPass,
            id: this.ruleForm.id
          };
          this.updatePasswordDo(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openClick(id) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doctorDeleteDo(id);
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
    doctorDeleteDo(id) {
      doctorDelete({ id }).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.doctorListDo();
        }
      });
    },
    // 详情接口
    doctorDetailDo(id) {
      doctorDetail({ id }).then(res => {
        if (res.code === 0) {
          this.ruleForm.name = res.data.name;
          this.ruleForm.mobile = res.data.mobile;
          this.ruleForm.id = res.data.id;
        }
      });
    },
    // 修改密码接口
    updatePasswordDo(data) {
      updatePassword(data).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.dialogVisible = false;
        }
      });
    },
    // 列表接口
    doctorListDo() {
      let data = {
        page: this.page,
        limit: this.limit,
        ...this.ruleForm
      };
      doctorList(data).then(res => {
        if (res.code === 0) {
          this.totalCount = res.page.totalCount;
          this.tableData = res.page.list;
        }
      });
    }
  },
  created() {
    this.doctorListDo();
  }
};
</script>
<style lang="scss" scoped>
.doctorItem {
  /deep/ .el-form-item__label {
    width: auto !important;
  }
}
.bottom{
  /deep/.el-table__body-wrapper{
    height: 510px;
  }
}
</style>