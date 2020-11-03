<!-- 患者管理  >  录入患者  >  患者详情 -->
<template>
  <div class="generalNew">
    <div class="header">
      <div class="headerImg">
        <img src="../../../assets/images/404.png" alt="">
      </div>
      <div class="headerText">
        <div class="textOne">
          <div>
            <span>{{fromData.name}}</span>
            <span>{{fromData.mobile}}</span>
          </div>
          <div>
            <span>注册时间：{{fromData.addTimeStr}}</span>
            <span>（扫医生码注册）</span>
          </div>
        </div>
        <div class="adjust messageText">
          <p>昵称：{{fromData.nickname}}</p>
          <p>性别：{{fromData.sex}}</p>
          <p>年龄：{{fromData.age}}</p>
          <p>所在地：{{fromData.provinceStr+fromData.cityStr}}</p>
        </div>
      </div>
    </div>
    <p class="borderP borderTop"></p>
    <div class="home">
      <div>
        <p class="usenMessage">就诊人信息</p>
        <div class="paddingClass tableTop">
          <el-table :data="fromData.patient" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
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
        </div>
      </div>
      <div>
        <p class="borderP borderTop"></p>
        <p class="usenMessage">关联医生</p>
        <div class="paddingClass tableTop">
          <el-table :data="fromData.doctors" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
            <el-table-column
              v-for="(item,index) in listData"
              :key="index"
              :prop="item.prop"
              :label="item.title"
              :width="item.size"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <p class="borderP borderTop"></p>
        <p class="usenMessage">病程信息</p>
        <div class="paddingClass tableTop">
          <el-table :data="fromData.usercourseofdisease" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
            <el-table-column
              v-for="(item,index) in listMessage"
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
                <el-button @click="examine(scope.row.id)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <calendar-index :dialogVisible="dialogVisible" @calendarBoole="calendarBoole" ref="refData"></calendar-index>
  </div>
</template>

<script>
import calendarIndex from "@com/calendar"
import {userDetail,userCodDetail} from "@/api"
export default {
  components:{
    calendarIndex
  },
  data(){
    return{
      listParameter: [
        {
          prop: "relation",
          title: "关系",
        },
        {
          prop: "name",
          title: "姓名"
        },
        {
          prop: "age",
          title: "年龄"
        },
        {
          prop: "sex",
          title: "性别"
        },
        {
          prop: "courseCount",
          title: "病程数"
        },{
          prop: "addTimeStr",
          title: "录入时间"
        }
      ],
      listData: [
        {
          prop: "addTimeStr",
          title: "关联时间",
        },
        {
          prop: "name",
          title: "医生姓名"
        },
        {
          prop: "title",
          title: "职称"
        },
        {
          prop: "hospital",
          title: "执业点"
        },
        {
          prop: "departments",
          title: "科室"
        }
      ],
      listMessage:[
        {
          prop: "addTimeStr",
          title: "建立时间",
        },
        {
          prop: "courseName",
          title: "病程名称"
        },
        {
          prop: "name",
          title: "患者姓名"
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
      dialogVisible: false,
      fromData:{}
    }
  },
  methods:{
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
    // 详情接口
    userDetailDo(id){
      userDetail({id}).then(res=>{
        if(res.code===0){
          res.data.sex = res.data.sex===0?'女':res.data.sex===1?'男':"未知";
          res.data.usercourseofdisease.forEach(item=>{
            item.state = item.state===0?'病程中':"已结束";
            item.sex = item.sex===0?'女':item.sex===1?'男':"未知";
          });
          this.fromData = res.data;
        }
      })
    }
  },
  created() {
    this.userDetailDo(this.$route.query.id);
  },
}
</script>

<style lang="scss" scoped>
.generalNew{
  .borderTop{
    margin-top: 20px;
  }
  .header{
    display: flex;
    .headerText{
      .textOne{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        div{
          &:nth-child(1){
            width: 200px;
            span{
              font-size: 14px;
              &:nth-child(1){
                margin-right: 20px;
                font-weight:bold;
              }
            } 
          }
          &:nth-child(2){
              font-size: 12px;
          }
        }
      }
    }
    .headerImg{
      margin-right: 10px;
      img{
        width: 49px;
      }
    }
    .adjust{
      display: flex;
      font-size: 14px;
      p{
        margin-right: 40px;
        span{
          color: #aaa
        }
      }
    }
  }
  .home{
    .sizeDiv{
      font-size: 13px;
    }
    .paddingClass{
      padding-left: 0
    }
    .usenMessage{
      margin-top:20px;
      margin-bottom: 10px;
      font-size: 13px;
    }
    .tableTop{
      margin-top: 0;
    }
  } 
}

</style>