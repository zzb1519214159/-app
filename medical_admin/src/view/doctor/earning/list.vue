<!-- 医生管理  >  医生收入管理 -->
<template>
  <div>
     <el-form class="paddingClass headerCommon" ref="resetForm">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="医生">
          <el-input v-model="ruleForm.name" placeholder="请输入医生姓名或账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="收入时间">
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
        <el-form-item label="发放状态">
          <el-select v-model="ruleForm.state" placeholder="请选择" clearable>
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
    <div class="tableTop tableEarning">
      <p class="textP">以下{{tableData.length}}笔医生收入订单，共计{{totalData}}元</p>
      <div class="paddingClass">
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
  </div>
</template>

<script>
import khPagination from "@com/kh-pagination"
import {revenue} from "@/api";
export default {
  components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:"",
        state:null
      },
      options: [
        {
          value: -1,
          label: "不限"
        },
        {
          value: 0,
          label: "未发放"
        },
         {
          value: 1,
          label: "已发放"
        }
      ],
      listParameter: [
        {
          prop: "payTimeStr",
          title: "收入时间"
        },
        {
          prop: "doctor",
          title: "医生姓名"
        },
        {
          prop: "mobile",
          title: "账号"
        },
        {
          prop: "thanksType",
          title: "收入类型"
        },
        {
          prop: "thanksPrice",
          title: "金额"
        },
        {
          prop: "thanksState",
          title: "发放状态"
        },
        {
          prop: "payUserName",
          title: "支付人"
        }
      ],
      tableData: [],
      totalData:0,
      value:"",
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
      this.revenueDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.revenueDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.revenueDo();
    },
    revenueDo(){
      let data = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      };
      revenue(data).then(res=>{
        if(res.code===0){
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item=>{
            switch(item.thanksType){
              case -1: 
                item.thanksType = '未感谢';
                break;
              case 0: 
                item.thanksType = '已读';
                break;
              case 1: 
                item.thanksType = '关怀备至';
                break;
              case 2: 
                item.thanksType = '仁心仁术';
                break;
              case 3: 
                item.thanksType = '妙手回春';
                break;
              case 4: 
                item.thanksType = '大医精诚';
                break;
                break;
              default:
                item.thanksType = "自定义"
            }
            item.thanksState = item.thanksState===-1?'不限':item.thanksState===0?'未发放':'已发放';
            this.totalData+=item.thanksPrice;
          });
          this.tableData = res.page.list;
        }
      })
    },
  },
  created(){
    this.revenueDo();
  }
}
</script>

<style lang="scss" scoped>
.tableEarning{
  background-color: $colorfff;
  .textP{
    padding: 20px 20px 10px 20px;
    font-size: 13px;
  }
}
</style>