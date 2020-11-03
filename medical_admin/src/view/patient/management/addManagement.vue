<!-- 患者管理  > 录入患者 > 新增患者 -->
<template>
  <!-- v-wechat-title="'首页'" -->
  <div class="addPatient generalNew">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm confirm"
      label-width="100px"
    >
      <el-form-item label="患者姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="1-10位汉字、英文组合" class="inputBreadth"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="ruleForm.sex" :label="1">男</el-radio>
        <el-radio v-model="ruleForm.sex" :label="0">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="联系人电话"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <select-index
          ref="areaObj"
          :options="optionsSite"
          :options1="optionsSite1"
          :options2="optionsSite2"
          @dataTransmit="dataTransmit"
          @judgeIndex="judgeIndex"
          textDefault="选择省"
          textDefault1="选择市"
          textDefault2="选择区"
        />
        <div class="distance">
          <el-input v-model="ruleForm.address" placeholder="详细地址" class="inputBreadth"></el-input>
        </div>
      </el-form-item>
      <p class="borderP"></p>
      <el-form-item label="就诊时间">
        <el-date-picker
          v-model="ruleForm.visitTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="就诊信息">
        <select-index
          ref="areaObj1"
          :options="optionsSiteTwo"
          :options1="optionsSiteTwo1"
          :options2="optionsSiteTwo2"
          :options3="optionsSiteTwo3"
          @dataTransmit="dataTransmitTwo"
          @judgeIndex="judgeIndexTwo"
          textDefault="选择医院"
          textDefault1="选择一级科室"
          textDefault2="选择二级科室"
          textDefault3="选择医生"
        />
      </el-form-item>
      <el-form-item label="疾病\症状">
        <el-button @click="addIllness">请选择疾病或症状</el-button>
        <div class="tagDelete commonTag">
          <el-tag
            :key="index"
            v-for="(tag,index) in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTab(index)"
            effect="plain"
          >{{tag.name}}</el-tag>
        </div>
      </el-form-item>
      <el-form-item :label="'处方药品'" v-for="(item,index) in remedy" :key="index">
        <div class="addReduce">
          <div class="littleHand" @click="dialogClick(index)">
            <el-input
              v-model="item.name"
              placeholder="选择药品"
              suffix-icon="el-icon-circle-plus-outline"
              readonly
            ></el-input>
          </div>
          <div class="rigth">
            <label>数量</label>
            <el-input v-model="item.count" placeholder="输入数字" type="number"></el-input>
          </div>
          <div class="butttonRigth">
            <el-button type="text" @click="deleteClick(index)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </el-form-item>
      <div class="addItemPlus">
        <el-button type="text" @click="addItem">+再加一项</el-button>
      </div>
      <el-form-item label="收货人">
        <el-input v-model="ruleForm.linkman"></el-input>
      </el-form-item>
      <el-form-item label="收货电话">
        <el-input v-model="ruleForm.receivingMobile" placeholder="收货电话"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <select-index
          ref="areaObj2"
          :options="optionsSiteThree"
          :options1="optionsSiteThree1"
          :options2="optionsSiteThree2"
          @dataTransmit="dataTransmitThree"
          @judgeIndex="judgeIndexThree"
          textDefault="选择省"
          textDefault1="选择市"
          textDefault2="选择区"
        />
        <div class="distance">
          <el-input v-model="ruleForm.visitAddress" placeholder="详细地址" class="inputBreadth"></el-input>
        </div>
      </el-form-item>
      <el-form-item class="index-ruleForm">
        <div class="bottom addBottom">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
    <dialog-illness
      :dialogVisible="dialogVisible"
      :arryData="arryData"
      @determineClick="determineClick"
      @doneBoole="doneBoole"
    />
    <!-- 添加药品浮层 -->
    <dialog-drug
      :tableDataTwo="tableDataTwo"
      :dialogVisible="dialogSupernatant"
      @dialogDrug="dialogDrug"
      @multiple="multiple"
      @booleEmit="booleEmit"
      title="添加药品"
      :state="1"
    />
  </div>
</template>
<script>
import dialogIllness from "@com/dialogIllness";
import selectIndex from "@com/select";
import dialogDrug from "@com/dialogDrug";
import {
  suffererAdd,
  getCity,
  hospitalList,
  hospitalDepartments,
  doctorList,
  diseaseSearch,
  suffererDetail,
  medicalDrugs
} from "@/api";

