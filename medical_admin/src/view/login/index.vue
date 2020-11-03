<!-- 登录 -->
<template>
  <div class="login">
    <div class="loginBody">
        <div class="loginTop">
          <img src="../../assets/images/log.png" />
          <span>欢迎登录云尚医佳管理后台</span>
        </div>
        <p class="borderP"></p>
        <div class="loginBottom">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="bottom">
              <div class="left">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </div>
              <div class="right">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import {doLogin} from "@/api";
export default {
  data() {
    return {
      ruleForm: {
        username: "admin2",
        password: "123456",
      },
      rules: {
        username: [
          {  required: true, message: '用户名不能为空', trigger: "blur" },
        //  { min: 6, message: '至少6位', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: "blur" },
          // { min: 6, message: '至少6位', trigger: 'blur' }
        ],
      },
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.$store.commit("setToken", "");
            doLogin(this.ruleForm).then(res=>{
              if(res.code===0){
                this.changLoader('登录成功');
                this.$router.push('/homeIndex');
                // 左侧导航栏选中
                let obj = JSON.stringify(['0', 0]);
                sessionStorage.setItem("layout", obj);
                sessionStorage.removeItem("indexRouter");
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.login{
  text-align: center;
  // height: 664px;
  position: relative;
  top: 20%;
  .loginBody{
    width: 400px;
    height: 300px;
    display: inline-block;
    background-color: rgba(247, 247, 247, 1);
    box-shadow: 3px 3px 3px rgba(204, 204, 204, 0.349019607843137);
    box-sizing: border-box;
    border: 1px solid rgba(213, 227, 239, 1);
    .loginTop{
      margin-top: 50px;
      left: -35px;
      display: inline-flex;
      position: relative;
      span{
        color: #478fca;
        margin-left: 10px;
      }
    }
    .borderP{
      width: 304px;
      margin-top: 10px;
      margin-bottom: 20px;
      display: inline-block;
      border: 0.5px solid #d5e3ef;
    }
    .loginBottom{
      display: flex;
      justify-content: center;
      .bottom{
        /deep/.el-form-item__content{
          display: flex;
          .left,.right{
            width:50%
          }
          .left{
            text-align: left;
          }
          .right{
            text-align: right;
          }
        }
      }
    }
    /deep/ .el-input__inner{
      width: 296px;
    }
    /deep/ .el-form-item__content{
      margin-left:0 !important;
    }
  }
}
</style>
