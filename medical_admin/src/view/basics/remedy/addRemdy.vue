<template>
  <div class="generalNew">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm confirm"
    >
      <el-form-item label="药品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="1-50位汉字、英文、数字、符号及组合"></el-input>
      </el-form-item>
      <el-form-item label="药品规格" prop="specifications">
        <el-input v-model="ruleForm.specifications" placeholder="1-50位汉字、英文、数字、符号及组合"></el-input>
      </el-form-item>
      <el-form-item label="厂家" prop="manufactor">
        <el-input v-model="ruleForm.manufactor" placeholder="1-50位汉字、英文、数字、符号及组合"></el-input>
      </el-form-item>
      <el-form-item label="商品名">
        <el-input v-model="ruleForm.tradeName" placeholder="1-50位汉字、英文、数字、符号及组合"></el-input>
      </el-form-item>
      <el-form-item label="零售价" prop="price">
        <el-input v-model="ruleForm.price" type="Number" class="widthInput"></el-input>
      </el-form-item>
      <el-form-item label="药品图片">
        <div class="uploadClass">
          <upload-index @uploadData="uploadData" :uploadDo="uploadUrl" />
          <p>（建议上传142px*142px的图片）</p>
        </div>
      </el-form-item>
      <el-form-item label="药品简介">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入50-200字的药品介绍文字"
          v-model="ruleForm.intro"
        ></el-input>
      </el-form-item>
      <el-form-item label="适用疾病" class="bottomInputWidth">
        <el-autocomplete
          class="inline-input"
          clearable
          v-for="(item,index) in inputArry"
          :key="index"
          v-model="item.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          @clear="hadeClear(index)"
          value-key="name"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="状态" required>
        <el-radio v-model="ruleForm.state" :label="0">上架</el-radio>
        <el-radio v-model="ruleForm.state" :label="1">下架</el-radio>
      </el-form-item>
      <el-form-item class="bottomBotton">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadIndex from "@com/upload";
import { drugsAdd, diseaseSearch, drugsEdit } from "@/api";
export default {
  components: {
    uploadIndex
  },
  data() {
    return {
      ruleForm: {
        name: "",
        specifications: "",
        manufactor: "",
        tradeName: "",
        price: "",
        img: "",
        state: 0,
        intro: "",
        disease: []
      },
      rules: {
        name: [{ required: true, message: "请输入药品名称", trigger: "blur" }],
        specifications: [
          { required: true, message: "请输入药品规格", trigger: "blur" }
        ],
        manufactor: [
          { required: true, message: "请输入厂家", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入零售价", trigger: "blur" }]
      },
      restaurants: [],
      inputArry: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ],
      renedyArry: [],
      uploadUrl: ""
    };
  },
  methods: {
    uploadData(val) {
      this.ruleForm.img = val;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      let boole = false;
      this.inputArry.forEach(item1=>{
        if(item1.name===item.name){
          boole = true;
          return;
        }
      });
      if(!boole){
        this.renedyArry.push(item);
      };
    },
    hadeClear(index) {
      this.renedyArry.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dataArry = this.concat_arr(this.inputArry,this.renedyArry);
          let dataArry1 = [];
          dataArry.forEach(item=>{
            if(item.name){
              dataArry1.push(item);
            }
          });
          let dataArry3 = [...this.renedyArry,...dataArry1]
          this.ruleForm.disease = JSON.stringify(dataArry3);
          this.drugsAddDo(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 过滤数组对象中不相等的
    concat_arr(arr1, arr2) {
      let result = [];
      for (var i = 0; i < arr1.length; i++) {
        var obj = arr1[i];
        var num = obj.name;
        var flag = false;
        for (var j = 0; j < arr2.length; j++) {
          var aj = arr2[j];
          var n = aj.name;
          if (n === num) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          result.push(obj);
        }
      };
      return result;
    },
    cancel() {
      this.$router.go(-1);
    },
    // 详情接口
    drugsEdit(id) {
      drugsEdit({ id }).then(res => {
        if (res.code === 0) {
          this.uploadUrl = res.data.img;
          res.data.disease.forEach((item, index) => {
            this.inputArry[index].name = item.diseaseName;
            this.renedyArry.push({
              name: item.diseaseName,
              id: item.diseaseId
            });
          });
          this.ruleForm = res.data;
        }
      });
    },
    // 疾病查询接口
    diseaseSearchDo() {
      diseaseSearch().then(res => {
        if (res.code === 0) {
          this.restaurants = res.data;
        }
      });
    },
    // 新增接口
    drugsAddDo(data) {
      drugsAdd(data).then(res => {
        if (res.code == 0) {
          this.changLoader(res.message);
          this.cancel();
        }
      });
    }
  },
  created() {
    if (this.$route.query.name === "编辑药品") {
      this.drugsEdit(this.$route.query.id);
    }
    this.diseaseSearchDo();
  }
};
</script>

<style lang="scss" scoped>
.widthInput {
  width: 200px !important;
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
.bottomInputWidth {
  /deep/.el-form-item__content {
    display: flex;
    flex-wrap: wrap;
    .inline-input {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>