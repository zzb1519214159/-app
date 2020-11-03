<!-- 运营管理 > 视频管理  > 新增视频 -->
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm generalNew confirm"
    >
      <el-form-item label="视频名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="选择医生" prop="doctorId">
        <select-index 
          ref="areaObj"
          :options="options"
          :options1="options1"
          :options2="options2"
          :options3="options3"
          @dataTransmit="dataTransmit"
          @judgeIndex="judgeIndex"
          textDefault="选择医院"
          textDefault1="选择一级科室"
          textDefault2="选择二级科室"
          textDefault3="选择医生"/>
      </el-form-item>
      <el-form-item label="上传视频" prop="url">
        <video-index @videoData="videoData" :videoUrl="videoUrl"/>
      </el-form-item>
      <el-form-item label="视频封面" prop="titleImg">
        <div class="uploadClass">
          <upload-index
            @uploadData="uploadData"
            :uploadDo="uploadUrl"
          ></upload-index>
          <p>（建议上传142px*142px的图片）</p>
        </div>
      </el-form-item>
      <el-form-item label="视频介绍" prop="intro">
        <el-input type="textarea" v-model="ruleForm.intro" :rows="4"></el-input>
      </el-form-item>
      <el-form-item class="bottomBotton">
        <el-button @click="superior">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadIndex from "@com/upload"
import videoIndex from "@com/video"
import selectIndex from "@com/select"
import {addVideo,hospitalList,hospitalDepartments,doctorList,operateDetail} from "@/api";
export default {
  components:{uploadIndex,videoIndex,selectIndex},
  data() {
    return {
      ruleForm: {
        name:"",
        url:"",
        titleImg:"",
        hospitalId:null,
        departments1Id:null,
        departments2Id:null,
        doctorId:null,
      },
      rules: {
        name: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
        ],
        doctorId: [
          { required: true, message: "选择医生", trigger: "change" }
        ],
        titleImg: [
          { required: true, message: "选择视频封面", trigger: "change" }
        ],
        url: [
          { required: true, message: "选择视频", trigger: "change" }
        ],
      },
      options: [],
      options1:[],
      options2:[],
      options3:[],
      uploadUrl:"",
      videoUrl:"",
      regionItem:{}
    };
  },
  methods: {
    uploadData(val){
      this.ruleForm.titleImg = val;
    },
    videoData(url){
      this.ruleForm.url = url;
    },
    // 父子传值数据
    dataTransmit(item) {
      this.regionItem = item;
      this.ruleForm.hospitalId = item.provinceId;
      this.ruleForm.departments1Id = item.cityId;
      this.ruleForm.departments2Id = item.areaId;
      this.ruleForm.doctorId = item.d;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (data.val === "") {
          this.hospitalListDo();
        } else {
          let parentId = 0;
          if(data.val==='areaId'){
            this.doctorListDo(this.regionItem.areaId);
          }else{
            parentId = data.val === "provinceId"? parentId : this.regionItem.cityId;
            this.hospitalDepartmentsDo(this.regionItem[data.val], parentId);
          }
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addVideoDo(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    superior() {
      this.$router.go(-1);
    },
    // 全部医生
    doctorListDo(id){ 
      let data = {
        departments2Id:id,
        limit:500
      }
      doctorList(data).then(res=>{
        if (res.code === 0) {
          res.page.list.forEach(item => {
            item.cityId = item.id;
          });
        }
        this.options3 =  res.page.list;
      })
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
    // 新增接口
    addVideoDo(data){
      addVideo(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.superior();
        }
      })
    },
    // 详情接口
    operateDetailDo(id){
      operateDetail({id}).then(res=>{
        if(res.code===0){
          this.ruleForm = res.data;
          this.uploadUrl = res.data.titleImg;
          this.videoUrl = res.data.url;
          let dataObj = {
            provinceId:res.data.hospitalId,
            cityId:res.data.departments1Id,
            areaId:res.data.departments2Id,
            d:res.data.doctorId,
          };
          // 子组件通过ref回显
          this.$refs.areaObj.ruleForm = dataObj;
          this.regionItem = dataObj;
          this.hospitalListDo();
          this.hospitalDepartmentsDo(dataObj.provinceId, 0);
          this.hospitalDepartmentsDo(
            dataObj.provinceId,
            dataObj.cityId
          );
          this.doctorListDo(dataObj.areaId);
        }
      })
    },
  },
  created() {
    if(this.$route.query.name==="编辑视频"){
      this.operateDetailDo(this.$route.query.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  height: 800px;
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