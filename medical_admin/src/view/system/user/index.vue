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
            <el-form-item label="角色名称">
              <el-select v-model="ruleForm.roleId" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain @click="addClick('新增')">新增</el-button>
        </div>
      </el-form>
      <el-dialog
        :title="titleText"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
          <el-form
            :model="addForm"
            status-icon
            :rules="rules"
            ref="addForm"
            label-width="100px"
            class="user-ruleForm index-ruleForm"
          >
            <el-form-item prop="username" label="用户名">
              <el-input v-model="addForm.username" placeholder="1-20位数字、英文及组合"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
              <el-input v-model="addForm.name" placeholder="2-10位汉字"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="联系电话">
              <el-input v-model="addForm.mobile" placeholder="11位手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="初始密码" v-if="!addText">
              <el-input v-model="addForm.password" placeholder="6-12位数字、英文及组合" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="roleId" label="选择角色">
              <el-select v-model="addForm.roleId" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="bottom">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <div class="paddingClass tableTop">
      <el-table :data="tableData" border style="width: 100%" class="bottom">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
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
            <el-button type="text" size="small"  @click="addClick('编辑',scope.row.id)">编辑</el-button>
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
import {paginateUser,paginateRole,addUser,detailUser,deleteUser} from "@/api";
import  {formatDate } from "@/assets/js/time.js";
export default {
  components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:"",
        roleId:null
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
          prop: "mobile",
          title: "联系电话"
        },
        {
          prop: "roleName",
          title: "角色名称"
        },{
          prop: "lastLoginTimeStr",
          title: "上次登录时间"
        },
      ],
      tableData: [],
      addForm:{
        username:"",
        name:"",
        mobile:"",
        password:"",
        roleId:null
      },
      dialogVisible:false,
      rules: {
        username: [
          {  required: true, message: '用户名不能为空', trigger: "blur" },
          { min: 1,max:20, message: '请输入1-20位数字、英文及组合', trigger: 'blur' }
        ],
        name: [
          {  required: true, message: '姓名不能为空', trigger: "blur" },
          { min: 2,max:20, message: '请输入1-20位数字、英文及组合', trigger: 'blur' }
        ],
        mobile: [
          {  required: true, message: '联系电话不能为空', trigger: "blur" },
          { min: 11,max:11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        password: [
          {  required: true, message: '初始密码不能为空', trigger: "blur" },
          { min: 6,max:12, message: '请输入6-12位数字、英文及组合', trigger: 'blur' }
        ],
        roleId: [
          {  required: true, message: '选择角色不能为空', trigger: "change" },
        ],
      },
      titleText:"",
      options: [],
      value: '',
      addText:false,
      // 当前页
      page:1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount:0
    }
  },
  methods:{
    addClick(text,id){
      this.titleText = text+"用户"
      this.dialogVisible = true;
      // es6对象值清空
      if(text==='编辑'){
        this.detailUserList(id);
        this.addText = true;
      }else{
        Object.keys(this.addForm).forEach(key => (this.addForm[key] = ""));
      };
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUserAdd(this.addForm)
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
        this.deleteUserDelete(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    query(){
      this.page=1;
      this.limit=10;
      this.paginateUserList();
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
    // 删除接口
    deleteUserDelete(id){
      deleteUser({id}).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.paginateUserList();
        }
      })
    },
    // 详情接口
    detailUserList(id){
      detailUser({id}).then(res=>{
        if(res.code===0){
          this.addForm = res.data;
        }
      })
    },
    // 新增接口
    addUserAdd(item){
      addUser(item).then(res=>{
        this.changLoader(res.message);
        this.paginateUserList();
        this.dialogVisible = false;
      })
    },
    // 全部角色接口
    paginateRoleList(){
      let data = {
        limit : 500
      };
      paginateRole(data).then(res=>{
        if(res.code===0){
         this.options = res.page.list;
        }
      })
    },
    // 列表接口
    paginateUserList(){
      let data = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      }
      paginateUser(data).then(res => {
        if(res.code===0){
          res.page.list.forEach(item=>{
            item.lastLoginTimeStr = formatDate(item.lastLoginTimeStr)
          });
          this.totalCount = res.page.totalCount;
          this.tableData = res.page.list;
        }
      })
    }
  },
  created(){
    this.paginateRoleList();
    this.paginateUserList();
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