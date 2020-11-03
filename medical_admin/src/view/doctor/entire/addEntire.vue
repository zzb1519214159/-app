<!-- 医生管理  >  全部医生  >  新增编辑 -->
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm generalNew confirm"
    >
      <el-form-item label="头像" class="imgWidth" prop="header">
        <div class="uploadClass">
          <upload-index
            @uploadData="uploadData"
            :uploadDo="uploadUrl"
          ></upload-index>
          <p>（建议上传142px*142px的图片）</p>
        </div>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="绑定手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入11位数的手机号码"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-select v-model="ruleForm.title" placeholder="请选择">
          <el-option
            v-for="item in optionsA"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执业点" prop="departments2Id">
        <select-index
          ref="areaObj"
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
      <el-form-item label="个人简介" prop="profile">
        <el-input
          type="textarea"
          :rows="4"
          v-model="ruleForm.profile"
          placeholder="请输入50-200字的介绍文字"
        ></el-input>
      </el-form-item>
      <el-form-item label="擅长疾病" prop="goodAtDisease">
        <el-input
          type="textarea"
          :rows="4"
          v-model="ruleForm.goodAtDisease"
          placeholder="请输入50-200字的介绍文字"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="专属互联网医助" prop="medicalAid">
        <el-select v-model="ruleForm.medicalAid" placeholder="请选择">
          <el-option
            v-for="item in optionsB"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="跳转小程序" class="imgWidth">
        <img src="../../../assets/images/404.png" />
      </el-form-item>
      <el-form-item>
        <el-button @click="superior">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadIndex from "@com/upload";
import selectIndex from "@com/select";
import {
  doctorListAdd,
  hospitalDepartments,
  hospitalList,
  doctorDetail
} from "@/api";
export default {
  components: {
    uploadIndex,
    selectIndex
  },
  data() {
    return {
      ruleForm: {
        name: "",
        mobile: "",
        header: "",
        title: "",
        hospitalId: null,
        departments1Id: null,
        departments2Id: null,
        profile: "",
        goodAtDisease: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, message: "请输入11位数的电话号码", trigger: "blur" }
        ],
        title: [{ required: true, message: "请选择职称", trigger: "change" }],
        departments2Id: [
          { required: true, message: "请选择执业点", trigger: "change" }
        ],
        profile: [
          { required: true, message: "请输入个人简介", trigger: "blur" }
        ],
        goodAtDisease: [
          { required: true, message: "请输入擅长疾病", trigger: "blur" }
        ],
        header: [{ required: true, message: "请上传图片", trigger: "change" }]
      },
      optionsA: [
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
      optionsB: [
        {
          value: "杨洋",
          label: "杨洋"
        },
        {
          value: "李晓红",
          label: "李晓红"
        }
      ],
      options: [],
      options1: [],
      options2: [],
      regionItem: {},
      entireId: -1,
      uploadUrl:""
    };
  },
  methods: {
    uploadData(val) {
      this.ruleForm.header = val;
    },
    // 父子传值数据
    dataTransmit(item) {
      this.regionItem = item;
      this.ruleForm.hospitalId = item.provinceId;
      this.ruleForm.departments1Id = item.cityId;
      this.ruleForm.departments2Id = item.areaId;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (data.val === "") {
          this.hospitalListDo();
        } else {
          let parentId = 0;
          parentId =
            this.regionItem.text === "provinceId"
              ? parentId
              : this.regionItem.cityId;
          this.hospitalDepartmentsDo(this.regionItem[data.val], parentId);
        }
      }
    },
    superior() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doctorListAddDo(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增接口
    doctorListAddDo(data) {
      doctorListAdd(data).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.superior();
        }
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
            this.options.push({ name: item.name, cityId: item.id });
          });
        }
      });
    },
    // 详情接口
    doctorDetailDo() {
      doctorDetail({ id: this.entireId }).then(res => {
        if (res.code === 0) {
          this.ruleForm = res.data;
          // 子组件通过ref回显
          this.$refs.areaObj.ruleForm.provinceId = res.data.hospitalId;
          this.$refs.areaObj.ruleForm.cityId = res.data.departments1Id;
          this.$refs.areaObj.ruleForm.areaId = res.data.departments2Id;
          this.regionItem = res.data;
          this.regionItem.cityId = res.data.departments1Id;
          this.uploadUrl = res.data.header;
          this.hospitalListDo();
          this.hospitalDepartmentsDo(res.data.hospitalId, 0);
          this.hospitalDepartmentsDo(
            res.data.hospitalId,
            res.data.departments1Id
          );
        }
      });
    }
  },
  created() {
    if (this.$route.query.name === "编辑医生") {
      this.entireId = this.$route.query.id;
      this.doctorDetailDo();
    }
  },
  mounted() {
    this.uploadBoole = true;
  },
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  .imgWidth {
    img {
      width: 80px;
    }
  }
}
.uploadClass {
  display: flex;
  align-items: flex-end;
  p {
    margin-left: 5px;
    font-size: 12px;
    color: $color999;
  }
}
</style>