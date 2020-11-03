<!-- 患者管理  >  录入患者  >  随访 -->
<template>
  <div class="generalNew">
    <div class="header">
        <span>王小俊</span>
        <span>录入时间：2020.8.9 13：00</span>
        <div class="rigth">
          <el-button type="text" @click="particulars">查看详情</el-button>
           <el-button type="primary" @click="addFollow('新增')">+新增随访</el-button>
        </div>
    </div>
    <div class="paddingClass tableTop">
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
        <el-table-column
          v-for="(item,index) in listParameter"
          :key="index"
          :prop="item.prop"
          :label="item.title"
          :width="item.size"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
         <el-table-column
             align="center"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addFollow('编辑',scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-dialog
      :title="titleDialog"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="followRuleForm">
         <el-form-item label="随访时间：" prop="followUpDay">
            <el-date-picker
              v-model="ruleForm.followUpDay"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
       <el-form-item label="用药情况：">
          <el-input type="textarea" v-model="ruleForm.drugs" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="病情记录：" prop="pathography">
          <el-input type="textarea" v-model="ruleForm.pathography" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import {addFollowUp,followDetail,suffererFollowUp,delFollow} from "@/api"
export default {
  data(){
    return{
      listParameter: [
        {
          prop: "followUpDay",
          title: "随访时间",
        },
        {
          prop: "drugs",
          title: "用药情况"
        },
        {
          prop: "pathography",
          title: "病情记录"
        },
        {
          prop: "admin",
          title: "记录人"
        }
      ],
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        followUpDay: '',
        drugs: '',
        pathography: '',
      },
      rules: {
        followUpDay: [
           { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        pathography: [
          { required: true, message: '请输入病情记录', trigger: 'blur' },
        ]
      },
      value1:"",
      titleDialog:"",
      managementId:-1
    }
  },
  methods:{
    particulars(){
       this.$router.push({path:'/patient/management/particulars',query:{id:this.managementId,name:'患者详情'}});
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addFollow(text,id){
      if(text==='编辑'){
        this.followDetailDo(id);
      };
      this.titleDialog = text+'随访记录';
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.suffererId = this.managementId,
          this.addFollowUpDo(this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    openClick(id) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delFollowDo(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 删除接口(
    delFollowDo(id){
      delFollow({id}).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.suffererFollowUpDo();
        }
      })
    },
    // 详情接口
    followDetailDo(id){
      followDetail({id}).then(res=>{
        if(res.code===0){
          this.ruleForm = res.data; 
        }
      })
    },
    // 新增接口
    addFollowUpDo(data){
      addFollowUp(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.dialogVisible = false;
          this.suffererFollowUpDo();
        }
      })
    },
    // 列表接口
    suffererFollowUpDo(){
      suffererFollowUp({id:this.managementId}).then(res=>{
        if(res.code===0){
          this.tableData = res.data;
        }
      })
    }
  },
  created() {
    this.managementId = this.$route.query.id;
    this.suffererFollowUpDo();
  }
}
</script>

<style lang="scss" scoped>
.generalNew{
  .header{
    display: flex;
    align-items: baseline;
    color: #333;
    margin-bottom: 20px;
    span{
      &:nth-child(1){
        margin-right: 20px;
        font-size: 14px;
        font-weight:bold;
      }
      &:nth-child(2){
        font-size: 12px;
      }
    }
    .rigth{
      margin-left: 20px;
      width: 84%;
      display: flex;
      justify-content: space-between;
    }
  }
  .paddingClass{
    padding-left: 0
  }
  .followRuleForm{
    /deep/ .el-form-item__content{
      margin-left: 0 !important;
    }
    /deep/.el-textarea__inner{
      width: 218px;
    }
  }
}
</style>