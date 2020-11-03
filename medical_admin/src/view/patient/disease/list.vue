<!-- 患者管理模块 -->
<template>
  <div>
     <el-form ref="ruleForm" class="paddingClass displayHeader">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="建立时间">
           <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户">
          <el-input v-model="ruleForm.user" placeholder="注册用户手机号或姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="就诊人">
         <el-input v-model="ruleForm.patient" placeholder="就诊人姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ruleForm.state" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
          <el-button type="primary" @click="query">查询</el-button>
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
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="examine(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
    </div>
    <calendar-index  :dialogVisible="dialogVisible" @calendarBoole="calendarBoole" ref="refData"></calendar-index>
  </div>
</template>
<script>
import khPagination from "@com/kh-pagination"
import calendarIndex from "@com/calendar"
import {userCourseOfDisease,userCodDetail} from "@/api"
export default {
  components:{
    calendarIndex,
    khPagination
  },
  data(){
    return{
      ruleForm:{
        user:"",
        patient:"",
        state:null
      },
      listParameter: [
        {
          prop: "addTimeStr",
          title: "建立时间",
        },
        {
          prop: "userName",
          title: "用户姓名"
        },
        {
          prop: "mobile",
          title: "用户手机号"
        },
        {
          prop: "courseName",
          title: "病程名称"
        },
        {
          prop: "name",
          title: "就诊人姓名"
        },
        {
          prop: "doctor",
          title: "关联医生"
        },
        {
          prop: "symptom",
          title: "疾病/症状"
        },
        {
          prop: "state",
          title: "状态"
        }
      ],
      tableData: [],
      options:[
        {
          value: 0,
          label: '病程中'
        },
        {
          value: 1,
          label: '已结束'
        }
      ],
      value:"",
      dialogVisible:false,
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
      this.page=1;
      this.limit=10;
      if(this.value){
        this.ruleForm.startTime = this.value[0];
        this.ruleForm.endTime = this.value[1];
      }else{
        this.ruleForm.startTime = '';
        this.ruleForm.endTime = '';
      };
      this.userCourseOfDiseaseDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.userCourseOfDiseaseDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.userCourseOfDiseaseDo();
    },
    examine(id){
      this.userCodDetailDo(id);
      this.dialogVisible = true;
    },
    calendarBoole(val){
      this.dialogVisible = val;
    },
    // 病程详情接口
    userCodDetailDo(id){
      userCodDetail({id}).then(res=>{
        if(res.code===0){
          res.data.state = res.data.state===0?'病程中':'已结束';
          res.data.diseaserecord.forEach(item=>{
            switch(item.mentality){
              case -1:
                item.mentality = '未填写'
              break;
                case 1:
                item.mentality = '差'
              break;
                case 2:
                item.mentality = '中'
              break;
              default:
                item.mentality = '好'
            };
            item.takeMedicine = item.takeMedicine === -1 ? '未填写' : item.takeMedicine === 0 ? '未服药' :'按时服药'
          });
          this.$refs.refData.dialogData = res.data;
        }
      })
    },
    // 列表接口
    userCourseOfDiseaseDo(){
      let params = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      };
      userCourseOfDisease(params).then(res=>{
        if(res.code===0){
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item=>{
            item.state = item.state===0?'病程中':'已结束';
            item.source = item.source===0?'不详':item.source===1?'医生码':'推广码';
          })
          this.tableData = res.page.list;
        }
      })
    },
  },
  created() {
    this.userCourseOfDiseaseDo();
  },
}
</script>

<style lang="scss" scoped>

</style>