<!-- 医生管理  >  医嘱记录 -->
<template>
  <div>
     <el-form class="paddingClass headerCommon" ref="ruleForm">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="医生">
          <el-input v-model="ruleForm.name" placeholder="请输入医生姓名或账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="发送时间">
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
        <el-form-item label="获得感谢">
        <el-select v-model="ruleForm.thank" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
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
      </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
    </div>
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination"
import {advice} from "@/api";
export default {
   components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:"",
        thank:null
      },
      options: [
        {
          value: -1,
          label: "未感谢"
        },
        {
          value: 0,
          label: "已读"
        },
         {
          value: 1,
          label: "关怀备至"
        },
         {
          value: 2,
          label: "仁心仁术"
        },
         {
          value: 3,
          label: "妙手回春"
        },
         {
          value: 4,
          label: "大医精诚"
        },{
          value: 5,
          label: "自定义"
        }
      ],
      listParameter: [
        {
          prop: "sendTimeStr",
          title: "发送时间"
        },
        {
          prop: "doctor",
          title: "医生姓名"
        },
        {
          prop: "courseName",
          title: "病程名称"
        },
        {
          prop: "sufferer",
          title: "患者姓名"
        },
        {
          prop: "thanksType",
          title: "发送医嘱内容",
          size:300
        },
        {
          prop: "thanksPrice",
          title: "获得感谢"
        }
      ],
      tableData: [],
       // 当前页
      page:1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount:0,
      value:""
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
      this.adviceDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.adviceDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.adviceDo();
    },
    // 列表接口
    adviceDo(){
      let data = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      };
      advice(data).then(res=>{
        this.totalCount = res.page.totalCount;
        res.page.list.forEach(item=>{
          switch(item.thanksPrice){
            case -1: item.thanksPrice = '未感谢';
              break;
            case 0: item.thanksPrice = '已读';
              break;
            case 1: item.thanksPrice = '关怀备至';
              break;
            case 2: item.thanksPrice = '仁心仁术';
              break;
            case 3: item.thanksPrice = '妙手回春';
              break;
            case 4: item.thanksPrice = '大医精诚';
              break;
              break;
            default:"自定义"
          }
        })
        this.tableData = res.page.list;
      })
    }
  },
  created(){
    this.adviceDo();
  }
}
</script>

<style lang="scss" scoped>

</style>