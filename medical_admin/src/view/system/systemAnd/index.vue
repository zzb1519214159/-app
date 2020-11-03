<!-- 系统管理-角色管理 -->
<template>
  <div>
    <div>
      <el-form ref="ruleForm" class="paddingClass headerSystemAnd">
          <el-button type="primary" plain @click="addClick('新增')">新增</el-button>
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
            class="index-ruleForm"
          >
            <el-form-item prop="name" label="角色名称">
              <el-input v-model="addForm.name" placeholder="1-8汉字"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input type="textarea" v-model="addForm.describe" placeholder="50字以内"></el-input>
            </el-form-item>
            <el-form-item class="bottom">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
    </div>
    <div>
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
              <el-button type="text" size="small"  @click="addClick('编辑',scope.row.id)">编辑</el-button>
              <!-- 分配角色 -->
              <el-button type="text" size="small" @click="roleClick">(暂无)</el-button>
              <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
      </div>
      <el-dialog
        title="选择权限"
        :visible.sync="dialogRole"
        width="40%"
        :before-close="handleClose"
        class="index-ruleForm"
        >
        <div class="roleInput">
          <label>角色名称：</label>
          <el-input/>
        </div>
        <div class="functionLetf">
          <label>功能权限：</label>
          <div class="general">
            <label>主页</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="general">
            <label>患者管理</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="general">
            <label>医生管理</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="general">
            <label>运营管理</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="general">
            <label>基础设置</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="general">
            <label>系统管理</label>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">自定义模板</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="bottom">
            <el-button @click="dialogRole = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {paginateRole,addRole,detailRole,deleteRole} from "@/api";
import  {formatDate } from "@/assets/js/time.js";
import khPagination from "@com/kh-pagination"

export default {
  components:{
    khPagination
  },
  data(){
    return{
      ruleForm:{
        name:""
      },
      listParameter: [
        {
          prop: "updateTimeStr",
          title: "更新时间",
        },
        {
          prop: "name",
          title: "角色名称"
        },
        {
          prop: "describe",
          title: "角色描述"
        },
        {
          prop: "total",
          title: "当前人数"
        },
      ],
      tableData: [],
      addForm:{
        name:"",
        describe:""
      },
      dialogVisible:false,
      rules: {
        name: [
          {  required: true, message: '角色名不能为空', trigger: "blur" },
          { min: 1,max:8, message: '请输入1-8位汉字', trigger: 'blur' }
        ],
      },
      cityOptions:['查看', '编辑'],
      titleText:"",
      dialogRole:false,
      checkAll: false,
      checkedCities: ['查看'],
      cities: null,
      isIndeterminate: true,
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
      this.titleText = text+"角色"
      this.dialogVisible = true;
      // es6对象值清空
      if(text==='编辑'){
        this.addPoleList(id)
      }else{
        Object.keys(this.addForm).forEach(key => (this.addForm[key] = ""));
      }
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
        this.addPoleAdd();
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
        this.addPoleDelete(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    roleClick(){
      this.dialogRole = true;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    confirm(){
      this.dialogRole = false;
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.paginateRoleList();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.paginateRoleList();
    },
    // 新增接口
    addPoleAdd(){
      addRole(this.addForm).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.dialogVisible = false;
          this.paginateRoleList();
        }
      })
    },
    // 详情接口
    addPoleList(id){
      detailRole({id}).then(res=>{
        if(res.code===0){
          this.addForm = res.data;
        }
      })
    },
    // 删除接口
    addPoleDelete(id){
      deleteRole({id}).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.paginateRoleList();
        }
      })
    },
    // 列表接口
    paginateRoleList(){
      let data = {
        page:this.page,
        limit:this.limit
      };
      paginateRole(data).then(res=>{
        if(res.code===0){
          res.page.list.forEach(item=>{
            item.updateTimeStr = formatDate(item.updateTimeStr);
          });
          this.totalCount = res.page.totalCount;
          this.tableData = res.page.list;
        }
      })
    }
  },
  created(){
    this.paginateRoleList();
  },
  mounted(){
    this.cities = this.cityOptions;
  }
}
</script>

<style lang="scss" scoped>
.headerSystemAnd{
  justify-content: space-between;
}
.headerSystemAnd{
  padding: 20px;
  text-align: right;
}
.roleInput{
  display: flex;
  align-items: center;
  /deep/.el-input__inner{
    width: 80%;
  }
  label{
    width: 99px;
  }
}
.functionLetf{
  margin-top: 20px;
  .general{
    width: 85%;
    display: inline-flex;
    &:nth-child(n+3){
        margin-left: 90px;
        margin-top: 20px;
    }
    /deep/.el-checkbox-group{
      display: inline-block;
      width: 55px;
      .el-checkbox{
        &:nth-child(2){
          margin-top: 5px;
        }
      }
    }
  }
  .general,.text{
    margin-left: 20px;
  }
}
</style>