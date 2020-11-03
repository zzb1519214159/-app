<!-- 患者管理  > 注册用户 -->
<template>
  <div>
    <el-form ref="ruleForm" class="paddingClass displayHeader">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="注册时间">
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
          <el-input v-model="ruleForm.name" placeholder="请输入手机号或姓名……" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="ruleForm.sex" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-select v-model="ruleForm.age" placeholder="请选择" clearable>
            <el-option
              v-for="item in optionsAge"
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
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
               <el-button type="text" size="small" @click="particulars(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
      </div>
  </div>
</template>
<script>
import khPagination from "@com/kh-pagination"
import {medicalUser,userDelete} from "@/api"
export default {
  components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:"",
        sex:null,
        age:null,
      },
      listParameter: [
        {
          prop: "addTimeStr",
          title: "注册时间",
        },
        {
          prop: "mobile",
          title: "绑定手机号"
        },
        {
          prop: "name",
          title: "姓名"
        },
        {
          prop: "location",
          title: "所在地"
        },
        {
          prop: "source",
          title: "注册来源"
        },
        {
          prop: "doctorCount",
          title: "关联医生"
        },
        {
          prop: "patientCount",
          title: "就诊人"
        },
        {
          prop: "courseCount",
          title: "病程数"
        }
      ],
      tableData: [],
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 0,
          label: "女"
        }
      ],
      optionsAge: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "0-3岁"
        },
        {
          value: 2,
          label: "4-12岁"
        },
        {
          value: 3,
          label: "13-18岁"
        },
        {
          value: 4,
          label: "19-50岁"
        },
        {
          value: 5,
          label: "51-70岁"
        },
        {
          value: 6,
          label: "70以上"
        },

      ],
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
      this.medicalUserDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.medicalUserDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.medicalUserDo();
    },
    particulars(id){
       this.$router.push({path:"/patient/register/particulars",query:{id}});
    },
     openClick(id) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userDeleteDo(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 删除接口
    userDeleteDo(id){
      userDelete({id}).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.medicalUserDo();
        }
      })
    },
    // 列表接口
    medicalUserDo(){
      let params = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      };
      medicalUser(params).then(res=>{
        if(res.code===0){
          this.totalCount = res.page.totalCount;
          res.page.list.forEach(item=>{
            item.source = item.source===0?'不详':item.source===1?'医生码':"推广码";
            item.location = item.provinceStr+"-"+item.cityStr;
          })
          this.tableData = res.page.list;
        }
      })
    }
  },
  created() {
    this.medicalUserDo();
  },
}
</script>

<style lang="scss" scoped>

</style>