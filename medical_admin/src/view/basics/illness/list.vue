<!-- 基本设置 > 疾病管理 -->
<template>
  <div>
    <el-form class="paddingClass" ref="resetForm">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="疾病名称">
          <el-input v-model="resetForm.key" placeholder="请输入疾病关键字" clearable></el-input>
        </el-form-item>
         <el-form-item label="按科室筛选" class="selectFlex">
          <select-index 
            :options="options"
            :options1="options1"
            @dataTransmit="dataTransmit"
            @judgeIndex="judgeIndex"
            textDefault="选择一级科室"
            textDefault1="选择二级科室"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain @click="compileIllness">编辑\合并疾病</el-button>
        </el-form-item>
      </div>
    </el-form>
    <p class="borderP"></p>
    <div class="bodyIllness generalNew">
      <div class="commonTag">
        <p class="bottonLfet"><el-button type="primary" plain @click="addIllness">+ 新增疾病</el-button></p>
        <el-tag
          class="littleHand tagDefault"
          size="medium"
          v-for="(tag,index) in dynamicTags"
          :key="index"
          closable
          :type="tag.type"
          @close="handleClose(tag.id)"
          effect="plain"
          @click="tagClick(tag,index)"
          :class="{tagClocr:tag.boole}" >
            {{tag.name}}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import selectIndex from "@com/select"
import {diseaseSearch,diseaseEdit,diseaseMerge,diseaseDelete,listDepartments} from "@/api"

export default {
  components:{
    selectIndex
  },
  data() {
    return {
      resetForm: {
        key:"",
        departments1:null,
        departments2:null,
      },
      value: [],
      dynamicTags:[],
      itemPush:[],
      options:[],
      options1:[],
    };
  },
  methods: {
    query(){
      this.diseaseSearchDo();
    },
    dataTransmit(item){
      this.resetForm.departments1 = item.provinceId;
      this.resetForm.departments2 = item.cityId;
    },
    judgeIndex(data){
      if(data.boole){
        if(!data.val){
          this.listDepartmentsDo(0);
        }else{
          this.listDepartmentsDo(this.resetForm.departments1);
        }
      }
    },
    addIllness(){
      this.$prompt('请输入新疾病名称', '新增疾病', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder:"单个疾病名称不超过8个字",
        inputPattern:/^.{1,8}$/,
        inputErrorMessage: '单个疾病名称不超过8个字'
      }).then(({ value }) => {
        this.diseaseEditDo(0,value);
      }).catch(() => {})
    },
    compileIllness(){
      let text = [];
      this.itemPush.forEach(item=>{
        text.push(item.name);
      });
      this.$prompt('请输入新疾病名称', '编辑,合并疾病', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:/^.{1,8}$/,
        inputErrorMessage: '单个疾病名称不超过8个字',
        inputValue:text.toString()
      }).then(({ value }) => {
        if(this.itemPush.length===1){
          this.diseaseEditDo(this.itemPush[0].id,value);
        }else{
          let data = {
            id:this.itemPush[1].id,
            mergeId:this.itemPush[0].id,
            name:value
          }
          this.diseaseMergeDo(data);
        }
      }).catch(() => {})
    },
    handleClose(id) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.diseaseDeleteDo(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    tagClick(item,index){
      this.dynamicTags[index].boole = !this.dynamicTags[index].boole;
      if(item.boole===true){
        this.itemPush.push(item);
      }else{
        this.itemPush.forEach((item1,index1)=>{
          if(item1.id===item.id){
            this.itemPush.splice(index1,1);
          }
        })
      };
      if(this.itemPush.length===3){
        this.$message({
          message: '一次只能合并俩个',
          type: 'warning'
        });
      };
    },
    // 科室列表下拉框数据
    listDepartmentsDo(parentId){
      listDepartments({parentId}).then(res=>{
        if(res.code===0){
          res.data.forEach(item=>{
            item.cityId = item.id;
          });
          if(parentId===0){
            this.options = res.data;
          }else{
            this.options1 = res.data;
          };
        }
      })
    },
    // 删除疾病接口
    diseaseDeleteDo(id){
      diseaseDelete({id}).then(res=>{
       this.fuDo(res);
      })
    },
    // 合并疾病接口
    diseaseMergeDo(data){
      diseaseMerge(data).then(res=>{
        this.fuDo(res);
      })
    },
    // 新增/编辑接口
    diseaseEditDo(id,name){
      let data = {
        id,
        name
      };
      diseaseEdit(data).then(res=>{
        this.fuDo(res);
      })
    },
    // 查询/列表接口
    diseaseSearchDo(){
      diseaseSearch(this.resetForm).then(res=>{
        if(res.code===0){
          res.data.forEach(item=>{
            item.boole = false;
          })
          this.dynamicTags = res.data;
        }
      })
    },
    // 提示信息和列表
    fuDo(res){
      if(res.code===0){
        this.changLoader(res.message);
        this.diseaseSearchDo();
      }
    }
  },
  created(){
    this.diseaseSearchDo();
  }
};
</script>
<style lang="scss" scoped>
.paddingClass {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .selectFlex{
    /deep/.el-form-item__content{
      display: flex;
    }
    .selectLeft{
      margin-left: 10px;
    }
  }
}
.bodyIllness{
  height: 580px;
  .commonTag{
    display: flex;
    flex-wrap: wrap;
    .el-tag{
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .bottonLfet{
      margin-right: 5px;
    }
    .tagClocr{
      border-color:$color409EFF !important;
    }
    .tagDefault{
      border-color: $colordcdfe6;
      color: $color606266;
      /deep/.el-tag__close{
        color: $color606266;
        &:hover{
          background-color:$colordcdfe6;
        }
      }
    }
  }
}

</style>