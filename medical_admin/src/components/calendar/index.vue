<!-- 日历组件 -->
<template>
    <el-dialog
      title="病程详情"
      :visible.sync="courseBoole"
       :before-close="handleClose"
      width="55%"
      class="dialogParticulars">
      <div>
        <p class="headerTextOne">{{dialogData.courseName}}病程 </p>
        <div class="headerTextTwo">
          <p>患者：{{dialogData.name}}</p>
          <p>医生：王杰</p>
          <p>疾病/症状：{{dialogData.symptom}}</p>
          <p>{{dialogData.state}}</p>
        </div>
      </div>
      <p class="borderP borderTop"></p>
      <div class="content">
        <div class="dateParticulars">
          <el-calendar :range="dialogArry">
              <template
              slot="dateCell"
              slot-scope="{date, data}" >
              <p class="littleHand" 
                :class="[dealMyDate(data.day)? 'pitchSelected' : '',
                  (startTime===data.day)&&stateBoole?'pitchOn':stateBoole?'initialize':'',
                  ]" 
                @click="dataClick(data.day)">
                {{data.day.substr(-2, 2) }}<br/>{{dealMyDate(data.day) ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
        </div>
        <div class="right" v-show="rightObj.day">
          <p>{{rightObj.day}}</p>
          <p>
            <img src="../../assets/images/u1950.svg" alt="">
            <span>{{rightObj.takeMedicine}}</span>
          </p>
          <p>
            <img src="../../assets/images/u1951.svg" alt="">
            <span>{{rightObj.mentality}}</span>
          </p>
          <p>
            <span>
              <img src="../../assets/images/u1953.svg" alt="">
            </span>
            <span>异常记录：{{rightObj.abnormal}}</span>
          </p>
          <p>
            <img src="../../assets/images/u1959.svg" alt="">
            <span>医嘱：{{rightObj.healthAdvice}}</span>
          </p>
        </div>
        <div class="right available" v-show="!rightObj.day">
          暂无数据
        </div>
      </div>
    </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      courseBoole:false,
      dialogData:{},//ref获取dom
      dialogArry:[],
      rightObj:{},
      stateBoole:true,
      startTime:[]
    }
  },
  props:{
    dialogVisible:Boolean
  },
  watch:{
    dialogData(val){
      this.stateBoole = true;
      console.log(this.stateBoole);
      this.courseBoole = this.dialogVisible;
      // 根据是否有病程日期进行判断
      if(val.diseaserecord.length>0){
        this.dialogArry[0] = val.diseaserecord[0].day;
        this.startTime = val.diseaserecord[0].day;
        var lastDay = this.getLastDay(val.diseaserecord[0].day);
        this.dialogArry[1] = lastDay.getFullYear() + "-" +(lastDay.getMonth()+1)+"-"+lastDay.getDate();
        this.rightObj = val.diseaserecord[0];
      }else{
        let time = this.getCurrentMonthFirst();
        let dataTime = time.getFullYear() + "-" +(time.getMonth()+1)+"-"+time.getDate();
        let time1 = this.getCurrentMonthLast();
        let dataTime1 = time1.getFullYear() + "-" +(time1.getMonth()+1)+"-"+time1.getDate()
        this.dialogArry[0] = dataTime;
        this.dialogArry[1] = dataTime1;
      };
    },
  },
  computed: {
    // 默认选中初始值
    dealMyDate() {
      return item => {
        if(this.dialogData.diseaserecord.length>0){
          let len = this.dialogData.diseaserecord.length;
          let res = "";
          for(let i=0; i<len; i++){
            if(this.dialogData.diseaserecord[i].day === item) {
              res = true;
              break;
            }
          }
          return res
        }
      };
    }
  },
  methods:{
    dataClick(date){
      this.stateBoole = false;
      let obj = {};
      let boole = false;
      this.dialogData.diseaserecord.forEach(item=>{
        if(item.day===date){
          obj = item;
          boole = true;
        };
      });
      if(boole){
        this.rightObj = obj;
      }else{
        this.rightObj = {};
      };
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$emit("calendarBoole",false)
        })
        .catch(_ => {});
    },
    // 获取当前月的第一天
    getCurrentMonthFirst(){
      var date=new Date();
      date.setDate(1);
      return date;
    },
    // 获取当前月的最后一天
    getCurrentMonthLast(){
      var date=new Date();
      var currentMonth=date.getMonth();
      var nextMonth=++currentMonth;
      var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
      var oneDay=1000*60*60*24;
      return new Date(nextMonthFirstDay-oneDay);
    },
    // 获取任意时间的最后一天
    getLastDay(d){
        var current=new Date(d);
        var currentMonth=current.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
        var minusDate=1000*60*60*24;
        return new Date(nextMonthDayOne.getTime()-minusDate);
    }
  },
}
</script>

<style lang="scss" scoped>

/deep/ .el-dialog__body{
  color:#333;
  padding-top: 20px;
}
.dialogParticulars{
  .borderTop{
    margin-top: 20px;
  }
    .headerTextOne{
      margin-bottom: 10px;
      text-align: center;
      font-weight: bold;
    }
    .headerTextTwo{
      display: flex;
      justify-content: space-around;
      padding: 0 120px;
    }
    /deep/ .el-dialog{
      height: 78%;
      .el-calendar{
        // height: 380px;
        // overflow: hidden;
      }
      .is-selected{
        .littleHand{
          border: 0.5px solid $color409EFF;
        }
      }
      .content{
        display: flex;
        justify-content: space-between;
        .dateParticulars{
          width: 60%;
          height: 300px;
          .el-scrollbar__wrap {
            overflow-x: hidden;
          }
          .pitchSelected {
            color: $color1989FA;
          }
          .initialize {
            border:none !important;
            background-color:$colorfff;
          }
          .pitchOn{
            border: 0.5px solid $color409EFF
          }
          .el-calendar-day{
            height: 46px;
            padding: 0;
            &:hover{
              cursor: default;
            }
            p{
              box-sizing: border-box;
              height:100%;
              padding: 8px;
            }
          }
        
        }
        .right{
          margin-top: 50px;
          margin-left: 20px;
          width: 36%;
          p{
            margin-bottom: 25px;
            display: flex;
            align-self: flex-end;
            img{
              margin-right: 20px;
            }
            span{
              // display: inline-block;
              position: relative;
              top: -3px;
            }
          }
        }
        .available{
          align-self: center;
        }
      }
    }
  }
</style>