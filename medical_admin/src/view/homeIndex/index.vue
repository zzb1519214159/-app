<template>
  <div class="layout">
    <!-- 顶部 -->
    <div class="layout__top-backg head">
      <div class="left">
        <img src="../../assets/images/home.png" />
      </div>
      <el-menu
        router
        :default-active="activeIndex"
        class="el-menu-demo navigation"
        mode="horizontal"
      >
        <el-menu-item
          v-for="(item,index) in arryData"
          :key="index"
          :index="item.router"
          @click="spanClickOne(index,item.router)"
        >{{item.title}}</el-menu-item>
      </el-menu>
      <div class="portrait">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-dropdown trigger="click" class="littleHand">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <span @click="compileClick">修改密码</span>
              <el-badge class="mark" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="quitClick">退出</span>
              <el-badge class="mark" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div class="right">系统管理</div> -->
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="index-ruleForm"
        >
          <el-form-item prop="account" label="原密码">
            <el-input v-model="ruleForm.account" placeholder="6-12位数字、英文及组合；" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="6-12位数字、英文及组合；"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              placeholder="6-12位数字、英文及组合；"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="bottom">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="layout__content">
      <!-- 左边菜单 -->
      <div class="layout__left-label">
        <el-menu router :default-active="indexRouter" :unique-opened="true" @open="handleOpen">
          <el-submenu v-for="item in label" :key="item.router" :index="item.router">
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(val,i) in item.list"
                :key="val.router"
                :index="val.router"
                @click="skip(val.router,val.title,i)"
              >
                <span :class="val.router === indexRouter ? 'spanClick' :''">{{val.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 页面出口 -->
      <div class="layout__view">
        <div class="layout__view-label">
          <i class="el-icon-s-home"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item class="layout__view-label-company" @click.native="reset">健恒环境管理系统</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="(item,index) in labelList" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="layout__view-router">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 暂定路由参数
      label: [],
      letftLabel: [
        {
          title: "患者管理",
          router: "/patient/management",
          list: [
            {
              title: "录入患者",
              router: "/patient/management"
            },
            {
              title: "注册用户",
              router: "/patient/register"
            },
            {
              title: "患者病程管理",
              router: "/patient/disease"
            }
          ]
        },
        {
          title: "医生管理",
          router: "/doctor/entire",
          list: [
            {
              title: "全部医生",
              router: "/doctor/entire"
            },
            {
              title: "医嘱记录",
              router: "/doctor/advice"
            },
            {
              title: "医生收入管理",
              router: "/doctor/earning"
            }
          ]
        },
        {
          title: "运营管理",
          router: "/operation/video",
          list: [
            {
              title: "视频管理",
              router: "/operation/video"
            }
          ]
        },
        {
          title: "基础管理",
          router: "/basics/hospital",
          list: [
            {
              title: "医院管理",
              router: "/basics/hospital"
            },
            {
              title: "科室管理",
              router: "/basics/office"
            },
            {
              title: "药品管理",
              router: "/basics/remedy"
            },
            {
              title: "疾病管理",
              router: "/basics/illness"
            }
          ]
        },
        {
          title: "系统管理",
          router: "/system/systemAnd",
          list: [
            {
              title: "角色管理",
              router: "/system/systemAnd"
            },
            {
              title: "系统用户管理",
              router: "/system/user"
            },
            {
              title: "操作日志",
              router: "/system/operation"
            }
          ]
        }
      ],
      // 记录
      labelList: [],
      indexRouter: "/patient/management",
      arryData: [
        {
          title: "患者管理",
          router: "/patient/management"
        },
        {
          title: "医生管理",
          router: "/doctor/entire"
        },
        {
          title: "运营管理",
          router: "/operation/video"
        },
        {
          title: "基础设置",
          router: "/basics/hospital"
        },
        {
          title: "系统管理",
          router: "/system/systemAnd"
        }
      ],
      activeIndex: "/patient/management",
      dialogVisible: false,
      ruleForm: {
        account: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, message: "至少6位", trigger: "blur" }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "至少6位", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, message: "至少6位", trigger: "blur" }
        ]
      },
      routePath: ""
    };
  },
  watch: {
    $route: {
      // 监听路由变化，页面显示导航标题
      handler(val, oldval) {
        this.labelList = [];
        // name匹配页面刷新重新匹配导航菜单和右侧菜单
        if ("name" in val.query) {
          this.labelList = val.meta.title.slice(0, 2);
          this.$set(this.labelList, 2, val.query.name);
          let path = val.path.split("/");
          this.activeIndex = "/" + path[1] + "/" + path[2];
          return;
        }
        if (val.meta.title.length >= 3) {
          this.routePath = val.path;
        }
        this.labelList = val.meta.title;
      },
      immediate: true
    }
  },
  methods: {
    spanClickOne(index, router) {
      sessionStorage.setItem("indexRouter", router);
      this.indexRouter = router;
      sessionStorage.setItem("indexOne", index);
      this.label = [this.letftLabel[index]];
      let obj = JSON.stringify([index + "", 0]);
      sessionStorage.setItem("layout", obj);
      let content = [
        this.letftLabel[index].title,
        this.letftLabel[index].list[0].title
      ];
      this.labelList = content;
    },
    //进入页面选中
    clearStorage() {
      let sidePath = sessionStorage.getItem("indexRouter");
      sidePath ? this.indexRouter = sidePath : this.indexRouter = '/patient/management';
      let cache = JSON.parse(sessionStorage.getItem("layout"));
      if (this.labelList.length < 3) {
        let content = [
          this.letftLabel[cache[0]].title,
          this.letftLabel[cache[0]].list[cache[1]].title
        ];
        this.labelList = [];
        this.labelList = this.labelList.concat(content);
        this.routePath = this.letftLabel[cache[0]].list[cache[1]].router;
        this.activeIndex = this.letftLabel[cache[0]].list[0].router;
        this.$router.push({ path: this.routePath });
      }
      this.label = [this.letftLabel[cache[0]]];
    },
    // 左边菜单跳转
    skip(router, val, i) {
      // 采购管理订单列表已生效查询清空
      sessionStorage.setItem("indexRouter", router);
      this.indexRouter = router;
      //获取主模板名称
      let cache = JSON.parse(sessionStorage.getItem("layout"));
      if (router) {
        let valData = [val];
        let titleData = [this.letftLabel[cache[0]].title];
        if (!this.labelList.includes(val)) {
          //主组模板和子模板名称合拼
          let headLabelList = [...titleData, ...valData];
          this.labelList = headLabelList;
        }
        let indexOne = sessionStorage.getItem("indexOne");
        let obj = JSON.stringify([indexOne + "", i]);
        sessionStorage.setItem("layout", obj);
        this.$router.push(router);
      } else {
        this.$notify.warning({
          title: "警告",
          message: "暂无地址"
        });
        this.$router.push("*");
      }
    },
    //  菜单打开
    handleOpen(key, keyPath) {
      // 刷新不丢失了name
      sessionStorage.setItem("indexRouter", key);
      this.indexRouter = key;
      this.labelList = [];
      let index = JSON.parse(sessionStorage.getItem("layout"));
      this.labelList = this.labelList.concat([
        this.letftLabel[index[0]].title,
        this.letftLabel[index[0]].list[0].title
      ]);
      this.$router.push(key);
    },
    // 退出登录
    quitClick() {
      this.$message({
        message: "退出成功！",
        type: "success"
      });
      setTimeout(() => {
        this.$router.replace({ path: "/login" });
      }, 500);
    },
    compileClick() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "修改成功，重新登录",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 500);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.clearStorage();
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .layout__top-backg {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: $colorfff;
    .navigation {
      font-size: 16px;
      width: 80%;
    }
    .portrait {
      width: 97px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .el-avatar {
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
    }
    .left {
      width: 12%;
    }
    .portrait {
      width: 102px;
    }

    /deep/ .el-breadcrumb__item {
      width: 100px;
      text-align: center;
    }
  }
  .spanClick {
    color: #409eff;
  }
  /deep/ .el-menu-item.is-active {
    color: #303133;
  }
  .layout__content {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
  }
  .layout__view-label {
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #e7e7e7;
    // margin-bottom: 10px;
    .el-breadcrumb {
      line-height: 45px !important;
      width: 80%;
    }
    i {
      margin-right: 5px;
    }
    .backTo {
      cursor: pointer;
      width: 20%;
      line-height: 45px;
      text-align: right;
      font-size: 16px;
      padding-right: 20px;
    }
  }
  .layout__left-label {
    width: 225px;
    height: calc(100% - 1px);
    border-top: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    background-color: $colorfff;
  }
  .layout__view {
    width: calc(100% - 274px);
    height: calc(100% - 15px);
    padding: 0 24px 20px 25px;
    border-top: 1px solid #e7e7e7;
    .layout__view-router {
      width: 100%;
      height: calc(100% - 45px);
    }
    .layout__view-label-company {
      cursor: pointer;
      /deep/.el-breadcrumb__inner {
        cursor: pointer;
        padding: 3px 10px;
        border-radius: 3px;
        background: #1295fc;
        color: $colorfff;
        font-weight: normal;
      }
    }
  }
  /deep/.el-menu-item-group__title {
    padding: 0;
  }
  /deep/.el-menu {
    border: 0;
  }
}
</style>