export default {
  components: {
    dialogIllness,
    selectIndex,
    dialogDrug
  },
  data() {
    return {
      title: "首页",
      ruleForm: {
        name: "",
        sex: 1,
        age: "",
        mobile: "",
        provinceId: null,
        cityId: null,
        areaId: null,
        address: "",
        visitTime: "",
        visitHospital: null,
        visitDepartments1: null,
        visitDepartments2: null,
        doctorId: null,
        linkman: "",
        visitAddress: "",
        receivingMobile: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入患者姓名", trigger: "blur" },
          { min: 1, max: 10, message: "1-10位汉字、英文组合", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      },
      value: [],
      optionsSite: [],
      optionsSite1: [],
      optionsSite2: [],
      optionsSiteTwo: [],
      optionsSiteTwo1: [],
      optionsSiteTwo2: [],
      optionsSiteTwo3: [],
      optionsSiteThree: [],
      optionsSiteThree1: [],
      optionsSiteThree2: [],
      value1: "",
      dialogVisible: false,
      arryData: [],
      itemIndex: -1,
      dynamicTags: [],
      remedy: [
        {
          index: 0
        }
      ],
      dialogSupernatant: false,
      tableDataTwo: [],
      indexDrug: -1, //处方药品的下标
      regionItem: {},
      booleManagement: false
    };
  },
  methods: {
    // 父子传值数据
    dataTransmit(item) {
      this.regionItem = item;
      this.ruleForm.provinceId = item.provinceId;
      this.ruleForm.cityId = item.cityId;
      this.ruleForm.areaId = item.areaId;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (data.val === "") {
          this.getCityList(false);
        } else {
          this.getCityList(
            false,
            this.regionItem[data.val],
            this.regionItem.text
          );
        }
      }
    },
    dataTransmitTwo(item) {
      this.regionItem = item;
      this.ruleForm.visitHospital = item.provinceId;
      this.ruleForm.visitDepartments1 = item.cityId;
      this.ruleForm.visitDepartments2 = item.areaId;
      this.ruleForm.doctorId = item.d;
    },
    judgeIndexTwo(data) {
      if (data.boole) {
        if (data.val === "") {
          this.hospitalListDo();
        } else {
          if (this.regionItem.text === "areaId") {
            this.doctorListDo(this.regionItem.areaId);
          } else {
            let parentId = 0;
            parentId =
              this.regionItem.text === "provinceId"
                ? parentId
                : this.regionItem.cityId;
            this.hospitalDepartmentsDo(this.regionItem[data.val], parentId);
          }
        }
      }
    },
    dataTransmitThree(item) {
      this.regionItem = item;
      this.ruleForm.visitProvinceId = item.provinceId;
      this.ruleForm.visitCityId = item.cityId;
      this.ruleForm.visitAreaId = item.areaId;
    },
    judgeIndexThree(data) {
      if (data.boole) {
        if (data.val === "") {
          this.getCityList(true);
        } else {
          this.getCityList(
            true,
            this.regionItem[data.val],
            this.regionItem.text
          );
        }
      }
    },
    dialogClick(index) {
      this.medicalDrugsDo();
      this.indexDrug = index;
      this.dialogSupernatant = true;
    },
    booleEmit() {
      this.dialogSupernatant = false;
    },
    dialogDrug(data) {
      this.remedy[this.indexDrug] = data;
      this.dialogSupernatant = false;
    },
    multiple(data) {
      this.remedy.splice(this.indexDrug, 1, ...data);
      this.dialogSupernatant = false;
    },
    addIllness() {
      this.diseaseSearchDo();
    },
    //病症弹窗
    doneBoole(boole) {
      this.dialogVisible = boole;
    },
    determineClick(array) {
      this.dynamicTags.push(...array.itemPush);
      this.dialogVisible = array.dialogBoole;
    },
    handleCloseTab(index) {
      this.dynamicTags.splice(index, 1);
    },
    addItem() {
      let index = this.remedy.length;
      this.remedy.push({ index });
    },
    deleteClick(index) {
      this.remedy.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let diseaseArry = [];
          let drugsArry = [];
          if (this.remedy.length > 0) {
            if (this.remedy[0].id) {
              this.remedy.forEach(item => {
                if (!item.count) {
                  this.$message({
                    message: "处方药品:数量必填",
                    type: "warning"
                  });
                  return;
                }
                drugsArry.push({ drugsId: item.id, num: item.count });
              });
              this.ruleForm.drugs = JSON.stringify(drugsArry);
            }
          }
          this.dynamicTags.forEach(item => {
            diseaseArry.push(item.id);
          });
          this.ruleForm.disease = diseaseArry.join(",");
          this.suffererAddDo(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.go(-1);
    },
    // 药品列表
    medicalDrugsDo() {
      medicalDrugs({ limit: 200 }).then(res => {
        if (res.code === 0) {
          this.tableDataTwo = res.page.list;
        }
      });
    },
    // 疾病列表接口
    diseaseSearchDo() {
      diseaseSearch().then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            item.boole = false;
          });
          this.arryData = res.data;
          this.dialogVisible = true;
        }
      });
    },
    // 医生列表接口
    doctorListDo(departments2Id) {
      let data = {
        departments2Id,
        limit: 200
      };
      doctorList(data).then(res => {
        if (res.code === 0) {
          res.page.list.forEach(item => {
            item.cityId = item.id
          });
          this.optionsSiteTwo3 = res.page.list;
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
            this.optionsSiteTwo1 = res.data;
          } else {
            this.optionsSiteTwo2 = res.data;
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
          this.optionsSiteTwo = res.page.list;
        }
      });
    },
    // 地址接口
    getCityList(boole, parentId, text) {
      getCity({ parentId }).then(res => {
        if (res.code === 0) {
          if (!boole) {
            if (!text) {
              this.optionsSite = res.data;
            } else if (text === "provinceId") {
              this.optionsSite1 = res.data;
            } else {
              this.optionsSite2 = res.data;
            }
          } else {
            if (!text) {
              this.optionsSiteThree = res.data;
            } else if (text === "provinceId") {
              this.optionsSiteThree1 = res.data;
            } else {
              this.optionsSiteThree2 = res.data;
            }
          }
        }
      });
    },
    // 详情接口
    suffererDetailDo(id) {
      suffererDetail({ id }).then(res => {
        if (res.code === 0) {
          // 深度克隆
          let obj = JSON.parse(JSON.stringify(res.data.visit));
          delete res.data.visit;
          let data = {
            ...res.data,
            ...obj
          };
          this.ruleForm = data;
          this.regionItem = data;
          //地区接口
          this.$refs.areaObj.ruleForm = data;
          if (data.provinceId) {
            this.getCityList(false);
          }
          if (data.cityId) {
            this.getCityList(false, data.provinceId, "provinceId");
          }
          if (data.areaId) {
            this.getCityList(false, data.cityId, "cityId");
          }
          // 医院接口
          this.$refs.areaObj1.ruleForm.provinceId = data.visitHospital;
          this.$refs.areaObj1.ruleForm.cityId = data.visitDepartments1;
          this.$refs.areaObj1.ruleForm.areaId = data.visitDepartments2;
          this.$refs.areaObj1.ruleForm.d = data.doctorId;
          if (data.visitHospital) {
            this.hospitalListDo();
          }
          if (data.visitDepartments1) {
            this.hospitalDepartmentsDo(data.visitHospital, 0);
          }
          if (data.visitDepartments2) {
            this.hospitalDepartmentsDo(
              data.visitHospital,
              data.visitDepartments1
            );
          }
          if (data.doctorId) {
            this.doctorListDo(data.visitDepartments2);
          }
          // 病症数据
          data.disease.forEach(item => {
            this.dynamicTags.push({
              id: item.diseaseId,
              name: item.diseaseName
            });
          });
          // 处方药数据
          if (data.drugs.length > 0) {
            this.remedy = [];
          }
          data.drugs.forEach((item, index) => {
            this.remedy.push({
              id: item.drugsId,
              name: item.drugsName,
              count: item.num,
              index
            });
          });
          // 收货地址接口
          this.$refs.areaObj2.ruleForm.provinceId = data.visitProvinceId;
          this.$refs.areaObj2.ruleForm.cityId = data.visitCityId;
          this.$refs.areaObj2.ruleForm.areaId = data.visitAreaId;
          if (data.visitProvinceId) {
            this.getCityList(true);
          }
          if (data.visitCityId) {
            this.getCityList(true, data.visitProvinceId, "provinceId");
          }
          if (data.visitAreaId) {
            this.getCityList(true, data.visitCityId, "cityId");
          }
          setTimeout(() => {
            this.loading.close();
          }, 500);
        }
      });
    },
    // 新增接口
    suffererAddDo(data) {
      suffererAdd(data).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.$router.go(-1);
        }
      });
    },
    // 加载中
    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading"
      });
    }
  },
  created() {
    if (this.$route.query.name === "编辑患者") {
      this.openFullScreen2();
      this.suffererDetailDo(this.$route.query.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.addPatient {
  .inputBreadth {
    width: 400px;
    /deep/.el-input {
      width: 400px;
    }
  }
  .addReduce {
    display: flex;
    .rigth {
      display: flex;
      label {
        width: 50px;
        text-align: right;
        margin-right: 5px;
      }
    }
    .butttonRigth {
      margin-left: 10px;
    }
    /deep/.el-input {
      width: 170px !important;
    }
    .littleHand {
      /deep/ .el-input__inner {
        cursor: pointer;
      }
    }
  }
  .distance {
    margin-top: 10px;
  }
  .addBottom {
    width: 80%;
  }
  .dataPicker {
    // /deep/ .el-input{
    //       width: 35%;
    // }
  }

  .tagDelete {
    /deep/ .el-tag {
      margin-right: 10px;
      margin-top: 10px;
    }
  }
  .addItemPlus {
    margin-left: 100px;
  }
}
</style>