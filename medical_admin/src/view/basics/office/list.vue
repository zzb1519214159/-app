<!-- 基本设置 > 科室管理/列表 -->
<template>
  <div>
    <el-form class="paddingClass headerCommon" ref="resetForm">
      <div class="demo-ruleForm">
        <el-form-item label="科室名称">
          <select-index 
            :options="options"
            @dataTransmit="dataTransmit"
            @judgeIndex="judgeIndex"
            textDefault="选择一级科室"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain @click="addClick('新增')">+ 新增一级科室</el-button>
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
        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openIndex(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="addClick(scope.row)" v-if="!scope.row.parentName">新增子科室</el-button>
            <template v-else>
              <el-button type="text" size="small" @click="sicknessClick(scope.row.id)">关联疾病</el-button>
              <el-button type="text" size="small" @click="drugClick(scope.row.id)">关联药品</el-button>
            </template>
            <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
    </div>
    <el-dialog
      title="新增科室"
      :visible.sync="dialogVisible"
      width="33%"
      :before-close="handleClose"
      class="dialogList">
      <p class="dialogText">{{diaogTitle}}</p>
      <el-form class="nameForm">
        <el-form-item label="科室名称" v-for="(item,index) in dialogArry" :key="index">
          <el-input v-model="item.department" placeholder="1-8位英文、数字、汉字及组合"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="preserve" :disabled="arryBoole">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination";
import selectIndex from "@com/select"
import {departmentsList,addDepartments,deleteDepartments,updateDepartments,listDepartments} from "@/api"

export default {
  components:{
    selectIndex,
    khPagination
  },
  data() {
    return {
      parentId:null,
      listParameter: [
        {
          prop: "num",
          title: "科室编号"
        },
        {
          prop: "parentName1",
          title: "一级科室名称"
        },
        {
          prop: "seedName",
          title: "二级科室名称"
        },
        {
          prop: "d",
          title: "关联疾病"
        },
        {
          prop: "e",
          title: "关联药品"
        },
        {
          prop: "f",
          title: "医生数"
        }
      ],
      tableData: [],
      options:[],
      dialogVisible: false,
      dialogArry:[
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
        {department:""},
      ],
      diaogTitle:"新增一级科室",
      arryBoole:true,
      officeId:0,
      // 当前页
      page: 1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount: 0
    };
  },
  watch:{
    dialogArry:{ //监听的对象/数组
     handler:function(newV,oldV){
      newV.forEach(item=>{
        if(item.department){
          this.arryBoole = false;
        }
      })
     },
     deep:true //深度监听设置为 true
   }
  },
  methods: {
    query() {
      this.page = 1;
      this.limit = 10;
      this.departmentsListDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.departmentsListDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.departmentsListDo();
    },
    dataTransmit(item){
      this.parentId = item.provinceId;
    },
    judgeIndex(data){
      if(data.boole){
        this.listDepartmentsDo();
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addClick(item) {
      this.dialogArry.forEach(item=>{
        item.department = '';
      });
      if(item==='新增'){
        this.diaogTitle = '新增一级科室';
        this.officeId = 0;
      }else{
        item.parentName = item.parentName ? item.parentName : '默认'
        this.diaogTitle = '新增'+'"'+item.parentName+'"'+'的子科室';
        this.officeId = item.id;
      };
      this.dialogVisible = true;
    },
    // 科室列表下拉框数据
    listDepartmentsDo(){
      listDepartments({parentId:0}).then(res=>{
        if(res.code===0){
          res.data.forEach(item=>{
            item.cityId=item.id;
          });
          this.options = res.data;
        }
      })
    },
    // 新增科室
    preserve(){
      let dataArry = [];
      this.dialogArry.forEach(item=>{
        if(item.department){
          dataArry.push(item.department);
        }
      });
      let data = {
        departments:dataArry.join(","),
        id:this.officeId
      };
      addDepartments(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.departmentsListDo();
        }
      })
      this.dialogVisible = false;
    },
    // 编辑科室
    openIndex(item){
      let data = "";
      data = item.parentName ? item.name :item.parentName1;
      this.$prompt('科室名称', '编辑科室名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:data
      }).then(({value}) => {
        let data = {
          name:value,
          id:item.id
        }
        updateDepartments(data).then(res=>{
          if(res.code===0){
            this.changLoader(res.message);
            this.departmentsListDo();
          }  
        })
      }).catch(() => {
         
      });
    },
    sicknessClick(id){
      this.$router.push({path:'/basics/office/sickness',query:{id}})
    },
    drugClick(id){
      this.$router.push({path:'/basics/office/drug',query:{id}})
    },
    handleChange(value) {
      console.log(value);
    },
    // 删除科室
    openClick(id) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDepartments({id}).then(res=>{
            if(res.code===0){
              this.changLoader(res.message);
              this.departmentsListDo();
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 科室列表seedName
    departmentsListDo(){
      let data = {
        page: this.page,
        limit: this.limit,
        parentId:this.parentId,
      };
      departmentsList(data).then(res=>{
        if(res.code===0){
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item=>{
            if(!item.parentName){
              item.parentName1 = item.name;
            }else{
              item.parentName1 = item.parentName;
              item.seedName = item.name;
            }
          })
          this.tableData = res.page.list;
        }
      })
    },
  },
  created(){
    this.departmentsListDo();
  },
};
</script>
<style lang="scss" scoped>
.dialogList{
  .nameForm{
    .el-form-item{
      display: inline-flex;
      margin-bottom: 0;
      &:nth-child(odd){
        margin-right: 20px;
      } //偶数行
    }
  }
  .dialogText{
    margin-bottom: 10px;
  }
 /deep/ .el-input{
   width:210px;
 } 
}
</style>