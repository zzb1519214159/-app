<!-- 系统管理-系统用户管理 -->
<template>
  <div>
    <div>
      <el-form ref="ruleForm" class="paddingClass displayHeader">
        <div class="demo-ruleForm headerSystemAnd">
          <div class="party">
            <el-form-item label="姓名">
              <el-input v-model="ruleForm.name" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="ruleForm.key" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="时间" clearable>
               <el-date-picker
                v-model="value1"
                type="daterange"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="query">查询</el-button>
        </div>
      </el-form>
    </div>
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
      </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
    </div>
  </div>
</template>

<script>
import {logRecord} from "@/api";
import  {formatDate } from "@/assets/js/time.js";
import khPagination from "@com/kh-pagination"
export default {
  components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:"",
        key:"",
      },
      listParameter: [
        {
          prop: "username",
          title: "用户名",
        },
        {
          prop: "name",
          title: "姓名"
        },
        {
          prop: "c",
          title: "角色名称"
        },
        {
          prop: "addTimeStr",
          title: "操作时间"
        },{
          prop: "content",
          title: "操作描述"
        },
      ],
      tableData: [],
      value1: '',
       // 当前页
      page:1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount:0
    }
  },
  methods:{
    query(){
      if(this.value1){
        this.ruleForm.startTime = this.value1[0];
        this.ruleForm.endTime = this.value1[1];
      }else{
        this.ruleForm.startTime = '';
        this.ruleForm.endTime = '';
      }
      this.page=1;
      this.limit=10;
      this.logRecordList();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.paginateUserList();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.paginateUserList();
    },
    // 列表接口
    logRecordList(){
      let data = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      }
      logRecord(data).then(res=>{
        if(res.code===0){
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item=>{
            item.addTimeStr = formatDate(item.addTimeStr)
          })
          this.tableData = res.page.list;
        }
      })
    },
  },
  created(){
    this.logRecordList();
  }
}
</script>

<style lang="scss" scoped>
.user-ruleForm{
  .el-select{
     width: 100%;
  }
}
.headerSystemAnd{
  justify-content: space-between;
  .party{
    display: flex
  }
}
</style>